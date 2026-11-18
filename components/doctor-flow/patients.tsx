import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const patients = [
  require("../../assets/images/p1.png"),
  require("../../assets/images/p2.png"),
  require("../../assets/images/p3.png"),
  require("../../assets/images/p4.png"),
  require("../../assets/images/p5.png"),
];

const Patients: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Patients</Text>
        <TouchableOpacity onPress={() => router.push("/doctor-flow/patients")}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        {patients.map((source, index) => (
          <TouchableOpacity 
            key={index} 
            onPress={() => router.push("/doctor-flow/patients")}
            style={styles.imageTouchable}
          >
            <Image source={source} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Patients;

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
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 8,
  },
  imageTouchable: {
    marginRight: 8,
  },
});
