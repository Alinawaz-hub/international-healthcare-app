import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import HomeHeader from "@/components/user-flow/home-header";
import FindByServices from "@/components/user-flow/findbyservices";
import OurSpecialists from "@/components/user-flow/ourspecialists";
import RegisteredClinics from "@/components/user-flow/registeredclinics";
import UpcomingAppointments from "@/components/user-flow/upcomingappointments";
import BookAppointment from "@/components/user-flow/bookappointment";
import { Colors } from "@/constants/Colors";

const { width } = Dimensions.get("window");

// Styles
const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: "white" },
  headerWrapper: { paddingHorizontal: 15 },
  listContent: { paddingHorizontal: 15, paddingBottom: 100 },
  sectionWrapper: {},
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: "#777",
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 20,
    width: 200,
    fontFamily: "raleway-Bold",
  },
  locationContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  textContainer: {
    flex: 1,
  },
  locationText: {
    fontSize: 14,
    color: "#525252",
    marginLeft: 5,
    fontWeight: "400",
    lineHeight: 21,
    fontFamily: "OpenSans-Regular",
    flexShrink: 1,
    marginBottom: 20,
  },
  container: {
    backgroundColor: Colors.primary,
    borderRadius: 15,
    marginVertical: 20,
    width: width * 0.915,
    height: 154,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    overflow: "hidden",
    
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  bookingTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    width: 180,
    marginBottom: 10,
    lineHeight: 24,
    fontFamily: "Raleway-Bold",
  },
  bookingRow: {
    flexDirection: "row",
    gap: 5,
    marginBottom: 10,
  },
  bookText: {
    color: "white",
    marginTop: 5,
    fontSize: 15,
    fontWeight: "700",
    fontFamily: "Raleway-Bold",
  },
  background: {
    width: 187,
    height: 154,
    position: "absolute",
    left: 190,
  },
});

// HomePage Component
export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");

  // List of components to be filtered based on search term
  const allComponents = [
    {
      key: "headerSection",
      title: "Header Section",
      component: (
        <>
          <Text style={styles.title}>How We Can Help You With?</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={20} color="gray" />
            <View style={styles.textContainer}>
              <Text style={styles.locationText}>
                4517 Washington Ave, Manchester, Kentucky 394995
              </Text>
            </View>
          </View>
        </>
      ),
    },
    {
      key: "upcomingAppointments",
      title: "Upcoming Appointments",
      component: <UpcomingAppointments />,
    },
    {
      key: "bookingSection",
      title: "Booking Section",
      component: (
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.bookingTitle}>
            Book emergency Consultation
            </Text>
            <View style={styles.bookingRow}>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => router.push("/book-appointments/select-doctor")}
              >
                <View>
                  <Text style={styles.bookText}>Book Now</Text>
                </View>
                <View>
                  <Ionicons name="arrow-forward" size={25} color="white" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <ImageBackground
            source={require("../../assets/images/daimond1.png")}
            style={styles.background}
            resizeMode="contain"
          />
        </View>
      ),
    },

  
    {
      key: "findServices",
      title: "Find By Services",
      component: <FindByServices />,
    },
    {
      key: "bookAppointment",
      title: "Book An Appointment",
      component: <BookAppointment />,
    },
  ];

  // Filter components based on search term
  const filteredComponents = allComponents.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      searchTerm === ""
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.flex}
    >
      <View style={styles.headerWrapper}>
        <HomeHeader
          showSearch={true}
          showFilter={false}
          showEdit={false}
          showShare={false}
          showDownload={false}
          onSearch={(term) => setSearchTerm(term)}
        />
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <FlatList
          data={filteredComponents}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.sectionWrapper}>{item.component}</View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No components match “{searchTerm}”
            </Text>
          }
        />
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}