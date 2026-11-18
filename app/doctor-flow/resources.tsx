import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Modal,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useNavigation } from "expo-router";
import HomeHeaderDoc from "../../components/doctor-flow/home-header-doctor";
import Button from "@/components/button";
import Input from "@/components/input";
import { useRouter } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const { width } = Dimensions.get("window");

const Resources = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [folderModalVisible, setFolderModalVisible] = useState(false);
  const [folderName, setFolderName] = useState("");
  const navigation = useNavigation();

  // Function to handle file selection
  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (result.canceled || !result.assets.length) {
        return;
      }

      const file = result.assets[0];

      Alert.alert("File Selected", `Name: ${file.name}`);
    } catch (error) {
      console.log("Error picking file:", error);
    }
  };

  // Inside the component
  const router = useRouter();

  const createFolder = () => {
    if (folderName.trim() === "") {
      Alert.alert("Error", "Folder name cannot be empty.");
      return;
    }

    setFolderModalVisible(false);
    setModalVisible(false);

    router.push({
      pathname: "/doctor-flow/folder",
      params: { folderName },
    });

    setFolderName("");
  };

  return (
    <View style={styles.container}>
      <HomeHeaderDoc showSearch={false} showFilter={true} showAdd={true} />

      <Text style={styles.heading}>Resources</Text>

      <View style={styles.emptyStateContainer}>
        <Ionicons
          name="folder-open-outline"
          size={120}
          color={Colors.primary}
          style={styles.folderIcon}
        />
        <Text style={styles.noFileText}>No File Found</Text>
        <Text style={styles.subText}>
          There is no file uploaded by admin, clinic, or therapist.
        </Text>
      </View>

      <Button
        title="Add File/Folder"
        onPress={() => setModalVisible(true)}
        style={styles.addButton}
        type={"default"}
      />

      {/* Main Modal for Upload & Create Folder */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalOption} onPress={pickFile}>
              <Text style={styles.modalText}>Upload file</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                setModalVisible(false);
                setFolderModalVisible(true);
              }}
            >
              <Text style={styles.modalText}>Create folder</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* Create Folder Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={folderModalVisible}
        onRequestClose={() => setFolderModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setFolderModalVisible(false)}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, justifyContent: "flex-end" }}
          >
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "flex-end",
              }}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.folderModalContainer}>
                <View style={styles.indicator} />
                <Text style={styles.modalTitle}>Create Folder</Text>
                <Input
                  style={styles.input}
                  placeholder="Enter folder name"
                  value={folderName}
                  onChangeText={setFolderName}
                />
                <Button
                  title="Create Folder"
                  onPress={createFolder}
                  style={styles.folderButton}
                  type={"default"}
                />
                <Button
                  title="Cancel"
                  onPress={() => setFolderModalVisible(false)}
                  style={styles.cancelButton}
                  type={"default"}
                  textStyle={{ color: "black" }}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>
    </View>
  );
};

export default Resources;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 10,
    fontFamily: "Raleway-Bold",
    marginTop: 20,
  },
  emptyStateContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  image: {
    width: width * 0.6,
    height: width * 0.4,
  },
  folderIcon: {
    marginBottom: 20,
  },
  noFileText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    marginTop: 10,
    fontFamily: "Raleway-Bold",
  },
  subText: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    width: width * 0.8,
    marginTop: 5,
    fontFamily: "OpenSans-Regular",
  },
  addButton: {
    marginTop: 150,
    alignSelf: "center",
    top: -200,
  },
  fileContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
    width: width * 0.8,
    alignItems: "center",
  },
  fileText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    margin: 15,
    alignItems: "center",
  },
  modalOption: {
    width: "100%",
    padding: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  modalText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  folderModalContainer: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    margin: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  input: {
    width: 310,
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
    borderRadius: 80,
    marginBottom: 10,
  },
  folderButton: {
    alignSelf: "center",
    width: "100%",
    marginTop: 15,
  },
  cancelButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    width: "100%",
    marginTop: 10,
  },
  indicator: {
    width: 140,
    height: 6,
    backgroundColor: "#1F1F1F",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 12,
    top: -10,
  },
});
