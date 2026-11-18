import { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Image,
  Dimensions,
} from "react-native";

import Button from "@/components/button";
import { router } from "expo-router";
import ChatScreen from "@/components/doctor-flow/conversation";
import * as DocumentPicker from "expo-document-picker";
import NotesScreen2 from "@/components/doctor-flow/notes2";
import HeaderDoctor from "../../components/doctor-flow/header-doc";
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
interface Props {
  showHeader?: boolean;
  showButtons?: boolean;
}
export default function AppointmentDetailsDoc({
  showHeader = true,
  showButtons = true,
}: Props) {
  const [activeTab, setActiveTab] = useState("Appointment Info");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleTimeSelect = (time: string) => {
    if (selectedTime === time) {
      setSelectedTime(null);
    } else {
      setSelectedTime(time);
    }
  };

  const tabs = [
    "Appointment Info",
    "Patient Info",
    "Medical Info",
    "Reports",
    "Prescription",
    "Conversations",
    "Notes",
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
      {/* Conditionally Show Header */}
      {showHeader && (
        <HeaderDoctor
          showBack={true}
          showSearch={false}
          showFilter={false}
          showAdd={false}
          showDownload={false}
          showEdit={false}
          showShare={false}
        />
      )}

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
              {/* Top Status Badges */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                {/* Left Section - ID & Paid */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  {/* ID Badge */}
                  <View
                    style={{
                      backgroundColor: Colors.primary,
                      padding: 5,
                      borderRadius: 80,
                      width: 95,
                      height: 30,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 12 }}>
                      ID: 5646543
                    </Text>
                  </View>

                  {/* Payment Status */}
                  <View
                    style={{
                      backgroundColor: Colors.tertiary,
                      borderRadius: 15,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      width: 50,
                      height: 30,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: "#000", fontSize: 12 }}>
                      Paid
                    </Text>
                  </View>
                </View>

                {/* Right Section - Upcoming */}
                <View
                  style={{
                    backgroundColor: "#E0E0E0",
                    padding: 5,
                    borderRadius: 80,
                    width: 80,
                    height: 30,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#333", fontSize: 12 }}>Upcoming</Text>
                </View>
              </View>

              {/* Overview Section */}
              <View style={{ gap: 13 }}>
                <Text style={styles.heading3}>Overview</Text>
                <Text style={styles.infoLabel}>
                  Service: <Text style={styles.infoText}>Allergy</Text>
                </Text>
                <Text style={styles.infoLabel}>
                  Appointment date:{" "}
                  <Text style={styles.infoText}>11:00 am - 12:00 pm</Text>
                </Text>
                <Text style={styles.infoLabel}>
                  Time slot: <Text style={styles.infoText}>11:00 pm</Text>
                </Text>
                <Text style={styles.infoLabel}>
                  Appointment type:{" "}
                  <Text style={styles.infoText}>In-Person</Text>
                </Text>
                <Text style={styles.infoLabel}>
                  Location:{" "}
                  <Text style={styles.infoText}>
                    2715 Ash Dr. San Jose, South Dakota 83475
                  </Text>
                </Text>
              </View>
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
                <Text style={styles.pdfLabel}>Report title</Text>
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
                <Text style={styles.pdfLabel}>Report title</Text>
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
          {activeTab === "Notes" && <NotesScreen2 />}
        </View>

        {activeTab === "Prescription" && (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
              top: -200,
            }}
          >
            <Image
              source={require("../../assets/images/Frame.png")}
              style={styles.backgroundImage}
            />

            {/* Message */}
            <Text style={styles.noPrescriptionText}>No Prescription Found</Text>
            <Text style={styles.subText}>
              There is no prescription yet related to your Appointment.
            </Text>
          </View>
        )}
        {/* Buttons */}

        {activeTab !== "Conversations" &&
          activeTab !== "Notes" &&
          showButtons && (
            <View style={styles.buttonContainer}>
              {activeTab === "Prescription" ? (
                <Button
                  title="Create Prescription"
                  type="default"
                  onPress={() =>
                    router.push("/appointment-details-doc/create-prescription")
                  }
                  style={styles.prescriptionButton}
                />
              ) : activeTab === "Appointment Info" ? (
                <>
                  <Button
                    title="Join Session"
                    type="default"
                    onPress={() =>
                      router.push("/appointment-details-doc/join-session")
                    }
                    style={styles.continueButton}
                  />
                  <Button
                    title="Generate Report"
                    type="default"
                    style={styles.GenerateButton}
                    textStyle={{ color: "black" }}
                    onPress={() =>
                      router.push("/appointment-details-doc/report")
                    }
                  />
                </>
              ) : (
                <>
                  <Button
                    title="Reschedule another appointment"
                    type="default"
                    onPress={() => router.push("/")}
                    style={styles.continueButton}
                  />
                  <Button
                    title="Generate Report"
                    type="default"
                    style={styles.GenerateButton}
                    onPress={() =>
                      router.push("/appointment-details-doc/report")
                    }
                    textStyle={{ color: "black" }}
                  />
                  {activeTab === "Medical Info" && (
                    <Button
                      title="View Medical History"
                      type="default"
                      onPress={() =>
                        router.push("/appointment-details-doc/medical-history")
                      }
                      style={styles.GenerateButton1}
                      textStyle={{ color: "black" }}
                    />
                  )}
                </>
              )}
            </View>
          )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const screenWidth = Dimensions.get("window").width;
const { width } = Dimensions.get("window");
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
    width: 200,
    marginBottom: 20,
    fontFamily: "Raleway-Bold",
  },
  heading3: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    width: 200,
    marginBottom: 0,
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
  },
  tabsContainer: {
    flexDirection: "row",
    paddingBottom: 20,
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
  tab1: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
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
    fontSize: 16,
    fontWeight: "600",
    color: "#b5b3b3",
  },
  infoText: {
    fontWeight: "400",
    color: "#666",
    fontSize: 16,
    marginTop: -8,
    marginBottom: 2,
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
    backgroundColor: "#00EF99",
    borderColor: "#00EF99",
  },
  checkmark: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
    paddingBottom: 20,
  },
  continueButton: {
    width: "100%",
    height: 48,
    backgroundColor: Colors.primary,
    marginBottom: 10,
  },
  prescriptionButton: {
    width: "100%",
    height: 48,
    backgroundColor: Colors.primary,
    marginBottom: 10,
    top: -150,
  },
  GenerateButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    width: "100%",
  },
  GenerateButton1: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    width: "100%",
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#A8A8A8",
    width: 350,
    height: 48,
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
    fontSize: 14,
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
    width: 40,
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
  doctorCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 80,
    marginRight: 15,
  },
  specialistText: {
    fontSize: 14,
    color: "#9E9E9E",
  },
  doctorName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    fontFamily: "Raleway-Bold",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginTop: 15,
    fontFamily: "Raleway-Bold",
  },
  sectionTitle1: {
    fontSize: 14,
    color: "#525252",
    marginTop: 5,
    top: 10,
  },
  detailText: {
    fontSize: 16,
    color: "#525252",
    marginTop: 5,
  },
  boldText: {
    fontWeight: "700",
    color: "#9E9E9E",
  },
  specialInterestTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "gray",
    marginTop: 20,
  },
  specialInterestText: {
    fontSize: 16,
    color: "gray",
    top: -5,
  },
  innerTabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },

  innerTab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
    borderEndEndRadius: 20,
    borderEndStartRadius: 20,
  },

  activeInnerTab: {
    borderBottomColor: "#00EF99",
  },

  innerTabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  timeSlotContainer: {
    width: 102,
    height: 42,
    backgroundColor: "#FFF",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#00EF99",
  },
  timeSlotText: {
    fontSize: 14,
    color: "#000",
  },
  selectedTimeSlot: {
    backgroundColor: "#00EF99",
    borderColor: "#00EF99",
  },
  selectedTimeText: {
    color: "#FFF",
  },
  heading2: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fafafa",
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    top: -10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 5,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  leftBadges: {
    flexDirection: "row",
    alignItems: "center",
    gap: 0,
  },
  idBadge: {
    backgroundColor: Colors.primary,
    padding: 5,
    borderRadius: 80,
    width: 95,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  idText: {
    color: "white",
  },
  inPersonBadge: {
    flexDirection: "row",
    backgroundColor: "#CCCCCC",
    width: 90,
    height: 30,
    alignItems: "center",
    padding: 5,
    borderRadius: 80,
  },
  icon: {
    width: 16,
    height: 17,
    marginRight: 10,
    resizeMode: "contain",
    alignSelf: "center",
  },
  inPersonText: {
    color: "black",
  },
  paidBadge: {
    backgroundColor: "#CCCCCC",
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 80,
    alignSelf: "flex-end",
  },
  paidText: {
    color: "black",
  },
  infoContainer1: {
    backgroundColor: "#CCCCCC",
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    color: "#525252",
  },
  rightAlign: {
    textAlign: "center",
    flex: 1,
    left: 60,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  therapistContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  boldText1: {
    fontWeight: "bold",
  },
  profileIcon: {
    width: 32,
    height: 32,
    marginRight: 5,
    borderRadius: 16,
  },
  detailsContainer: {
    backgroundColor: "#fafafa",
    padding: 20,
    borderRadius: 5,
    gap: 8,
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconText1: {
    flexDirection: "row",
    alignItems: "center",
    right: 50,
  },
  iconText2: {
    flexDirection: "row",
    alignItems: "center",
    right: 57,
  },
  backgroundImage: {
    width: 231,
    height: 186,
    resizeMode: "contain",
    marginBottom: 16,
    marginTop: 200,
  },
  noPrescriptionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
  },
  createButton: {
    backgroundColor: "#00D36E",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
