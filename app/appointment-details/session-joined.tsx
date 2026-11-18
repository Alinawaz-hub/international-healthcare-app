import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";

const SessionJoined = () => {
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  return (
    <View style={styles.container}>
      {/* Full-screen Doctor Image */}
      <Image
        source={require("@/assets/images/doctor.png")}
        style={styles.doctorImage}
      />

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Small Video Thumbnail (Toggles based on isVideoEnabled) */}
      {isVideoEnabled && (
        <Image
          source={require("@/assets/images/woman.png")}
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

        {/* Upload Button */}
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => router.push("/book-appointments/chat-details")}
        >
          <Ionicons name="chatbox-outline" size={28} color="white" />
        </TouchableOpacity>

        {/* End Call Button */}
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/appointment-details/join-session",
              params: { review: "true" },
            })
          }
          style={[styles.controlButton, styles.endCall]}
        >
          <Ionicons name="call-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>
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
});

export default SessionJoined;
