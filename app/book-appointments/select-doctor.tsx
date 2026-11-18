import { View, Text, ScrollView, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import Button from "@/components/button";
import Header from "@/components/user-flow/header";
import { Ionicons } from "@expo/vector-icons";
import OurSpecialists1 from "@/components/user-flow/our-specialists1";
import { Colors } from "@/constants/Colors";

const selectableSpecialists = ["1", "2", "3", "4"];

const Appointments = () => {
  const [selectedSpecialist, setSelectedSpecialist] = useState<string | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState("");

  function handleSelectSpecialist(id: string): void {
    setSelectedSpecialist((prev) => (prev === id ? null : id));
    setErrorMessage("");
  }

  const handleContinuePress = () => {
    if (!selectedSpecialist) {
      setErrorMessage("Please Select the Doctor");
    } else {
      setErrorMessage("");
      router.push("/book-appointments/doctor-details");
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

        <Text style={styles.sectionTitle}>Select Doctor</Text>

        <OurSpecialists1
          showHeading={false}
          showButton={false}
          selectableSpecialists={selectableSpecialists}
          selectedSpecialist={selectedSpecialist}
          onSelectSpecialist={handleSelectSpecialist}
        />

        {/* Error Message */}
        {errorMessage !== "" && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}

        <View style={styles.buttonGroup}>
          <Button
            title="Select & Continue"
            type="default"
            onPress={handleContinuePress}
            style={{
              width: "100%",
              height: 48,
              backgroundColor: selectedSpecialist ? Colors.primary : "#CBCACE",
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
  description: {
    fontSize: 16,
    color: "gray",
    marginBottom: 25,
    fontFamily: "OpenSans-Regular",
    width: "90%",
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginBottom: 10,
    fontFamily: "Raleway-Bold",
  },
  errorText: {
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