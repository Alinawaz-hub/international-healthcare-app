import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import Button from "@/components/button";
import Header from "@/components/user-flow/header";
import { Ionicons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { useFetch } from "@/hooks/useFetch";
import { Colors } from "@/constants/Colors";

const SelectDoctorService = () => {
  const [selectedMainService, setSelectedMainService] = useState<string | null>(
    null
  );
  const [selectedSubservice, setSelectedSubservice] = useState<string | null>(
    null
  );
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const params = useLocalSearchParams();
  const doctorId = params?.doctorId;

  // Fetch subservices for the doctor
  const { data, error, isLoading } = useFetch<{ subServices: any[] }>(
    doctorId ? `services/subservices/doctor/${doctorId}` : "",
    { skip: !doctorId }
  );

  const subservices = data?.subServices || [];

  // Extract unique parent services from subservices
  const mainServiceOptions = Array.from(
    new Map(
      subservices.map((s) => [s.parentService?.id, s.parentService])
    ).values()
  ).filter(Boolean);

  const filteredMainServiceOptions = mainServiceOptions.filter((opt) =>
    opt.serviceName.toLowerCase().includes(search.toLowerCase())
  );

  const filteredSubservices = subservices.filter(
    (s) => s.parentService?.id === selectedMainService
  );

  const handleContinuePress = () => {
    setErrorMessage(""); // reset first

    if (!isLoading && filteredMainServiceOptions.length === 0) {
      setErrorMessage("Cannot continue without selecting a service.");
    } else if (!selectedMainService) {
      setErrorMessage("Please select a service to see subservices.");
    } else if (!selectedSubservice) {
      setErrorMessage("Please select a subservice");
    } else {
      setErrorMessage("");
      router.push({
        pathname: "/book-appointments/available-time-slot",
        params: { doctorId, subServiceId: selectedSubservice },
      });
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
        <Text style={styles.heading}>Select Doctor Service</Text>
        <Text style={styles.description}>
          Complete the following steps to select a doctor service.
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
            value={search}
            onChangeText={(text) => {
              setSearch(text);
              setSelectedMainService(null);
              setSelectedSubservice(null);
              setErrorMessage("");
            }}
          />
        </View>

        {/* Main Service */}
        <Text style={styles.sectionTitle}>Select Your Required Service</Text>

        <Dropdown
          style={styles.dropdown}
          data={filteredMainServiceOptions.map((opt) => ({
            label: opt.serviceName,
            value: opt.id,
          }))}
          labelField="label"
          valueField="value"
          placeholder={
            isLoading
              ? "Select main service"
              : filteredMainServiceOptions.length === 0
              ? "No service available"
              : "Select main service"
          }
          value={selectedMainService}
          onChange={(item) => {
            setSelectedMainService(item.value);
            setSelectedSubservice(null);
            setErrorMessage("");
          }}
          placeholderStyle={{
            color:
              !isLoading && filteredMainServiceOptions.length === 0
                ? "#E53935"
                : "#9E9E9E",
            fontSize: 16,
          }}
          selectedTextStyle={{ color: "#000", fontSize: 16 }}
          disable={!isLoading && filteredMainServiceOptions.length === 0}
        />

        {/* Subservice */}
        {selectedMainService && filteredSubservices.length > 0 && (
          <Dropdown
            style={styles.dropdown}
            data={filteredSubservices.map((sub) => ({
              label: `${sub.serviceName}  ${
                typeof sub.price === "number"
                  ? `- PKR ${sub.price.toLocaleString()}`
                  : ""
              }`,
              value: sub.id,
            }))}
            labelField="label"
            valueField="value"
            placeholder="Select subservice"
            value={selectedSubservice}
            onChange={(item) => {
              setSelectedSubservice(item.value);
              setErrorMessage("");
            }}
            placeholderStyle={{ color: "#9E9E9E", fontSize: 16 }}
            selectedTextStyle={{ color: "#000", fontSize: 16 }}
          />
        )}

        {selectedMainService &&
          filteredSubservices.length === 0 &&
          !isLoading && (
            <Text style={styles.validationText}>
              No subservices available for this service.
            </Text>
          )}

        {/* Error Message (Unified, above buttons) */}
        {errorMessage !== "" && (
          <Text style={styles.validationText}>{errorMessage}</Text>
        )}
        <View style={styles.buttonGroup}>
          <Button
            title="Select & Continue"
            type="default"
            onPress={handleContinuePress}
            style={{
              width: "100%",
              height: 48,
              backgroundColor: selectedSubservice ? Colors.primary : "#CBCACE",
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

export default SelectDoctorService;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 50,
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginBottom: 10,
    fontFamily: "Raleway-Bold",
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
  dropdown: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 80,
    backgroundColor: "#F9F9F9",
    marginBottom: 18,
    paddingHorizontal: 12,
    height: 48,
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
