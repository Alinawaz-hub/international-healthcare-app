import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";
import useApi from "@/hooks/use-api";
import { Colors } from "@/constants/Colors";

type UploadFilesProps = {
  onUploadComplete: (fileUrls: string[]) => void;
  showImagePicker?: boolean;
};

type PickedFile = {
  uri: string;
  name: string;
  type: string;
};

// Helper to get MIME type from file extension
const getMimeType = (filename: string) => {
  if (filename.endsWith(".jpg") || filename.endsWith(".jpeg"))
    return "image/jpeg";
  if (filename.endsWith(".png")) return "image/png";
  return "image/jpeg";
};

// Add a helper to shorten file names
const getShortFileName = (name: string) => {
  if (!name) return "";
  const dotIdx = name.lastIndexOf(".");
  const ext = dotIdx !== -1 ? name.slice(dotIdx) : "";
  const base = dotIdx !== -1 ? name.slice(0, dotIdx) : name;
  if (base.length > 6) {
    return base.slice(0, 6) + "..." + ext;
  }
  return name;
};

const UploadFiles: React.FC<UploadFilesProps> = ({
  onUploadComplete,
  showImagePicker = true,
}) => {
  const [file, setFile] = useState<PickedFile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { onRequest, isPending } = useApi<FormData>({ method: "post" });
  const { onRequest: onDelete, isPending: isDeleting } = useApi({
    method: "delete",
  });

  // Pick image and auto-upload
  const pickFile = async () => {
    setError(null);
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
      multiple: false,
    });
    if (!result.canceled && result.assets.length > 0) {
      const asset = result.assets[0];
      const name = asset.name || asset.uri.split("/").pop() || "file";
      const type = asset.mimeType || "application/octet-stream";
      const picked = {
        uri: asset.uri,
        name,
        type,
      };
      setFile(picked);
      uploadFile(picked);
    }
  };

  // Upload file
  const uploadFile = (picked: PickedFile) => {
    setError(null);
    const formData = new FormData();
    formData.append("files", {
      uri: picked.uri,
      name: picked.name,
      type: picked.type,
    } as any);
    onRequest({
      path: "upload",
      data: formData,
      onSuccess: (data) => {
        if (data && data.fileUrls && data.fileUrls[0]) {
          setFile({ ...picked, uri: data.fileUrls[0] }); // store backend url in uri
          onUploadComplete(data.fileUrls);
        }
      },
      onError: () => {
        setError("Upload failed. Please try again.");
        setFile(null);
      },
    });
  };

  // Remove file (delete from backend)
  const removeFile = () => {
    setError(null);
    if (file && file.uri && file.uri.startsWith("http")) {
      const encodedUrl = encodeURIComponent(file.uri);
      onDelete({
        path: `upload/${encodedUrl}`,
        onSuccess: () => {
          setFile(null);
          onUploadComplete([]);
        },
        onError: () => {
          setError("Failed to delete image from server.");
        },
      });
    } else {
      setFile(null);
      onUploadComplete([]);
    }
  };

  return (
    <View style={styles.container}>
      {file && file.name ? (
        <View style={styles.inputLike}>
          <Ionicons
            name="image"
            size={24}
            color={Colors.primary}
            style={{ marginRight: 10 }}
          />
          <Text style={styles.inputText} numberOfLines={1}>
            {getShortFileName(file.name)}
          </Text>
          <TouchableOpacity
            style={styles.deleteIcon}
            onPress={removeFile}
            disabled={isDeleting}
          >
            <Ionicons
              name="trash-outline"
              size={22}
              color={isDeleting ? "#aaa" : "#E53935"}
            />
          </TouchableOpacity>
          {(isPending || isDeleting) && (
            <ActivityIndicator style={{ marginLeft: 8 }} color={Colors.primary} />
          )}
        </View>
      ) : (
        <TouchableOpacity
          style={styles.inputLike}
          onPress={pickFile}
          activeOpacity={0.7}
        >
          <Ionicons
            name="document"
            size={28}
            color={Colors.primary}
            style={{ marginRight: 10 }}
          />
          <Text style={styles.inputText}>Pick File</Text>
        </TouchableOpacity>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 0,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 15,
    color: Colors.primary,
    marginBottom: 6,
    marginLeft: 2,
  },
  inputLike: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eae5e7",
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "100%",
    minHeight: 48,
  },
  inputText: {
    color: "#767E8C",
    fontSize: 15,
    fontWeight: "500",
  },
  previewContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 2,
    marginBottom: 2,
  },
  imagePreview: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: Colors.primary,
    marginBottom: 4,
    marginTop: 2,
    alignSelf: "center",
  },
  removeIcon: {
    position: "absolute",
    top: -8,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 14,
  },
  deleteIcon: {
    marginLeft: "auto",
    padding: 6,
    borderRadius: 16,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "red",
    marginTop: 4,
    fontSize: 12,
  },
});

export default UploadFiles;
