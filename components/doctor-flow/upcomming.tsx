import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

const appointments = [
  {
    id: "5646543",
    patientName: "Cody Fisher",
    patientImage: require("../../assets/images/p5.png"),
    date: "Jan 22, 2025",
    time: "11:00 pm",
  },
  {
    id: "8794561",
    patientName: "Sarah Johnson",
    patientImage: require("../../assets/images/p3.png"),
    date: "Feb 10, 2025",
    time: "03:30 pm",
  },
  {
    id: "3215468",
    patientName: "Michael Smith",
    patientImage: require("../../assets/images/p1.png"),
    date: "Mar 5, 2025",
    time: "09:15 am",
  },
];

const Upcoming: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Upcoming Appointments</Text>
        <TouchableOpacity
          onPress={() =>
            router.push("/appointment-details-doc/appointment-details-doc")
          }
        >
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      {/* Appointment Cards with Horizontal Scroll */}
      <FlatList
        data={appointments}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={() =>
              router.push("/appointment-details-doc/appointment-details-doc")
            }
          >
            {/* ID and For Himself - Aligned to Flex Start */}
            <View style={styles.row}>
              <Text style={styles.idText}>ID: {item.id}</Text>
              <Text style={styles.selfTag}>For himself</Text>
            </View>

            {/* Patient Info Section */}
            <View style={styles.patientContainer}>
              <Text style={styles.patientLabel}>Patient name</Text>
              <View style={styles.patientInfo}>
                <Image source={item.patientImage} style={styles.patientImage} />
                <Text style={styles.patientName}>{item.patientName}</Text>
              </View>
            </View>

            {/* Appointment Details */}
            <Text style={styles.detailText}>Appointment date: {item.date}</Text>
            <Text style={styles.detailText}>Appointment time: {item.time}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Upcoming;

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
    marginRight: 12,
    width: 310,
    height: 200,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
  selfTag: {
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
  patientContainer: {
    backgroundColor: "#EBEBEB",
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 10,
  },
  patientLabel: {
    fontSize: 12,
    color: "#9E9E9E",
    marginBottom: 4,
  },
  patientInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  patientImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  patientName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#525252",
  },
  detailText: {
    fontSize: 16,
    color: "#525252",
    marginTop: 5,
  },
});
