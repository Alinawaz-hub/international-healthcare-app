import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Button from "@/components/button";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Header from "@/components/user-flow/header";
import { Colors } from "@/constants/Colors";

const TherapistDetails = () => {
  const [selectedTab, setSelectedTab] = useState("General Info");

  return (
    <View style={styles.container}>
      <Header
        showSearch={false}
        showFilter={false}
        showAdd={false}
        showDownload={false}
        hideEmptyContainer={true}
      />

      <Text style={styles.header}>Doctors Details</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/Drayesha1.png")}
            style={styles.image}
          />
          <View style={styles.ratingIdContainer}>
            <View style={styles.ratingWrapper}>
              <Ionicons name="star" size={14} color="white" />
              <Text style={styles.ratingText}>Ratings: 5.4</Text>
            </View>
            <Text style={styles.id}>ID: 5646543</Text>
          </View>
        </View>

        <Text style={styles.specialist}>Allergist - Individual</Text>
        <View style={styles.row}>
          <Text style={styles.name}>Dr. Ayesha Noor</Text>
          <Text style={styles.price}>$45.00</Text>
        </View>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
          Aliquam in hendrerit urna.
        </Text>

        <Text style={styles.sectionTitle1}>Education</Text>
        <Text style={styles.detailText1}>M.B.B.S | F.C.P.S</Text>

        <Text style={styles.sectionTitle}>Other Details</Text>
        <View style={styles.details}>
          <Text style={styles.detailText}>
            <Text style={styles.bold}>Specialist in:</Text> Allergist Specialist
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.bold}>Age group:</Text> 8-16 years
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.bold}>Language:</Text> English, Spanish
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.bold}>Funding options:</Text> Cash & Card
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.bold}>Service delivery:</Text> Immediate
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.bold}>Location:</Text> 8502 Preston Rd.
            Inglewood, Maine 98380
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.bold}>Special interest area:</Text>
          </Text>
          <Text
            style={{ width: 250, top: -10, color: "#525252", fontSize: 16 }}
          >
            Developmental Language Disorder (DLD), Literacy, Articulation,
            Supporting autistic individuals, Parent and caregiver coaching,
            Early language supports, Social Skills
          </Text>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          title="Continue"
          style={styles.selectButton}
          type="default"
          onPress={() => router.push("/book-appointments/available-time-slot")}
        />
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
    </View>
  );
};

export default TherapistDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginTop: 20,
    marginBottom: 10,
    fontFamily: "Raleway-Bold",
  },
  imageContainer: {
    position: "relative",
    alignItems: "center",
  },
  image: {
    width: 358,
    height: 224,
    borderRadius: 10,
    resizeMode: "cover",
  },
  ratingIdContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  ratingWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,

    justifyContent: "center",
  },
  ratingText: {
    color: "white",
    fontSize: 12,
    marginLeft: 5,
  },
  id: {
    fontSize: 14,
    color: "black",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
    textAlign: "center",
    fontWeight: "400",
  },
  specialist: {
    color: "#b7b2b2",
    marginTop: 8,
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    fontFamily: "Raleway-Bold",
  },
  price: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F1F1F",
    fontFamily: "Raleway-Bold",
  },
  description: {
    fontSize: 14,
    color: "gray",
    width: 270,
    fontFamily: "OpenSans-Regular",
  },
  tabsContainer: {
    flexDirection: "row",
    marginTop: 15,
    borderColor: "#E6E6E6",
    paddingBottom: 5,
    height: 42,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: "#F7F7F7",
    marginRight: 5,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: "#525252",
  },
  tabText: {
    fontSize: 14,
    color: "#525252",
    textAlign: "center",
  },
  activeTabText: {
    color: "white",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginTop: 30,
    top: -20,
    fontFamily: "Raleway-Bold",
  },
  sectionTitle1: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginTop: 30,
    top: -20,
    fontFamily: "Raleway-Bold",
  },
  consultations: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -10,
    margin: 20,
  },
  consultItem: {
    alignItems: "center",
    top: 10,
  },
  consultIcon: {
    width: 20,
    height: 20,
    marginBottom: 4,
  },
  consultText: {
    fontSize: 14,
    color: "#525252",
  },
  details: {
    marginTop: 0,
    gap: 8,
  },
  detailText: {
    fontSize: 16,
    color: "#525252",
    marginBottom: 5,
    fontFamily: "OpenSans-Regular",
  },
  detailText1: {
    fontSize: 16,
    color: "#525252",
    fontFamily: "OpenSans-Regular",
    top: -15,
  },
  bold: {
    fontWeight: "400",
    color: "#9E9E9E",
    fontSize: 17,
  },
  selectButton: {
    width: "100%",
    height: 48,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 80,
  },
  cancelButton: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#A8A8A8",
    marginTop: 10,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    paddingBottom: 20,
  },
});