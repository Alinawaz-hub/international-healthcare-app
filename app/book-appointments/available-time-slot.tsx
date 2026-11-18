import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import Button from "@/components/button";
import Header from "@/components/user-flow/header";
import MonthSelector from "@/components/user-flow/month-selecter";
import { Colors } from "@/constants/Colors";

const AvailableTimeSlot = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("Available Time Slot");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [error, setError] = useState("");

  const dates = [
    { day: "Mon", date: "01" },
    { day: "Tue", date: "02" },
    { day: "Wed", date: "03" },
    { day: "Thu", date: "04" },
    { day: "Fri", date: "05" },
    { day: "Sat", date: "06" },
    { day: "Sun", date: "07" },
    { day: "Mon", date: "08" },
    { day: "Tue", date: "09" },
    { day: "Wed", date: "10" },
    { day: "Thu", date: "11" },
    { day: "Fri", date: "12" },
    { day: "Sat", date: "13" },
    { day: "Sun", date: "14" },
    { day: "Mon", date: "15" },
    { day: "Tue", date: "16" },
    { day: "Wed", date: "17" },
    { day: "Thu", date: "18" },
    { day: "Fri", date: "19" },
    { day: "Sat", date: "20" },
    { day: "Sun", date: "21" },
    { day: "Mon", date: "22" },
    { day: "Tue", date: "23" },
    { day: "Wed", date: "24" },
    { day: "Thu", date: "25" },
    { day: "Fri", date: "26" },
    { day: "Sat", date: "27" },
    { day: "Sun", date: "28" },
    { day: "Mon", date: "29" },
    { day: "Tue", date: "30" },
    { day: "Wed", date: "31" },
  ];

  const timeSlots = ["9:00 AM", "10:30 AM", "1:00 PM", "3:30 PM", "5:00 PM"];

  return (
    <View style={styles.container}>
      <Header
        showBack
        showSearch={false}
        showFilter={false}
        showAdd={false}
        showDownload={false}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>Book Your Appointment</Text>
          <Text style={styles.description}>
            Complete the following steps to schedule an appointment.
          </Text>
        </View>

        <Text style={styles.heading2}>Meet With Dr. Maria</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "Available Time Slot" && styles.selectedTab,
            ]}
            onPress={() => setSelectedTab("Available Time Slot")}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "Available Time Slot" && styles.selectedTabText,
              ]}
            >
              Available Time Slot
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "Dr. Details" && styles.selectedTab,
            ]}
            onPress={() => setSelectedTab("Dr. Details")}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "Dr. Details" && styles.selectedTabText,
              ]}
            >
              Dr. Details
            </Text>
          </TouchableOpacity>
        </View>

        {selectedTab === "Available Time Slot" ? (
          <>
            <MonthSelector />
            <FlatList
              data={dates}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.dateContainer}
              keyExtractor={(item) => item.date}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.dateItem,
                    selectedDate === item.date && styles.selectedDate,
                  ]}
                  onPress={() => {
                    setSelectedDate(item.date);
                    setError("");
                  }}
                >
                  <Text style={styles.dayText}>{item.day}</Text>
                  <Text
                    style={[
                      styles.dateText,
                      selectedDate === item.date && styles.selectedDateText,
                    ]}
                  >
                    {item.date}
                  </Text>
                </TouchableOpacity>
              )}
            />

            <Text style={styles.heading1}>Select Time Slot</Text>
            <Text style={styles.timeSlotTitle}>
              Thursday, Jan {selectedDate}, 2025
            </Text>
            <View style={styles.timeSlotContainer}>
              {timeSlots.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeSlot,
                    selectedTime === time && styles.selectedTimeSlot,
                  ]}
                  onPress={() => {
                    setSelectedTime((prev) => (prev === time ? null : time));
                    setError("");
                  }}
                >
                  <Text
                    style={[
                      styles.timeSlotText,
                      selectedTime === time && styles.selectedTimeSlotText,
                    ]}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {error ? (
              <View style={{ alignItems: "center", marginTop: 5 }}>
                <Text style={{ color: "red", fontSize: 14 }}>{error}</Text>
              </View>
            ) : null}
          </>
        ) : (
          <>
            <View style={styles.doctorCard}>
              <Image
                source={require("@/assets/images/Drayesha.png")}
                style={styles.doctorImage}
              />
              <View>
                <Text style={styles.specialistText}>
                  Allergist - Individual
                </Text>
                <Text style={styles.doctorName}>Dr. Ayesha Noor</Text>
              </View>
            </View>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa
              mi.
            </Text>
            <Text style={styles.sectionTitle}>Education</Text>
            <Text style={styles.detailText}>M.B.B.S | F.C.P.S</Text>
            <View style={{ gap: 8 }}>
              <Text style={styles.sectionTitle}>Other Details</Text>
              <Text style={styles.detailText}>
                <Text style={styles.boldText}>Specialist in: </Text>Allergist
                Specialist
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.boldText}>Age group: </Text>8-16 years
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.boldText}>Language: </Text>English, Spanish
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.boldText}>Funding options: </Text>Cash &
                Card
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.boldText}>Service delivery: </Text>Immediate
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.boldText}>Location: </Text>8502 Preston Rd.
                Inglewood, Maine 98380
              </Text>
            </View>
            <Text style={styles.specialInterestTitle}>
              Special interest area:
            </Text>
            <Text style={styles.specialInterestText}>
              Developmental Language Disorder (DLD), Literacy, Articulation,
              Supporting autistic individuals, Parent and caregiver coaching,
              Early language supports, Social Skills
            </Text>
          </>
        )}

        <View style={styles.buttonContainer}>
          {selectedTab === "Available Time Slot" ? (
            <Button
              title="Select & Continue"
              type="default"
              onPress={() => {
                if (!selectedDate || !selectedTime) {
                  setError("Please select the Date & Time");
                } else {
                  setError("");
                  router.push("/book-appointments/available-time-slot2");
                }
              }}
              style={{
                width: "100%",
                height: 48,
                backgroundColor: selectedTime ? Colors.primary : "#CBCACE",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 80,
              }}
            />
          ) : (
            <Button
              title="Continue"
              type="default"
              onPress={() =>
                router.push("/book-appointments/available-time-slot3")
              }
              style={styles.selectButton}
            />
          )}

          <Button
            title="Cancel"
            type="default"
            style={{
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "#E0E0E0",
              width: "100%",
              marginTop: 10,
            }}
            textStyle={{ color: "black" }}
            onPress={() => router.push("/(home-screen)/home-page")}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AvailableTimeSlot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
  },
  scrollContainer: {
    paddingBottom: 150,
  },
  headerContainer: {
    marginTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    width: 200,
  },
  heading1: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginBottom: 5,
  },
  heading2: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginBottom: 20,
    top: 10,
    fontFamily: "Raleway-Bold",
  },
  description: {
    fontSize: 16,
    color: "gray",
    marginBottom: 15,
    top: 5,

    width: 300,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
    width: "100%",
    height: 42,
    alignSelf: "center",
  },
  tabButton: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 80,
    marginHorizontal: 4,
    paddingVertical: 10,
  },
  selectedTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#525252",

    textAlign: "center",
  },
  selectedTabText: {
    color: "#FFF",

    textAlign: "center",
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 10,
  },
  dateItem: {
    width: 50,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#F7F7F7",
    marginHorizontal: 5,
  },
  selectedDate: {
    backgroundColor: Colors.tertiary,
  },
  dayText: {
    fontSize: 12,
    color: "#000",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
  selectedDateText: {
    color: Colors.primary,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    height: 50,
    borderBottomWidth: 0.5,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    marginBottom: 15,
  },

  timeSlotTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 30,
    color: "#b7b2b2",
  },
  timeSlotContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 10,
  },
  timeSlot: {
    width: "30%",
    height: 45,
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  selectedTimeSlot: {
    backgroundColor: Colors.primary,
  },
  timeSlotText: {
    fontSize: 14,
    fontWeight: "600",
  },
  selectedTimeSlotText: {
    color: "#FFF",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
    paddingBottom: 20,
  },
  doctorCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 80,
    marginRight: 15,
  },
  specialistText: {
    fontSize: 14,
    color: "#9E9E9E",
    fontFamily: "OpenSans-Regular",
  },
  doctorName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F1F1F",
    fontFamily: "Raleway-Bold",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F1F1F",
    marginTop: 15,
    fontFamily: "Raleway-Bold",
  },
  detailText: {
    fontSize: 16,
    color: "#525252",
    marginBottom: 5,
    fontFamily: "OpenSans-Regular",
  },
  boldText: {
    fontWeight: "700",
    color: "#9E9E9E",
  },
  specialInterestTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "gray",
    marginTop: 20,
  },
  specialInterestText: {
    fontSize: 16,
    color: "gray",
  },
  selectButton: {
    width: "100%",
    height: 48,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 80,
  },
});