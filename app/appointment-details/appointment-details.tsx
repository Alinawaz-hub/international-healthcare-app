import { useState } from "react";

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
import Button from "@/components/button";
import { router } from "expo-router";
import ChatScreen from "@/components/user-flow/conversation";
import NotesScreen from "@/components/user-flow/notes";
import * as DocumentPicker from "expo-document-picker";
import Header from "@/components/user-flow/header";
import { useEffect } from "react";
import DoctorInfo from "@/components/user-flow/doctor-info";
import styles from "@/components/user-flow/appointment-details-styling";
import Prescription from "@/components/user-flow/prescription";
import { Colors } from "@/constants/Colors";

const appointments = [
  {
    id: "1",
    clinic: "Clinic Name",
    therapist: "Cody Fisher",
    service: "Skin Care",
    date: "Jan 22, 2025",
    time: "11:00 AM",
    location: "Jeddah, Saudi Arabia",
  },
];

export default function AppointmentDetailsScreen() {
  const [activeTab, setActiveTab] = useState("Appointment Info");
  const [activeInnerTab, setActiveInnerTab] = useState("Other Details");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (selectedTime) {
      setErrorMessage("");
    }
  }, [selectedTime]);
  const handleTimeSelect = (time: string) => {
    if (selectedTime === time) {
      setSelectedTime(null);
    } else {
      setSelectedTime(time);
    }
  };

  const tabs = [
    "Appointment Info",
    "Doctor Info",
    "Patient Info",
    "Medical Info",
    "Reports",
    "Prescription",
    "Conversations",
    "Notes",
  ];

  const innerTabs = ["Other Details", "Reviews"];
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
        showsHorizontalScrollIndicator={false}
      >
        {/* Title */}
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>Appointment details</Text>
        </View>

        {/* Tabs using FlatList */}
        <View style={{ gap: 10 }}>
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
                  { width: item === "Appointment Info" ? 135 : 120 },
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
          {activeTab === "Appointment Info" && (
            <>
              <View style={{ gap: 13 }}>
                <Text style={styles.heading3}>Overview</Text>
                <Text style={styles.infoLabel}>
                  Appointment Id: <Text style={styles.infoText}>345346</Text>
                </Text>
                <Text style={styles.infoLabel}>
                  Services <Text style={styles.infoText}>Allergy</Text>
                </Text>
                <Text style={styles.infoLabel}>
                  Date: <Text style={styles.infoText}>thu,jan 29, 2025</Text>
                </Text>
                <Text style={styles.infoLabel}>
                  Time slot: <Text style={styles.infoText}>11:00 pm</Text>
                </Text>
                <Text style={styles.infoLabel}>
                  Fee status: <Text style={styles.infoText}>Paid</Text>
                </Text>
              </View>
              <View style={{ gap: 13 }}>
                <Text style={styles.heading1}>Appointment with</Text>
                <Text style={styles.infoLabel}>
                  Doctor name: <Text style={styles.infoText}>Ahmad Aslam</Text>
                </Text>
                <Text style={styles.infoLabel}>
                  Linked clinic:{" "}
                  <Text style={styles.infoText}>Fatmia Memorial Hospital</Text>
                </Text>
                <Text style={styles.infoLabel}>
                  Contact no:{" "}
                  <Text style={styles.infoText}>+1 (234) 567-8900</Text>
                </Text>
                <Text style={styles.infoLabel}>
                  Email: <Text style={styles.infoText}>admin@fmh.com</Text>
                </Text>
                <Text style={styles.infoLabel}>
                  Website:{" "}
                  <Text style={styles.infoText}>
                    fatimamemorialhospital.com
                  </Text>
                </Text>
                <Text style={styles.infoLabel}>
                  Services offered: <Text style={styles.infoText}>12</Text>
                </Text>
              </View>
            </>
          )}

          {activeTab === "Doctor Info" && (
            <>
              <DoctorInfo
                activeInnerTab={activeInnerTab}
                setActiveInnerTab={setActiveInnerTab}
                selectedTime={selectedTime}
                handleTimeSelect={handleTimeSelect}
                styles={styles}
              />
            </>
          )}
          {activeTab === "Patient Info" && (
            <View style={{ gap: 8 }}>
              <Text style={styles.sectionTitle}>Patient details</Text>
              <Text style={styles.detailText}>
                <Text style={styles.boldText}>Patient name: </Text>Emilie Corner
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.boldText}>Appointment for: </Text>My Self
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.boldText}>Service required: </Text>
                Allergist
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.boldText}>Patient age: </Text>25 years
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.boldText}>Patient gender: </Text>
                Female
              </Text>
              <Text style={styles.sectionTitle}>Contact Info</Text>
              <Text style={styles.detailText}>
                <Text style={styles.boldText}>Contact no: </Text>+1 (234)
                567-8900
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.boldText}>Email: </Text>
                emilie.corner@gmail.com
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.boldText}>Location </Text>
                <Text>4517 Washington Ave. Manchester, Kentucky 39495</Text>
              </Text>
            </View>
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

          {activeTab === "Conversations" && <ChatScreen />}
          {activeTab === "Notes" && <NotesScreen />}
        </View>

        {activeTab === "Prescription" && (
          <>
            <Prescription appointments={appointments} router={router} />
          </>
        )}

        {/* Buttons */}
        {activeTab !== "Conversations" && activeTab !== "Notes" && (
          <View style={styles.buttonContainer}>
            <Button
              title="Join Session"
              type="default"
              onPress={() => {
                router.push("/appointment-details/join-session");
              }}
              style={[
                styles.continueButton,
                { backgroundColor: Colors.primary },
              ]}
            />

            <Button
              title="Generate Report"
              type="default"
              style={styles.GenerateButton}
              textStyle={{ color: "black" }}
              onPress={() => {
                router.push("/appointment-details/report");
              }}
            />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
