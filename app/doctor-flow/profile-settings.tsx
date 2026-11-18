import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import HomeHeaderDoc from "../../components/doctor-flow/home-header-doctor";

const ProfileSettings = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const settingsOptions = [
    { id: "1", title: "Personal Info", route: "/doctor-flow/personal-info" },
    {
      id: "2",
      title: "Educational Info",
      route: "/doctor-flow/educational-info",
    },
    {
      id: "3",
      title: "Professional Info",
      route: "/doctor-flow/professional-info",
    },
    { id: "4", title: "Close account", route: "confirm-delete" },
  ];

  const handleOptionPress = (route: string) => {
    if (route === "confirm-delete") {
      setModalVisible(true);
    } else {
      router.push(route as any);
    }
  };

  const handleDeleteAccount = () => {
    setModalVisible(false);
    router.push("/auth/sign-in");
  };

  return (
    <View style={styles.container}>
      <HomeHeaderDoc showSearch={true} showFilter={true} showAdd={false} />

      <Text style={styles.title}>Profile Settings</Text>

      {settingsOptions.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={styles.option}
          onPress={() => handleOptionPress(option.route)}
        >
          <Text style={styles.optionText}>{option.title}</Text>
          <FontAwesome name="angle-right" size={20} color="#000" />
        </TouchableOpacity>
      ))}

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Do you want to delete your account?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.noButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.noButtonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.yesButton}
                onPress={handleDeleteAccount}
              >
                <Text style={styles.yesButtonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default ProfileSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 20,
    marginTop: 20,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    color: "#000",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    height: "20%",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 10,
  },
  noButton: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  noButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
  },
  yesButton: {
    backgroundColor: "#FF4D4D", // warning red
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  yesButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
  },
});
