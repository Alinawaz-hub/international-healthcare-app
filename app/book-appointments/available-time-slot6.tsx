import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Input from "@/components/input";
import { router } from "expo-router";
import Header from "@/components/user-flow/header";
import Button from "@/components/button";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const { width, height } = Dimensions.get("window");

const UploadReportScreen = () => {
  const [fileName, setFileName] = useState("");
  const [uploadTime, setUploadTime] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  const handleDocumentPick = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (result.assets && result.assets.length > 0) {
      const file = result.assets[0];
      setFileName(file.name);
      const now = new Date();
      setUploadTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
      setFileUploaded(true);
      setShowValidation(false);
    }
  };

  const handleRemove = () => {
    setFileName("");
    setUploadTime("");
    setShowOptions(false);
    setFileUploaded(false);
  };

  const handleContinue = () => {
    if (fileUploaded) {
      setShowValidation(false);
      router.push("/book-appointments/available-time-slot7");
    } else {
      setShowValidation(true);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        showBack
        showSearch={false}
        showFilter={false}
        showAdd={false}
        showDownload={false}
      />

      <Text style={styles.title}>Book Your Appointment</Text>
      <Text style={styles.subtitle}>
        Complete the following steps to schedule appointment.
      </Text>

      <Text style={styles.sectionTitle}>Upload Your Report</Text>
      <View style={styles.uploadRow}>
        <Input
          placeholder="File name"
          size="half"
          value={fileName}
          editable={false}
        />

        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleDocumentPick}
        >
          <Ionicons
            name="cloud-upload-outline"
            size={24}
            color={Colors.primary}
          />
          <Text style={styles.uploadText}>Upload</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dotsButton}
          onPress={() => setShowOptions(!showOptions)}
        >
          <Icon name="dots-vertical" size={24} color="#525252" />
        </TouchableOpacity>
      </View>

      {fileName ? (
        <Text style={styles.uploadDetails}>Uploaded at {uploadTime}</Text>
      ) : null}

      {/* Popup for Remove option */}
      {showOptions && fileName !== "" && (
        <View style={styles.popupMenu}>
          <Pressable onPress={handleRemove}>
            <Text style={styles.popupItem}>Remove</Text>
          </Pressable>
        </View>
      )}

      {/* Show validation error only after trying to continue */}
      {showValidation && !fileUploaded && (
        <Text style={styles.validationText}>
          Please upload a file to continue
        </Text>
      )}

      <View style={styles.buttonGroup}>
        <Button
          title="Upload & Continue"
          type="default"
          onPress={handleContinue}
          style={[
            styles.continueButton,
            { backgroundColor: fileUploaded ? Colors.primary : "#CBCACE" },
          ]}
        />
        <Button
          title="Cancel"
          type="default"
          onPress={() => router.push("/(home-screen)/home-page")}
          style={styles.cancelButton}
          textStyle={{ color: "black" }}
        />
      </View>
    </View>
  );
};

export default UploadReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: width * 0.04,
    color: "#555",
    marginBottom: height * 0.03,
  },
  sectionTitle: {
    fontSize: width * 0.045,
    fontWeight: "700",
    marginBottom: 15,
  },
  uploadRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: height * 0.05,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  uploadText: {
    color: Colors.primary,
    fontWeight: "700",
    fontSize: width * 0.04,
  },
  dotsButton: {
    marginLeft: width * 0.1,
    padding: 5,
  },
  buttonGroup: {
    marginTop: 10,
    alignItems: "center",
  },
  continueButton: {
    width: "100%",
    height: 48,
    backgroundColor: Colors.primary,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    width: "100%",
  },
  uploadDetails: {
    marginTop: -25,
    marginBottom: height * 0.05,
    marginLeft: 10,
    fontSize: width * 0.035,
    color: "#666",
  },
  popupMenu: {
    position: "absolute",
    right: width * 0.07,
    top: height * 0.37,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    zIndex: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  popupItem: {
    paddingVertical: 5,
    fontSize: width * 0.04,
    color: "#E53935",
  },
  validationText: {
    color: "#E53935",
    fontSize: width * 0.04,
    marginTop: height * 0.02,
    textAlign: "center",
  },
});