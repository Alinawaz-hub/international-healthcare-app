import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Header from "@/components/user-flow/header";
import Button from "@/components/button";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";

const { width, height } = Dimensions.get("window");

const MedicalAttentionScreen = () => {
  const [selectedPerson, setSelectedPerson] = useState<
    "me" | "someoneElse" | null
  >(null);
  const [age, setAge] = useState("");
  const [error, setError] = useState<string | null>(null);

  const toggleSelection = (value: "me" | "someoneElse") => {
    setSelectedPerson(selectedPerson === value ? null : value);
    setError(null);
  };

  const handleContinue = () => {
    const ageTrimmed = age.trim();

    if (!selectedPerson && !ageTrimmed) {
      setError("Please select the Medical Attention & Patient Age");
    } else if (!selectedPerson) {
      setError("Please select Medical Attention");
    } else if (!ageTrimmed) {
      setError("Please enter the Patient Age");
    } else {
      setError(null);
      router.push("/book-appointments/available-time-slot4");
    }
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

      <Text style={styles.title}>Book Your Appointment</Text>
      <Text style={styles.subtitle}>
        Complete the following steps to schedule appointment.
      </Text>

      <Text style={styles.label}>Who Requires Medical Attention?</Text>
      <View style={styles.radioGroup}>
        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => toggleSelection("me")}
        >
          <View style={styles.radioCircle}>
            {selectedPerson === "me" && <View style={styles.selectedDot} />}
          </View>
          <Text style={styles.radioText}>Me</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => toggleSelection("someoneElse")}
        >
          <View style={styles.radioCircle}>
            {selectedPerson === "someoneElse" && (
              <View style={styles.selectedDot} />
            )}
          </View>
          <Text style={styles.radioText}>Someone else</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Patient Age</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 25"
        placeholderTextColor="#9E9E9E"
        keyboardType="numeric"
        value={age}
        onChangeText={(text) => {
          setAge(text);
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
          title="Select & Continue"
          type="default"
          onPress={handleContinue}
          style={[
            styles.continueButton,
            {
              backgroundColor:
                selectedPerson && age.trim() ? Colors.primary : "#CBCACE",
            },
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
    marginBottom: height * 0.01,
  },
  subtitle: {
    fontSize: width * 0.04,
    color: "#555",
    marginBottom: height * 0.03,
  },
  label: {
    fontSize: width * 0.045,
    fontWeight: "700",
    marginBottom: 10,
  },
  radioGroup: {
    marginBottom: height * 0.02,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  radioCircle: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  selectedDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  radioText: {
    fontSize: width * 0.04,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: width * 0.04,
    backgroundColor: "#fff",
    width: "100%",
  },
  buttonGroup: {
    alignItems: "center",
    marginTop: 10,
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
});

export default MedicalAttentionScreen;