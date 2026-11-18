import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import Header from "@/components/user-flow/header";
import Button from "@/components/button";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";

const { width, height } = Dimensions.get("window");

const DoctorHelpScreen = () => {
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleContinue = () => {
    if (description.trim()) {
      setError(null);
      router.push("/book-appointments/available-time-slot5");
    } else {
      setError("Please describe your issue");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Header
          showBack={true}
          showSearch={false}
          showFilter={false}
          showAdd={false}
          showDownload={false}
        />

        <Text style={styles.title}>Book Your Appointment</Text>
        <Text style={styles.subtitle}>
          Complete the following steps to schedule appointment.
        </Text>

        <Text style={styles.label}>How Can The Doctor Help You?</Text>
        <Text style={styles.description}>
          Specify symptoms or medication needed so doctors can assist.{"\n"}
          Your request is fully anonymized; doctors see only the description.
          Avoid personal details.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Describe your issue"
          placeholderTextColor="#9E9E9E"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={(text) => {
            setDescription(text);
            setError(null);
          }}
        />

        {error && (
          <View style={{ alignItems: "center", marginBottom: 10 }}>
            <Text style={{ color: "red", fontSize: 14 }}>{error}</Text>
          </View>
        )}

        <View style={styles.buttonGroup}>
          <Button
            title="Continue"
            type="default"
            onPress={handleContinue}
            style={[
              styles.continueButton,
              {
                backgroundColor: description.trim() ? Colors.primary : "#CBCACE",
              },
            ]}
          />
          <Button
            title="Cancel"
            type="default"
            style={styles.cancelButton}
            textStyle={{ color: "black" }}
            onPress={() => router.push("/(home-screen)/home-page")}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: height * 0.03,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: "700",
    marginBottom: 5,
    marginTop: 20,
  },
  subtitle: {
    fontSize: width * 0.04,
    color: "#555",
    marginBottom: height * 0.025,
  },
  label: {
    fontSize: width * 0.05,
    fontWeight: "700",
    marginBottom: 10,
  },
  description: {
    fontSize: width * 0.035,
    color: "#9E9E9E",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 25,
    padding: width * 0.04,
    fontSize: width * 0.04,
    textAlignVertical: "top",
    backgroundColor: "#fff",
    marginBottom: 20,
    minHeight: height * 0.2,
  },
  buttonGroup: {
    alignItems: "center",
    marginTop: 10,
  },
  continueButton: {
    width: "100%",
    height: 48,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    width: "100%",
  },
});

export default DoctorHelpScreen;