import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import Button from "@/components/button";
import Header from "@/components/user-flow/header";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const services = [
  { id: "1", title: "Life Coaching Therapy Services" },
  { id: "2", title: "Mental Health Therapy" },
  { id: "3", title: "Support Group Therapy" },
  { id: "4", title: "Mindfulness & Stress Reduction" },
  { id: "5", title: "Life Coaching Therapy Services" },
  { id: "6", title: "Support Group Therapy" },
];

const Appointments = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSelectService = (id: string) => {
    setSelectedService((prev) => (prev === id ? null : id));
    setErrorMessage(""); // Clear error when service is selected
  };

  const handleContinuePress = () => {
    if (!selectedService) {
      setErrorMessage("Please select the Service");
    } else {
      setErrorMessage("");
      router.push("/book-appointments/select-doctor");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF", paddingHorizontal: 15 }}>
      <Header
        showBack
        showSearch={false}
        showFilter={false}
        showAdd={false}
        showDownload={false}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Book Your Appointment</Text>
        <Text style={styles.description}>
          Complete the following steps to schedule appointment.
        </Text>

        {/* Search Input */}
        <View style={styles.searchWrapper}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#9E9E9E"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search here..."
            placeholderTextColor="#9E9E9E"
          />
        </View>

        {/* Service Selection */}
        <Text style={styles.sectionTitle}>Select Your Required Service</Text>

        <View style={styles.servicesContainer}>
          {services.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.serviceCard,
                selectedService === item.id && styles.selectedService,
              ]}
              onPress={() => handleSelectService(item.id)}
            >
              <Text style={styles.therapistText}>23 Doctors</Text>
              <Text style={styles.serviceText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Error Message */}
        {errorMessage !== "" && (
          <Text style={styles.validationText}>{errorMessage}</Text>
        )}

        {/* Buttons */}
        <View style={styles.buttonGroup}>
          <Button
            title="Select & Continue"
            type="default"
            onPress={handleContinuePress}
            style={{
              width: "100%",
              height: 48,
              backgroundColor: selectedService ? Colors.primary : "#CBCACE",
              marginBottom: 10,
            }}
            textStyle={{ color: "#fff" }}
          />

          <Button
            title="Cancel"
            type="default"
            style={{
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "#E0E0E0",
              width: "100%",
            }}
            textStyle={{ color: "black" }}
            onPress={() => router.push("/(home-screen)/home-page")}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Appointments;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 50,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 10,
    fontFamily: "Raleway-Bold",
    marginTop: 20,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 80,
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
    color: "#000",
    borderRadius: 80,
  },
  description: {
    fontSize: 16,
    color: "gray",
    marginBottom: 25,
    fontFamily: "OpenSans-Regular",
    width: "90%",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginBottom: 10,
    fontFamily: "Raleway-Bold",
  },
  servicesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  serviceCard: {
    width: "48%",
    height: 81,
    backgroundColor: "#FAFAFA",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "transparent",
  },
  selectedService: {
    borderColor: "#1F1F1F",
  },
  therapistText: {
    fontSize: 14,
    color: "#9E9E9E",
    marginBottom: 5,
  },
  serviceText: {
    fontSize: 14,
    color: "#525252",
    fontWeight: "700",
    fontFamily: "Raleway-Bold",
  },
  validationText: {
    color: "#E53935",
    fontSize: 14,
    marginTop: 5,
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "OpenSans-Regular",
  },
  buttonGroup: {
    marginTop: 20,
    alignItems: "center",
  },
});