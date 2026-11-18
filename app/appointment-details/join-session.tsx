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
import Button from "@/components/button";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Input from "@/components/input";
import Header from "@/components/user-flow/header";

const JoinSession = () => {
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
    console.log("Review Submitted:", {
      rating: selectedRating,
      review: reviewText,
    });

    setIsModalVisible(false); // Close the modal first

    setTimeout(() => {
      router.push("/(home-screen)/home-page");
    }, 300); // Wait 300ms before navigating
  };

  return (
    <View style={styles.container}>
      <Header
        showBack={true}
        showSearch={false}
        showFilter={false}
        showAdd={false}
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
        onPress={() => router.push("/appointment-details/session-joined")}
      />

      {/* Review Modal */}
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.modalContainer}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.keyboardAvoidingView}
            >
              <ScrollView
                contentContainerStyle={styles.modalScrollView}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.modalContent}>
                  <View style={styles.dragLineContainer}>
                    <View style={styles.dragLine} />
                  </View>

                  <Text style={styles.modalTitle}>Submit your review</Text>
                  <Text style={styles.modalDescription}>
                    Please rate and write your experience with the Therapist and
                    our app.
                  </Text>

                  <View style={styles.starContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <TouchableOpacity
                        key={star}
                        onPress={() => toggleStar(star)}
                      >
                        <Ionicons
                          name="star"
                          size={30}
                          color={star <= selectedRating ? "yellow" : "#A8A8A8"}
                          style={styles.starIcon}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>

                  {/* Review Input */}
                  <Input
                    placeholder="Write your review"
                    value={reviewText}
                    onChangeText={setReviewText}
                    style={{ width: 350 }}
                  />

                  <View style={styles.buttonContainer}>
                    <Button
                      title="Submit Review"
                      type="default"
                      onPress={submitReview}
                    />
                    <Button
                      title="Cancel"
                      type="default"
                      style={styles.cancelButton}
                      textStyle={{ color: "black" }}
                      onPress={() => setIsModalVisible(false)}
                    />
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 80,
    textAlign: "center",
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

  // Modal Styles
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

export default JoinSession;
