import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
  KeyboardAvoidingView,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import HomeHeader from "@/components/user-flow/home-header";
import { Colors } from "@/constants/Colors";

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

const Prescriptions = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {/* Header */}
      <HomeHeader
        showSearch={true}
        showFilter={true}
        showEdit={false}
        showShare={false}
        showDownload={false}
      />

      {/* FlatList replaces ScrollView */}
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={styles.heading}>My Prescriptions</Text>
            <Text style={styles.discription}>
              All of the prescriptions received by the Therapists from the start
              you’ve registered till date.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={() =>
              router.push("/appointment-details/prescription-details")
            }
          >
            <View style={styles.headerRow}>
              <View style={styles.leftBadges}>
                <View style={styles.idBadge}>
                  <Text style={styles.idText}>ID: 5646543</Text>
                </View>
              </View>
              <View style={styles.paidBadge}>
                <Text style={styles.paidText}>Jan 12, 2025</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle1}>Prescription title:</Text>
            <Text style={styles.sectionTitle}>Prescription title here</Text>

            <View style={styles.infoContainer1}>
              <View style={styles.row}>
                <Text style={styles.label}>Therapist name</Text>
              </View>

              <View style={styles.therapistContainer}>
                <Image
                  source={require("@/assets/images/codyfisher.png")}
                  style={styles.profileIcon}
                />
                <Text style={styles.boldText1}>{item.therapist}</Text>
              </View>
            </View>

            <View style={styles.detailsContainer}>
              <View style={{ gap: 0 }}>
                <Text style={styles.detailText}>
                  <Text style={styles.boldText}>Service: </Text>Skin Care
                </Text>
                <Text style={styles.detailText}>
                  <Text style={styles.boldText}>Appointment for: </Text>My Self
                </Text>
                <Text style={styles.detailText}>
                  <Text style={styles.boldText}>Med. Prescribed: </Text>2
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
        ListFooterComponent={<View style={{ height: 40 }} />}
        showsVerticalScrollIndicator={false}
      />
    </KeyboardAvoidingView>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
  },
  headerContainer: {
    marginTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 5,
    fontFamily: "Raleway-Bold",
  },
  discription: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000",
    marginBottom: 20,
    width: 320,
    fontFamily: "OpenSans-Regular",
  },
  card: {
    backgroundColor: "#fafafa",
    padding: width * 0.05,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: width * 0.03,
    width: width * 0.9,
    alignSelf: "center",
    top: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftBadges: { flexDirection: "row", alignItems: "center", gap: 5 },
  idBadge: {
    backgroundColor: Colors.primary,
    padding: 5,
    borderRadius: 80,
    width: 95,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  idText: { color: "white" },
  paidBadge: {
    backgroundColor: "#EBEBEB",
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 80,
    alignSelf: "flex-end",
  },
  paidText: { color: "black" },
  infoContainer1: {
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
  label: { fontSize: 12, color: "gray", left: 10 },
  therapistContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  boldText1: { fontWeight: "bold", fontFamily: "Raleway-Bold" },
  profileIcon: { width: 32, height: 32, marginRight: 5, borderRadius: 16 },
  detailsContainer: {
    backgroundColor: "#fafafa",
    padding: 20,
    borderRadius: 5,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    marginTop: 0,
    fontFamily: "Raleway-Bold",
  },
  sectionTitle1: {
    fontSize: 12,
    color: "#000",
    marginTop: 15,
    fontFamily: "OpenSans-Regular",
  },
  detailText: {
    fontSize: 16,
    color: "#525252",
    marginBottom: 5,
    fontFamily: "OpenSans-Regular",
  },
  boldText: {
    fontWeight: "700",
    color: "gray",
    fontFamily: "OpenSans-Regular",
  },
});

export default Prescriptions;
