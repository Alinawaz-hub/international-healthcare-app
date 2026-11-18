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
  Dimensions,
} from "react-native";

const appointments = [
  {
    id: "12345",
    clinic: "Clinic Name",
    therapist: "Cody Fisher",
    service: "Skin Care",
    date: "Jan 22, 2025",
    time: "11:00 AM",
    location: "Jeddah, Saudi Arabia",
  },
  {
    id: "23456",
    clinic: "Another Clinic",
    therapist: "Jenny Wilson",
    service: "Hair Care",
    date: "Feb 10, 2025",
    time: "2:30 PM",
    location: "Riyadh, Saudi Arabia",
  },
];

type Props = {
  showHeader?: boolean;
  searchTerm?: string;
};

export default function UpcomingAppointments({
  showHeader = true,
  searchTerm = "",
}: Props) {
  // normalize search term
  const term = searchTerm.trim().toLowerCase();

  // filter the appointments and limit to 1
  const filtered = term
    ? appointments.filter((a) =>
        [a.clinic, a.therapist, a.service, a.date, a.time, a.location].some(
          (field) => field.toLowerCase().includes(term)
        )
      ).slice(0, 1)
    : appointments.slice(0, 1);

  return (
    <View style={styles.container}>
      {showHeader && (
        <View style={styles.headerRow}>
          <Text style={styles.header}>Upcoming Appointments</Text>
          <TouchableOpacity
            onPress={() => router.push("/(home-screen)/appointments")}
          >
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No appointments found.</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={() =>
              router.push("/appointment-details/appointment-details")
            }
          >
            <View style={styles.headerRow}>
              <View style={styles.leftBadges}>
                <View style={styles.idBadge}>
                  <Text style={styles.idText}>ID: {item.id}</Text>
                </View>
              </View>
              <View style={styles.paidBadge}>
                <Text style={styles.paidText}>Paid</Text>
              </View>
            </View>

            <View style={styles.infoContainer}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Doctor name</Text>
              </View>
              <View style={styles.therapistRow}>
                <View style={styles.therapistContainer}>
                  <Image
                    source={require("@/assets/images/codyfisher.png")}
                    style={styles.profileIcon}
                  />
                  <Text style={styles.boldText}>{item.therapist}</Text>
                </View>
              </View>
            </View>

            <View style={styles.detailsContainer}>
              <View style={styles.row}>
                <View style={styles.iconText}>
                  <Image
                    source={require("@/assets/images/skincare.png")}
                    style={styles.icon}
                  />
                  <Text>{item.service}</Text>
                </View>
                <View style={styles.iconText1}>
                  <Image
                    source={require("@/assets/images/formyself.png")}
                    style={styles.icon}
                  />
                  <Text>For myself</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.iconText}>
                  <Image
                    source={require("@/assets/images/jan22.png")}
                    style={styles.icon}
                  />
                  <Text>{item.date}</Text>
                </View>
                <View style={styles.iconText2}>
                  <Image
                    source={require("@/assets/images/time.png")}
                    style={styles.icon}
                  />
                  <Text>{item.time}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.iconText}>
                  
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
}

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: { padding: 0 },
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#777",
  },
  card: {
    backgroundColor: "#fafafa",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: width * 0.9,
    alignSelf: "center",
  },
  leftBadges: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  idBadge: {
    backgroundColor: Colors.primary,
    padding: 5,
    borderRadius: 80,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  idText: {
    color: "white",
  },
  paidBadge: {
    backgroundColor: Colors.tertiary,
    width: 50,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 80,
  },
  paidText: {
    color: "#000000",
  },
  infoContainer: {
    backgroundColor: "#EBEBEB",
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 5,
  },
  therapistRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    color: "gray",
  },
  rightAlign: {
    textAlign: "center",
    flex: 1,
    left: 60,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  therapistContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  boldText: {
    fontWeight: "bold",
    fontFamily: "Raleway-Bold",
    fontSize: 16,
  },
  profileIcon: {
    width: 32,
    height: 32,
    marginRight: 5,
    borderRadius: 16,
  },
  detailsContainer: {
    backgroundColor: "#fafafa",
    padding: 20,
    borderRadius: 5,
    gap: 8,
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconText1: {
    flexDirection: "row",
    alignItems: "center",
    right: 50,
  },
  iconText2: {
    flexDirection: "row",
    alignItems: "center",
    right: 57,
  },
  icon: {
    width: 16,
    height: 17,
    marginRight: 10,
    resizeMode: "contain",
    alignSelf: "center",
  },
});