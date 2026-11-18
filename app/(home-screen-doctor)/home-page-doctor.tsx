import React from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import AppointmentsCard from "@/components/doctor-flow/appointments-card";
import Patients from "@/components/doctor-flow/patients";
import Upcoming from "@/components/doctor-flow/upcomming";
import Prescriptions from "@/components/doctor-flow/prescriptions";
import HomeHeaderDoc from "../../components/doctor-flow/home-header-doctor";
import { Colors } from "@/constants/Colors";

const DashboardScreen = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFF", paddingHorizontal: 15 }}>
      {/* Header */}
      <HomeHeaderDoc showSearch={false} showFilter={false} showAdd={false} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View>
          <Text style={{ fontSize: 24, fontWeight: "700", marginTop: 20 }}>
            Dashboard
          </Text>
      
    
        </View>
        <AppointmentsCard />
        <Patients />
        <Upcoming />
        <Prescriptions />
      </ScrollView>
    </View>
  );
};

const { width } = Dimensions.get("window");
const cardSize = (width - 48) / 2;
const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.tertiary,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: width * 0.92,
    height: width * 0.39,
    alignSelf: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  description: {
    fontSize: 12,
    color: "#666",
    marginVertical: 4,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  planTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  perMonth: {
    fontSize: 12,
    fontWeight: "400",
    color: "#000",
  },
  nextPayment: {
    fontSize: 12,
    color: "#9E9E9E",
  },
  date: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  rightContainer: {
    alignItems: "flex-end",
  },

  card1: {
    backgroundColor: "#F5F5F5",
    padding: 16,
    borderRadius: 10,
    width: cardSize,
    height: cardSize,
    justifyContent: "space-between",
    elevation: 2,
  },
  title1: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  description1: {
    fontSize: 13,
    color: "#7A7A7A",
    marginTop: 4,
  },
  count: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginTop: 8,
  },
  card2: {
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    width: 350,
    height: 154,
    flexDirection: "row",
    padding: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  title2: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  description2: {
    fontSize: 12,
    color: "#B0B0B0",
    marginTop: 4,
  },
  legendContainer: {
    marginTop: 12,
  },
  legendRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
    marginTop: 4,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: "#FFFFFF",
  },
  progressContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  textOverlay: {
    position: "absolute",
    width: 90,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmedText: {
    fontSize: 10,
    color: "#FFFFFF",
    textAlign: "center",
  },
  count2: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default DashboardScreen;
