import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import AppointmentDetailsDoc from "././appointment-details-doc";

const SessionJoinedDoc = () => {
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [folderModalVisible, setFolderModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Full-screen Doctor Image */}
      <Image
        source={require("@/assets/images/woman.png")}
        style={styles.doctorImage}
      />

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Small Video Thumbnail (Toggles based on isVideoEnabled) */}
      {isVideoEnabled && (
        <Image
          source={require("@/assets/images/doctor.png")}
          style={styles.smallVideo}
        />
      )}

      {/* Bottom Control Buttons */}
      <View style={styles.controls}>
        {/* Mic Button */}
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => setIsMicMuted(!isMicMuted)}
        >
          <Ionicons
            name={isMicMuted ? "mic-off-outline" : "mic-outline"}
            size={28}
            color="white"
          />
        </TouchableOpacity>

        {/* Video Button */}
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => setIsVideoEnabled(!isVideoEnabled)}
        >
          <Ionicons
            name={isVideoEnabled ? "videocam-outline" : "videocam-off-outline"}
            size={28}
            color="white"
          />
        </TouchableOpacity>

        {/* Prescription Button */}
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() =>
            router.push("/appointment-details-doc/create-prescription")
          }
        >
          <Ionicons name="book-outline" size={28} color="white" />
        </TouchableOpacity>

        {/* Upload Button (Opens Modal) */}
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Ionicons name="cloud-upload-outline" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => router.push("/doctor-flow/chat-details")}
        >
          <Ionicons name="chatbox-outline" size={28} color="white" />
        </TouchableOpacity>

        {/* End Call Button */}
        <TouchableOpacity
          onPress={() => router.push("/(home-screen-doctor)/home-page-doctor")}
          style={[styles.controlButton, styles.endCall]}
        >
          <Ionicons name="call-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Bottom Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setIsModalVisible(false)}
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
              <TouchableWithoutFeedback
                onPress={() => setIsModalVisible(false)}
              >
                <View style={styles.modalContainer}>
                  <TouchableWithoutFeedback>
                    <View style={styles.modalContent}>
                      <View style={styles.indicator} />
                      <AppointmentDetailsDoc
                        showHeader={false}
                        showButtons={false}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  doctorImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 80,
  },
  smallVideo: {
    position: "absolute",
    bottom: 140,
    right: 20,
    width: 120,
    height: 160,
    borderRadius: 10,
  },
  controls: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  controlButton: {
    backgroundColor: "#1F1F1F",
    padding: 15,
    borderRadius: 50,
  },
  endCall: {
    backgroundColor: "red",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "80%",
  },
  indicator: {
    width: 140,
    height: 6,
    backgroundColor: "#1F1F1F",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 12,
    marginTop: 10,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailsContainer: {
    marginTop: 10,
  },
  detailText: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default SessionJoinedDoc;
