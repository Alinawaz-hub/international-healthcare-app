import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Button from "@/components/button";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
const { width } = Dimensions.get("window");

const NotesScreen2 = () => {
  const [activeTab, setActiveTab] = useState<"Received" | "Sent">("Received");
  const [modalVisible, setModalVisible] = useState(false);
  const [receivedNotes, setReceivedNotes] = useState<any[]>([]);

  const handleRequestNotes = () => {
    setReceivedNotes([
      {
        id: "5646543",
        requestDate: "Jan 12, 2025",
        service: "Mental Stress",
        appointmentFor: "My Self",
        appointmentDate: "Jan 23, 2025",
      },
      {
        id: "5646543",
        requestDate: "Jan 12, 2025",
        service: "Mental Stress",
        appointmentFor: "My Self",
        appointmentDate: "Jan 23, 2025",
      },
    ]);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Received" && styles.activeTab]}
          onPress={() => setActiveTab("Received")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Received" && styles.activeTabText,
            ]}
          >
            Submitted Notes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "Sent" && styles.activeTab]}
          onPress={() => setActiveTab("Sent")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Sent" && styles.activeTabText,
            ]}
          >
            Req. From Patient
          </Text>
        </TouchableOpacity>
      </View>

      {/* Received Notes Content */}
      {activeTab === "Received" && (
        <View style={styles.content}>
          {receivedNotes.length === 0 ? (
            <>
              <Image
                source={require("../../assets/images/notes.png")}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.heading}>No Notes found</Text>
              <Text style={styles.description}>
                Submit your notes to your patients.
              </Text>
              <Button
                title="Add Notes"
                type="default"
                style={styles.button}
                onPress={() =>
                  router.push("/(appointment-details-doc)/add-note")
                }
              />
            </>
          ) : (
            <View style={{ flex: 1, paddingHorizontal: 15 }}>
              {receivedNotes.map((item, index) => (
                <View key={`${item.id}-${index}`} style={styles.noteCard}>
                  {/* ID & Date Row */}
                  <View style={styles.row}>
                    <View style={styles.idContainer}>
                      <Text style={styles.idText}>ID: {item.id}</Text>
                    </View>
                    <View style={styles.dateContainer}>
                      <Text style={styles.dateText}>{item.requestDate}</Text>
                    </View>
                  </View>

                  {/* Service Info */}
                  <View style={styles.serviceContainer}>
                    <Text style={styles.serviceLabel}>
                      Appointment service:
                    </Text>
                    <Text style={styles.serviceText}>{item.service}</Text>
                  </View>

                  {/* Appointment Details */}
                  <Text style={styles.detailsText}>
                    Appointment for: {item.appointmentFor}
                  </Text>
                  <Text style={styles.detailsText}>
                    Appointment date: {item.appointmentDate}
                  </Text>
                </View>
              ))}
              <View style={{ height: 30 }} />
            </View>
          )}
        </View>
      )}

      {/* Sent Requests Content */}
      {activeTab === "Sent" && (
        <View style={styles.content}>
          <View style={styles.card}>
            <View style={styles.row1}>
              <Text style={styles.prescriptionId}>ID: 5646543</Text>
              <Text style={styles.date}>Jan 12, 2025</Text>
            </View>

            <View style={styles.serviceContainer1}>
              <Text style={styles.serviceTitle}>Appointment service</Text>
              <Text style={styles.serviceText1}>Mental Stress</Text>
            </View>

            <Text style={styles.info}>
              Appointment for: <Text style={styles.boldText}>Himself</Text>
            </Text>
            <Text style={styles.info}>
              Appointment date:{" "}
              <Text style={styles.boldText}>Nov 12, 2024</Text>
            </Text>

            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Submit Notes</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 0,
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomColor: "#E0E0E0",
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: Colors.primary,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabText: {
    fontWeight: "bold",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  image: {
    width: 218,
    height: 180,
    marginBottom: 10,
    marginTop: 50,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
    marginTop: 20,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    position: "absolute",
    bottom: 15,
    width: "95%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignSelf: "center",
    alignItems: "center",
  },
  modalHandle: {
    width: 139,
    height: 5,
    backgroundColor: "#1F1F1F",
    borderRadius: 3,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    width: "100%",
    marginBottom: 10,
    marginTop: 10,
  },
  modalCancelButton: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
  },

  noteCard: {
    width: 310,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    elevation: 3,
    marginBottom: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  idContainer: {
    width: 83,
    height: 25,
    backgroundColor: Colors.primary,
    borderRadius: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  idText: { color: "white", fontSize: 14 },
  dateContainer: {
    width: 84,
    height: 25,
    backgroundColor: "#EBEBEB",
    borderRadius: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: { color: "#525252", fontSize: 14 },
  serviceContainer: {
    width: 280,
    height: 54,
    backgroundColor: "#EBEBEB",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    alignSelf: "center",
  },
  serviceLabel: { color: "#9E9E9E", fontSize: 14 },
  serviceText: { fontSize: 18, fontWeight: "700", color: "#525252" },
  detailsText: { fontSize: 14, color: "#525252", marginTop: 5 },
  card: {
    backgroundColor: "#F5F5F5",
    padding: width * 0.05,
    borderRadius: 10,
    marginBottom: 20,
    width: "100%",
  },
  row1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  prescriptionId: {
    backgroundColor: Colors.primary,
    color: "#FFF",
    paddingHorizontal: width * 0.03,
    paddingVertical: width * 0.01,
    borderRadius: 80,
    fontSize: width * 0.035,
  },
  date: {
    backgroundColor: "#E5E5E5",
    paddingHorizontal: width * 0.03,
    paddingVertical: width * 0.01,
    borderRadius: 80,
    fontSize: width * 0.035,
  },
  serviceContainer1: {
    backgroundColor: "#EAEAEA",
    padding: width * 0.03,
    borderRadius: 8,
    marginBottom: 10,
  },
  serviceTitle: {
    fontSize: width * 0.04,
    color: "#6B6B6B",
  },
  serviceText1: {
    fontSize: width * 0.045,
    fontWeight: "bold",
  },
  info: {
    fontSize: width * 0.04,
    color: "#4A4A4A",
    marginTop: 5,
  },
  boldText: {
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#F5F5F5",
    paddingVertical: width * 0.04,
    borderRadius: 80,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CFCFCF",
    marginTop: 15,
  },
  submitButtonText: {
    fontSize: width * 0.045,
    fontWeight: "bold",
    color: "#000",
  },
});

export default NotesScreen2;
