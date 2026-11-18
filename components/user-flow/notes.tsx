import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  GestureResponderEvent,
  Dimensions,
} from "react-native";
import Button from "@/components/button";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";

const NotesScreen = () => {
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

  function toggleModal(event: GestureResponderEvent): void {
    throw new Error("Function not implemented.");
  }

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
            Received Notes
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
            Sent Requests
          </Text>
        </TouchableOpacity>
      </View>

      {/* Received Notes Content */}
      {activeTab === "Received" && (
        <View style={styles.content}>
          {receivedNotes.length === 0 ? (
            <>
              <Image
                source={require("@/assets/images/notes.png")}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.heading}>No Notes found</Text>
              <Text style={styles.description}>
                No record found for notes. You can request to Therapist to
                submit notes.
              </Text>
              <Button
                title="Request Notes"
                type="default"
                style={styles.button}
                onPress={() => setModalVisible(true)}
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
                  <TouchableOpacity>
                    <View style={styles.serviceContainer}>
                      <Text style={styles.serviceLabel}>
                        Appointment service:
                      </Text>
                      <Text style={styles.serviceText}>{item.service}</Text>
                    </View>
                  </TouchableOpacity>

                  {/* Appointment Details */}
                  <Text style={styles.detailsText}>
                    Appointment for: {item.appointmentFor}
                  </Text>
                  <Text style={styles.detailsText}>
                    Appointment date: {item.appointmentDate}
                  </Text>
                </View>
              ))}

              {/* Adds spacing at the bottom */}
              <View style={{ height: 30 }} />
            </View>
          )}
        </View>
      )}

      {/* Sent Requests Content */}
      {activeTab === "Sent" && (
        <View style={styles.content}>
          <Text style={styles.heading}>No Sent Requests</Text>
          <Text style={styles.description}>
            No record found for sent requests.
          </Text>
        </View>
      )}

      {/* Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        />
        <View style={styles.modalContainer}>
          {/* Bold Line (iPhone style) */}
          <View style={styles.modalHandle} />
          <Text style={styles.modalTitle}>Request Appointment Notes</Text>
          <Text style={styles.modalDescription}>
            Are you sure you want to send request notes against your current
            completed appointment? Check your notes before sending the request
            to Therapist.
          </Text>
          <Button
            title="Request Notes"
            type="default"
            style={styles.modalButton}
            onPress={handleRequestNotes}
          />
          <Button
            title="Cancel"
            type="default"
            style={{
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "#E0E0E0",
              width: "100%",
              marginTop: 10,
            }}
            textStyle={{ color: "black" }}
          />
        </View>
      </Modal>
    </View>
  );
};
const { width } = Dimensions.get("window");
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
    marginTop: 40,
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
    width: width * 0.9,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,

    // Android shadow
    elevation: 6,
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
  idText: {
    color: "white",
    fontSize: 14,
  },
  dateContainer: {
    width: 84,
    height: 25,
    backgroundColor: "#EBEBEB",
    borderRadius: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: {
    color: "#525252",
    fontSize: 14,
  },
  serviceContainer: {
    width: width * 0.825,
    height: 54,
    backgroundColor: "#EBEBEB",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    alignSelf: "center",
  },
  serviceLabel: {
    color: "#9E9E9E",
    fontSize: 14,
  },
  serviceText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#525252",
  },
  detailsText: {
    fontSize: 14,
    color: "#525252",
    marginTop: 5,
  },
});

export default NotesScreen;
