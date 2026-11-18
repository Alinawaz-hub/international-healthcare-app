import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import Header from "@/components/doctor-flow/header-doc";
import Button from "@/components/button";
import { useLocalSearchParams, router } from "expo-router";

const JoinSessiondoc = () => {
  const params = useLocalSearchParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    if (params.review === "true") {
      setIsModalVisible(true);
    }
  }, [params.review]);

  const toggleStar = (star: number) => {
    setSelectedRating((prev) => (prev === star ? 0 : star));
  };
  const submitReview = () => {
    // Here you can add API call to submit the review
    console.log("Review Submitted:", {
      rating: selectedRating,
      review: reviewText,
    });
    setIsModalVisible(false);
    // Reset the review input after submission (optional)
    setSelectedRating(0);
    setReviewText("");
  };

  return (
    <View style={styles.container}>
      <Header
        showBack={true}
        showSearch={false}
        showFilter={false}
        showAdd={false}
        showEdit={false}
        showShare={false}
        showDownload={false}
      />

      <Text style={styles.title}>Join Session</Text>
      <View style={styles.videoPlaceholder} />

      <Text style={styles.sessionTitle}>Join Session</Text>
      <Text style={styles.sessionDescription}>
        Attend your medical session with your Therapist.
      </Text>

      <Button
        title="Join Session"
        type="default"
        style={styles.joinButton}
        onPress={() => router.push("/appointment-details-doc/session-joined")}
      />

      {/* Review Modal */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 80,
    textAlign: "left",
  },
  videoPlaceholder: {
    width: "100%",
    height: 180,
    backgroundColor: "#1F1F1F",
    borderRadius: 10,
    marginTop: 20,
  },
  sessionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
  },
  sessionDescription: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginTop: 5,
  },
  joinButton: {
    marginTop: 40,
    alignSelf: "center",
    width: "100%",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  keyboardAvoidingView: {
    width: "100%",
    alignItems: "center",
  },
  modalScrollView: {
    width: "100%",
    justifyContent: "center",
  },
  modalContent: {
    width: "95%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  dragLineContainer: {
    alignItems: "center",
    width: "100%",
    left: 95,
  },
  dragLine: {
    width: 139,
    height: 5,
    backgroundColor: "#1F1F1F",
    borderRadius: 3,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
  },
  modalDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "left",
  },
  starContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
  },
  starIcon: {
    marginHorizontal: 5,
  },
  buttonContainer: {
    gap: 10,
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#A8A8A8",
  },
});

export default JoinSessiondoc;
