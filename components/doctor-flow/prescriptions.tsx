import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const prescriptions = [
  {
    id: "5646543",
    date: "Jan 12, 2025",
    title: "Prescription Title Here",
    prescribedTo: "Jonathan Markus",
    service: "Skin Care",
    appointmentFor: "My Self",
    medicationPrescribed: 2,
  },
  {
    id: "5646544",
    date: "Jan 15, 2025",
    title: "Acne Treatment Plan",
    prescribedTo: "Sarah Johnson",
    service: "Dermatology",
    appointmentFor: "Herself",
    medicationPrescribed: 3,
  },
];

const Prescriptions: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Prescriptions</Text>
        <TouchableOpacity
          onPress={() =>
            router.push("/prescriptions-doc/prescriptions-details")
          }
        >
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

     
      {prescriptions.map((item) => (
        <TouchableOpacity 
          key={item.id} 
          style={styles.card}
          onPress={() =>
            router.push("/prescriptions-doc/prescriptions-details")
          }
        >
          <View style={styles.row}>
            <Text style={styles.idText}>ID: {item.id}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
          <Text style={{ marginTop: 10, marginBottom: -7 }}>
            Prescription title:
          </Text>
          <Text style={styles.prescriptionTitle}>{item.title}</Text>

          <View style={styles.prescribedContainer}>
            <Text style={styles.prescribedLabel}>Prescribed to</Text>
            <Text style={styles.prescribedTo}>{item.prescribedTo}</Text>
          </View>

          <Text style={styles.detailText}>Service: {item.service}</Text>
          <Text style={styles.detailText}>
            Appointment for: {item.appointmentFor}
          </Text>
          <Text style={styles.detailText}>
            Med. Prescribed: {item.medicationPrescribed}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Prescriptions;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  viewAll: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "700",
  },
  card: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  idText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#FFFFFF",
    backgroundColor: Colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 80,
    width: 83,
    height: 25,
    textAlign: "center",
    textAlignVertical: "center",
  },
  date: {
    fontSize: 12,
    color: "#525252",
    backgroundColor: "#EBEBEB",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 80,
    width: 79,
    height: 25,
    textAlign: "center",
    textAlignVertical: "center",
  },
  prescriptionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F1F1F",
    marginTop: 8,
  },
  prescribedContainer: {
    backgroundColor: "#E5E5E5",
    padding: 6,
    borderRadius: 6,
    marginVertical: 8,
    height: 52,
  },
  prescribedLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
  prescribedTo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  detailText: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
    marginBottom: 5,
  },
});
