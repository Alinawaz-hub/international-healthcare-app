import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import HeaderDoctor from "../../components/doctor-flow/header-doc";
import Button from "@/components/button";
import { Colors } from "@/constants/Colors";

// Get screen width for responsiveness
const { width } = Dimensions.get("window");

const PrescriptionsScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <HeaderDoctor
        showBack={true}
        showSearch={false}
        showFilter={false}
        showAdd={false}
        showDownload={false}
      />
      <Text style={styles.header}>Appointment Details</Text>

      {/* Prescriptions List */}
      <TouchableOpacity
        onPress={() =>
          router.push("/appointment-details-doc/prescription-details")
        }
      >
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.prescriptionCard}>
            <View style={styles.row}>
              <Text style={styles.prescriptionId}>ID: 5646543</Text>
              <Text style={styles.date}>Jan 12, 2025</Text>
            </View>
            <Text style={styles.title}>Prescription title:</Text>
            <Text style={styles.boldText}>Prescription Title Here</Text>
            <Text style={styles.info}>
              Service: <Text style={styles.boldText}>Skin Care</Text>
            </Text>
            <Text style={styles.info}>
              Appointment for: <Text style={styles.boldText}>My Self</Text>
            </Text>
            <Text style={styles.info}>
              Med. Prescribed: <Text style={styles.boldText}>2</Text>
            </Text>
          </View>
        </ScrollView>
      </TouchableOpacity>
      {/* Create Prescription Button */}
      <Button
        title="Create Prescription"
        type="default"
        style={styles.createButton}
        onPress={() =>
          router.push("/appointment-details-doc/create-prescription")
        }
      />
    </View>
  );
};

export default PrescriptionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: width * 0.05,
    paddingTop: 20,
  },
  header: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    marginTop: 20,
  },
  content: {
    paddingVertical: 20,
  },
  prescriptionCard: {
    backgroundColor: "#F5F5F5",
    padding: width * 0.05,
    borderRadius: 10,
    marginBottom: 20,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
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
  title: {
    fontSize: width * 0.04,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: width * 0.045,
  },
  info: {
    fontSize: width * 0.04,
    color: "#4A4A4A",
    marginTop: 5,
  },
  createButton: {
    width: "100%",
    height: 48,
    backgroundColor: Colors.primary,
    top: 20,
  },
  createButtonText: {
    fontSize: width * 0.045,
    fontWeight: "bold",
    color: "#000",
  },
});
