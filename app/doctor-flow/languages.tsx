import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import HomeHeaderDoc from "@/components/doctor-flow/home-header-doctor";

const Languages = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const options = [
    {
      id: "1",
      title: "English",
      route: "",
    },
    
    {
      id: "3",
      title: "Arabic",
      route: "",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <HomeHeaderDoc
        showSearch={false}
        showFilter={false}
        showAdd={false}
      />

      {/* Title */}
      <Text style={styles.title}>Languages</Text>

      {/* Options */}
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={styles.option}
          onPress={() => {
            if (option.id === "2") {
              setModalVisible(true);
            } else {
              router.push(option.route as any);
            }
          }}
        >
          <Text style={styles.optionText}>{option.title}</Text>
          <FontAwesome name="angle-right" size={20} color="#000" />
        </TouchableOpacity>
      ))}

      {/* Modal Popup */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Do you want to delete your account?
            </Text>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.noButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.yesButton]}
                onPress={() => {
                  setModalVisible(false);
                  console.log("Account deleted");
                }}
              >
                <Text style={[styles.buttonText, { color: "white" }]}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Languages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 20,
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  button: {
    width: "45%",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  noButton: {
    backgroundColor: "#E0E0E0",
  },
  yesButton: {
    backgroundColor: "#FF4D4D",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
