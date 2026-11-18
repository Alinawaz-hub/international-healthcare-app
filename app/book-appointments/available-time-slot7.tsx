import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { router } from "expo-router";
import Button from "@/components/button";
import * as DocumentPicker from "expo-document-picker";
import { Dimensions, StyleSheet } from "react-native";
import Header from "@/components/user-flow/header";
import { Colors } from "@/constants/Colors";
export default function ReviewAppointmentScreen() {
  const [activeTab, setActiveTab] = useState("Personal Info");
  const [rememberMe, setRememberMe] = useState(false);

  const tabs = [
    "Personal Info",
    "Appointment Info",
    "Therapist Info",
    "Medical Info",
    "Reports",
  ];
  const [selectedFile1, setSelectedFile1] =
    useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [selectedFile2, setSelectedFile2] =
    useState<DocumentPicker.DocumentPickerAsset | null>(null);

  const pickDocument = async (
    setFile: React.Dispatch<
      React.SetStateAction<DocumentPicker.DocumentPickerAsset | null>
    >
  ) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log("User canceled or no file selected.");
        return;
      }

      setFile(result.assets[0]);
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {/* Header */}
      <Header
        showBack={true}
        showSearch={false}
        showFilter={false}
        showAdd={false}
        showDownload={false}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>Book Your Appointment</Text>
          <Text style={styles.description}>
            Complete the following steps to schedule an appointment.
          </Text>
        </View>

        {/* Tabs using FlatList */}
        <View style={{ gap: 10 }}>
          <Text style={styles.heading1}>Review Info</Text>
          <FlatList
            data={tabs}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.tabsContainer}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === item ? styles.activeTab : styles.inactiveTab,
                ]}
                onPress={() => setActiveTab(item)}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === item && styles.activeTabText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Dynamic Info Section */}
        <View style={styles.infoContainer}>
          {activeTab === "Personal Info" && (
            <>
              <View style={{ gap: 13 }}>
                <Text style={styles.infoLabel}>
                  Session for: <Text style={styles.infoText}>My Self</Text>
                </Text>
                <Text style={styles.infoLabel}>
                  Name: <Text style={styles.infoText}>Alexander Jones</Text>
                </Text>
                <Text style={styles.infoLabel}>
                  Age: <Text style={styles.infoText}>25</Text>
                </Text>
                <Text style={styles.infoLabel}>
                  Email:{" "}
                  <Text style={styles.infoText}>alexander@gmail.com</Text>
                </Text>
                <Text style={styles.infoLabel}>
                  Phone: <Text style={styles.infoText}>+1 (234) 567-8900</Text>
                </Text>
              </View>
            </>
          )}

          {activeTab === "Appointment Info" && (
            <>
              <View style={{ gap: 13 }}>
                <Text style={styles.infoLabel}>
                  Appointment type:{" "}
                  <Text style={styles.infoText}>In-Person</Text>
                </Text>
                <Text style={styles.infoLabel}>
                  Appointment for:{" "}
                  <Text style={styles.infoText}>Skin Allergy</Text>
                </Text>
                <Text style={styles.infoLabel}>
                  Appointment fee: <Text style={styles.infoText}>$25.00</Text>
                </Text>
                <Text style={styles.infoLabel}>
                  Date: <Text style={styles.infoText}>January 14, 2025</Text>
                </Text>
                <Text style={styles.infoLabel}>
                  Time: <Text style={styles.infoText}>11:00 am - 12:00 pm</Text>
                </Text>
              </View>
            </>
          )}

          {activeTab === "Therapist Info" && (
            <>
              <View style={{ gap: 13 }}>
                <Text style={styles.infoLabel}>
                  Specialist in: <Text style={styles.infoText}>Allergiest</Text>
                </Text>
                <Text style={styles.infoLabel}>
                  Age group: <Text style={styles.infoText}>8-16 years</Text>
                </Text>
                <Text style={styles.infoLabel}>
                  Education: <Text style={styles.infoText}>MBBS, FCPS</Text>
                </Text>
                <Text style={styles.infoLabel}>
                  Language:{" "}
                  <Text style={styles.infoText}>English, Spanish</Text>
                </Text>
                <Text style={styles.infoLabel}>
                  Experience: <Text style={styles.infoText}>3 years</Text>
                </Text>
                <Text style={styles.infoLabel}>
                  Linked clinic:{" "}
                  <Text style={styles.infoText}>Clinic Name</Text>
                </Text>
              </View>
            </>
          )}
          {activeTab === "Medical Info" && (
            <View style={styles.medicalInfoContainer}>
              <View style={{ gap: 14 }}>
                <Text style={styles.infoLabel}>Is it your first therapy? </Text>
                <Text style={styles.infoText}>No</Text>
                <Text style={styles.infoLabel}>
                  Are you taking any medicine?{" "}
                </Text>
                <Text style={styles.infoText}>No</Text>
                <Text style={styles.infoLabel}>When was your last visit? </Text>
                <Text style={styles.infoText}>About a week ago</Text>
              </View>
              <View style={styles.conditionContainer}>
                <View>
                  <Text style={styles.infoLabel}>Pre condition</Text>
                  <Text style={styles.infoText1}>Normal</Text>
                </View>
                <View>
                  <Text style={styles.infoLabel}>Current condition</Text>
                  <Text style={styles.infoText1}>Serious</Text>
                </View>
              </View>
              <View style={{ gap: 0 }}>
                <Text style={styles.infoLabel}>
                  How can a Therapist help you?
                </Text>
                <Text style={styles.descriptionText}>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et
                  massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                  sapien.
                </Text>
              </View>
              <Text style={styles.infoLabel}>Invoice will be sent to </Text>
              <Text style={styles.infoText}>alexander39@gmail.com</Text>
            </View>
          )}
          {activeTab === "Reports" && (
            <View style={styles.patientInfoContainer}>
              {/* First PDF Upload */}
              <View style={styles.pdfContainer}>
                <Text style={styles.pdfLabel}>Upload Report 1</Text>
                <TouchableOpacity
                  style={styles.pdfButton}
                  onPress={() => pickDocument(setSelectedFile1)}
                >
                  <Image
                    source={require("@/assets/images/pdf.png")}
                    style={styles.pdfImage}
                  />
                  <View style={{ flexDirection: "column" }}>
                    <Text style={styles.pdfText}>
                      {selectedFile1 ? selectedFile1.name : "Select a file"}
                    </Text>
                    {selectedFile1 && (
                      <Text style={styles.pdfText1}>
                        Size: {((selectedFile2?.size ?? 0) / 1024).toFixed(2)}{" "}
                        KB
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>

              {/* Second PDF Upload */}
              <View style={styles.pdfContainer}>
                <Text style={styles.pdfLabel}>Upload Report 2</Text>
                <TouchableOpacity
                  style={styles.pdfButton}
                  onPress={() => pickDocument(setSelectedFile2)}
                >
                  <Image
                    source={require("@/assets/images/pdf.png")}
                    style={styles.pdfImage}
                  />
                  <View style={{ flexDirection: "column" }}>
                    <Text style={styles.pdfText}>
                      {selectedFile2 ? selectedFile2.name : "Select a file"}
                    </Text>
                    {selectedFile2 && (
                      <Text style={styles.pdfText1}>
                        Size: {((selectedFile2?.size ?? 0) / 1024).toFixed(2)}{" "}
                        KB
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Remember Me Checkbox */}
        <TouchableOpacity
          style={styles.rememberContainer}
          onPress={() => setRememberMe(!rememberMe)}
        >
          <View style={[styles.checkbox, rememberMe && styles.checked]}>
            {rememberMe && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.rememberText}>
            By submitting this request, you authorize the use of your data and
            acknowledge that you've read and accept our Terms and Conditions and
            Privacy Policy.
          </Text>
        </TouchableOpacity>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            title="Continue"
            type="default"
            onPress={() =>
              router.push("/book-appointments/subscription-details")
            }
            style={[
              styles.continueButton,
              !rememberMe && styles.disabledButton,
            ]}
            disabled={!rememberMe}
          />
          <Button
            title="Cancel"
            type="default"
            onPress={() => router.push("/(home-screen)/home-page")}
            style={{
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "#E0E0E0",
              width: "100%",
            }}
            textStyle={{ color: "black" }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
  },
  scrollContainer: {
    paddingBottom: 50,
  },
  headerContainer: {
    marginTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    fontFamily: "Raleway-Bold",
  },
  heading1: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginTop: 10,
    fontFamily: "Raleway-Bold",
  },
  description: {
    fontSize: 16,
    color: "gray",
    marginBottom: 15,
    width: 270,
    marginTop: 5,
    fontFamily: "OpenSans-Regular",
  },
  tabsContainer: {
    flexDirection: "row",
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 80,
    minWidth: screenWidth * 0.3,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    height: 45,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  inactiveTab: {
    backgroundColor: "#F5F5F5",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 20,
  },
  activeTabText: {
    color: "#FFF",
  },
  infoContainer: {
    marginBottom: 20,
    gap: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#b5b3b3",
  },
  infoText: {
    fontWeight: "400",
    color: "#666",
    fontSize: 16,
    marginTop: -8,
    marginBottom: 2,
    fontFamily: "OpenSans-Regular",
  },
  infoText1: {
    fontWeight: "400",
    color: "#666",
    fontSize: 16,
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberText: {
    fontSize: 14,
    color: "#767E8C",
    top: 14,
    width: 270,
    fontWeight: "400",
    fontFamily: "OpenSans-Regular",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#767E8C",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  checked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkmark: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 40,
    paddingBottom: 20,
  },
  continueButton: {
    width: "100%",
    height: 48,
    backgroundColor: Colors.primary,
    marginBottom: 10,
  },
  cancelButton: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#A8A8A8",
    marginTop: 10,
  },
  medicalInfoContainer: {
    marginBottom: 20,
    gap: 8,
  },
  conditionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    marginRight: 40,
    top: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
    marginBottom: 10,
    lineHeight: 20,
  },
  patientInfoContainer: {
    marginBottom: 20,
    gap: 8,
  },
  pdfContainer: {
    marginTop: 10,
    alignItems: "flex-start",
  },
  pdfLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#b5b3b3",
  },
  pdfButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    padding: 10,

    borderRadius: 8,
  },
  pdfImage: {
    width: 40, // Ensuring 40x40 size
    height: 40,
    resizeMode: "contain",
    marginRight: 10,
  },
  pdfText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  pdfText1: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#b5b3b3",
  },
  disabledButton: {
    backgroundColor: "#B0B0B0", // Gray out when disabled
  },
});