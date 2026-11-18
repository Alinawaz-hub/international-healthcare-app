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

const { width } = Dimensions.get("window");

const appointments = [
  {
    id: "1",
    clinic: "Clinic Name",
    therapist: "Cody Fisher",
    service: "Skin Care",
    date: "Jan 22, 2025",
    time: "11:00 AM",
    location: "Jeddah, Saudi Arabia",
  },
  {
    id: "2",
    clinic: "Clinic Name",
    therapist: "Cody Fisher",
    service: "Skin Care",
    date: "Jan 22, 2025",
    time: "11:00 AM",
    location: "Jeddah, Saudi Arabia",
  },
];

export default function UpcomingAppointments({
  showHeader = true,
}: {
  showHeader?: boolean;
}) {
  return (
    <View style={styles.container}>
      {showHeader && (
        <View style={styles.headerRow}>
          <Text style={styles.header}>Upcoming Appointments</Text>
          <TouchableOpacity
            onPress={() => router.push("/(home-screen-doctor)/appointments")}
          >
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              router.push("/appointment-details-doc/appointment-details-doc")
            }
            style={styles.cardTouchable}
          >
            <View style={styles.card}>
              <View style={styles.headerRow}>
                <View style={styles.leftBadges}>
                  <View style={styles.idBadge}>
                    <Text style={styles.idText}>ID: 5646543</Text>
                  </View>
                </View>
                <View style={styles.paidBadge}>
                  <Text style={styles.paidText}>Paid</Text>
                </View>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.label}>Appointment with</Text>
                <View style={styles.row}>
                  <View style={styles.nameContainer}>
                    <Image
                      source={require("../../assets/images/codyfisher.png")}
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
                      source={require("../../assets/images/formyself.png")}
                      style={styles.icon}
                    />
                    <Text>For myself</Text>
                  </View>
                  <View style={styles.iconText}>
                    <Image
                      source={require("../../assets/images/jan22.png")}
                      style={styles.icon}
                    />
                    <Text>{item.date}</Text>
                  </View>
                </View>

                <View style={styles.iconText}>
                  <Image
                    source={require("../../assets/images/time.png")}
                    style={styles.icon}
                  />
                  <Text>{item.time}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
        ListFooterComponent={<View style={{ height: 40 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: width * 0.0,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  header: {
    fontSize: width * 0.05,
    fontWeight: "700",
    color: "#000",
    fontFamily: "Raleway-Bold",
  },
  viewAll: {
    fontSize: width * 0.035,
    color: "#00CC99",
    fontWeight: "600",
    fontFamily: "Raleway-Bold",
  },
  cardTouchable: {
    marginVertical: 8,
  },
  card: {
    backgroundColor: "#fafafa",
    padding: width * 0.04,
    borderRadius: 10,
    width: "100%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  leftBadges: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  idBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  idText: {
    color: "white",
    fontSize: width * 0.03,
  },
  paidBadge: {
    backgroundColor: Colors.tertiary,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  paidText: {
    color: "black",
    fontSize: width * 0.03,
  },
  infoContainer: {
    backgroundColor: "#EBEBEB",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  label: {
    fontSize: 14,
    color: "#9E9E9E",
    flex: 1,
    textAlign: "left",
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-start",
  },
  boldText: {
    fontWeight: "700",
    fontFamily: "Raleway-Bold",
    fontSize: 16,
    color: "#525252",
  },
  profileIcon: {
    width: 32,
    height: 32,
    marginRight: 5,
    borderRadius: width * 0.04,
  },
  detailsContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopColor: "#ddd",
    gap: 8,
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});
