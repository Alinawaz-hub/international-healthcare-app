import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import HomeHeaderDoc from "../../components/doctor-flow/home-header-doctor";
import { Colors } from "@/constants/Colors";

const patients = [
  {
    id: "5646543",
    date: "Jan 12, 2025",
    patientName: "Cody Fisher",
    email: "cody.fisher29@gmail.com",
    contact: "+1 (234) 567-8900",
    service: "Skin Care",
    amountPaid: "$35.00",
    availableOn: "Jan 22, 2025",
    patientImage: require("../../assets/images/p5.png"),
  },
  {
    id: "5646544",
    date: "Jan 12, 2025",
    patientName: "Cody Fisher",
    email: "cody.fisher29@gmail.com",
    contact: "+1 (234) 567-8900",
    service: "Skin Care",
    amountPaid: "$35.00",
    availableOn: "Jan 22, 2025",
    patientImage: require("../../assets/images/p1.png"),
  },
];

const PatientsDetails: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <HomeHeaderDoc showSearch={true} showFilter={true} showAdd={false} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Patients</Text>
        <Text style={styles.subtitle}>
          All of the users who availed services from you.
        </Text>

        {/* Patient Cards - Stacked Vertically */}

        {patients.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() =>
              router.push("/doctor-flow/patients-details-general-info")
            }
          >
            <View style={styles.row}>
              <View
                style={{
                  backgroundColor: Colors.primary,
                  borderRadius: 80,
                  width: 83,
                  height: 25,
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <Text style={styles.idText}>ID: {item.id}</Text>
              </View>
              <View
                style={{
                  backgroundColor: "#F0F0F0",
                  borderRadius: 80,
                  width: 83,
                  height: 25,
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <Text style={styles.date}>{item.date}</Text>
              </View>
            </View>

            {/* Patient Info */}
            <View style={styles.patientContainer}>
              <Text style={styles.patientLabel}>Patient name</Text>
              <View style={styles.patientInfo}>
                <Image source={item.patientImage} style={styles.patientImage} />
                <Text style={styles.patientName}>{item.patientName}</Text>
              </View>
            </View>

            {/* Patient Details */}
            <Text style={styles.detailText}>
              <Text style={styles.boldText}>Email: </Text>
              {item.email}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.boldText}>Contact no: </Text>
              {item.contact}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.boldText}>Service availed: </Text>
              {item.service}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.boldText}>Amount paid: </Text>
              {item.amountPaid}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.boldText}>Available on: </Text>
              {item.availableOn}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default PatientsDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    marginTop: 10,
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
    fontFamily: "YourFont",
  },
  date: {
    fontSize: 12,
    fontWeight: "400",
    color: "#525252",
    fontFamily: "YourFont",
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
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "400",
    color: "#9E9E9E",
  },
});
