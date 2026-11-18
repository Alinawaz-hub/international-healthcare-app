import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const appointmentTypes = [
  {
    id: "1",
    name: "Cardio",
    icon: require("@/assets/images/c.png"),
    route: "/" as const,
  },
  {
    id: "2",
    name: "Neuro",
    icon: require("@/assets/images/n.png"),
    route: "/" as const,
  },
  {
    id: "3",
    name: "Physical",
    icon: require("@/assets/images/p.png"),
    route: "/" as const,
  },
  {
    id: "4",
    name: "Ortho",
    icon: require("@/assets/images/o.png"),
    route: "/" as const,
  },
  {
    id: "5",
    name: "Eyesight",
    icon: require("@/assets/images/e.png"),
    route: "/" as const,
  },
  {
    id: "6",
    name: "Psychiatry",
    icon: require("@/assets/images/ps.png"),
    route: "/" as const,
  },
];

const BookAppointment = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Book An Appointment</Text>
        <TouchableOpacity
          onPress={() => router.push("/book-appointments/select-service")}
        >
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.appointmentGrid}>
        {appointmentTypes.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.appointmentCard}
            onPress={() => router.push("/book-appointments/select-service")}
          >
            <Image source={item.icon} style={styles.appointmentIcon} />
            <Text style={styles.appointmentText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    top: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    fontFamily: "Raleway-Bold",
  },
  viewAll: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "600",
    fontFamily: "Raleway-Bold",
  },
  appointmentGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  appointmentCard: {
    width: "31%",
    height: 125,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  appointmentIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginBottom: 5,
  },
  appointmentText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#666",
    fontFamily: "Raleway-Bold",
    textAlign: "center",
  },
});

export default BookAppointment;
