import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const services = [
  {
    id: "1",
    name: "Home Medical Care",
    icon: require("@/assets/images/homecare.png"),
    route: "/" as const,
    isLarge: true,
  },
  {
    id: "2",
    name: "Lab Tests",
    icon: require("@/assets/images/lab.png"),
    route: "/" as const,
    isLarge: false,
  },
  {
    id: "3",
    name: "Radiology",
    icon: require("@/assets/images/radio.png"),
    route: "/" as const,
    isLarge: false,
  },
];

const FindByServices = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Find By Services</Text>
        <TouchableOpacity
          onPress={() => router.push("/book-appointments/select-service")}
        >
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.servicesGrid}>
        {services.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.serviceCard,
              item.isLarge ? styles.largeCard : styles.smallCard,
            ]}
            onPress={() => router.push("/book-appointments/select-service")}
          >
            <Image 
              source={item.icon} 
              style={[
                styles.serviceIcon,
                item.isLarge ? styles.largeIcon : styles.smallIcon,
              ]} 
            />
            <Text style={item.isLarge ? styles.largeCardText : styles.serviceText}>
              {item.name}
            </Text>
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
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  serviceCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  largeCard: {
    width: "100%",
    height: 86,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 15,
  },
  smallCard: {
    width: "48%",
    height: 166,
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  serviceIcon: {
    resizeMode: "contain",
  },
  largeIcon: {
    width: 50,
    height: 48.86,
  },
  smallIcon: {
    width: 50,
    height: 50,
  },
  serviceText: {
    marginTop: 5,
    fontSize: 17,
    fontWeight: "700",
    color: "#666",
    fontFamily: "Raleway-Bold",
  },
  largeCardText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#666",
    fontFamily: "Raleway-Bold",
  },
});
export default FindByServices;