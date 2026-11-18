import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import HeaderDoctor from "@/components/doctor-flow/header-doc";
import { Colors } from "@/constants/Colors";

const PatientDetailsGeneralInfo = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <View style={styles.container}>
      <HeaderDoctor
        showBack={true}
        showSearch={false}
        showFilter={false}
        showAdd={false}
        showDownload={false}
        showEdit={false}
        showShare={false}
      />

      {/* Patient Details Header */}
      <Text style={styles.header}>Patient Details</Text>
      <View style={styles.profileContainer}>
        <Image
          source={require("../../assets/images/p5.png")}
          style={styles.avatar}
        />
        <Text style={styles.patientName}>Cody Fisher</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab("general")}
          style={[styles.tab, activeTab === "general" && styles.activeTab]}
        >
          <Text style={styles.tabText}>General & Contact Info</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("medical")}
          style={[styles.tab, activeTab === "medical" && styles.activeTab]}
        >
          <Text style={styles.tabText}>Medical Info</Text>
        </TouchableOpacity>
      </View>

      {/* General & Contact Info */}
      {activeTab === "general" && (
        <View>
          <Text style={styles.sectionTitle}>General Info</Text>
          <Text style={styles.infoText}>
            <Text style={styles.label}>Age:</Text> 25
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.label}>Gender:</Text> Female
          </Text>

          <Text style={styles.sectionTitle}>Contact Info</Text>
          <Text style={styles.infoText}>
            <Text style={styles.label}>Phone no:</Text> +1 (234) 567-8900
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.label}>Email:</Text> cody.fisher29@gmail.com
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.label}>Address:</Text> 4517 Washington Ave.
            Manchester, Kentucky 39495
          </Text>
        </View>
      )}
      {activeTab === "medical" && (
        <View style={styles.medicalInfoContainer}>
          <View style={{ gap: 14 }}>
            <Text style={styles.infoLabel}>Is it your first therapy? </Text>
            <Text style={styles.infoText1}>No</Text>
            <Text style={styles.infoLabel}>Are you taking any medicine? </Text>
            <Text style={styles.infoText1}>No</Text>
            <Text style={styles.infoLabel}>When was your last visit? </Text>
            <Text style={styles.infoText1}>About a week ago</Text>
          </View>
          <View style={styles.conditionContainer}>
            <View>
              <Text style={styles.infoLabel}>Pre condition</Text>
              <Text style={styles.infoText2}>Normal</Text>
            </View>
            <View>
              <Text style={styles.infoLabel}>Current condition</Text>
              <Text style={styles.infoText2}>Serious</Text>
            </View>
          </View>
          <View style={{ gap: 0 }}>
            <Text style={styles.infoLabel}>How can a Therapist help you?</Text>
            <Text style={styles.descriptionText}>
              Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa
              mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.
            </Text>
          </View>
          <Text style={styles.infoLabel}>Invoice will be sent to </Text>
          <Text style={styles.infoText3}>alexander39@gmail.com</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginTop: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 25,
  },
  patientName: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10,
  },
  tabContainer: {
    flexDirection: "row",
    marginTop: 20,
    borderBottomColor: "#ccc",
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
    borderRadius: 20,
  },
  tabText: {
    fontSize: 14,
    color: "black",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  infoText: {
    fontSize: 16,
    color: "#525252",
    marginTop: 5,
    marginBottom: 5,
  },
  infoText3: {
    fontSize: 16,
    color: "#525252",
    top: -8,
  },
  label: {
    color: "#9E9E9E",
  },
  medicalInfoContainer: {
    marginBottom: 20,
    gap: 8,
    marginTop: 20,
  },
  infoContainer: {
    marginBottom: 20,
    gap: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#b5b3b3",
  },
  infoText1: {
    fontWeight: "400",
    color: "#666",
    fontSize: 16,
    marginTop: -8,
    marginBottom: 2,
    fontFamily: "OpenSans-Regular",
  },
  infoText2: {
    fontWeight: "400",
    color: "#666",
    fontSize: 16,
  },
  conditionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    marginRight: 40,
    top: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
    marginBottom: 10,
    lineHeight: 20,
  },
});

export default PatientDetailsGeneralInfo;
