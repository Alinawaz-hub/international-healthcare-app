import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Header from "@/components/user-flow/header";
import { Colors } from "@/constants/Colors";

const Report = () => {
  return (
    <View style={{ backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <Header
          showSearch={false}
          showFilter={false}
          showDownload={false}
          showAdd={false}
        />

        {/* Report Title */}
        <Text style={styles.heading}>Medical Report</Text>

        {/* Report ID and Service */}
        <View style={styles.reportBox}>
          <Text style={styles.reportId}>ID: 5646543</Text>
          <Text style={styles.reportInfo}>Service: Allergic</Text>
          <Text style={styles.reportInfo}>Date: Jan 23, 2025 | 04:37 pm</Text>
        </View>

        {/* Patient Details */}
        <Text style={styles.sectionHeading}>Patient Details</Text>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Patient name:</Text>
          <Text style={styles.value}>Emilie Corner</Text>

          <Text style={styles.label}>Patient age:</Text>
          <Text style={styles.value}>25 years</Text>

          <Text style={styles.label}>Patient gender:</Text>
          <Text style={styles.value}>Female</Text>

          <Text style={styles.label}>Contact no:</Text>
          <Text style={styles.value}>+1 (234) 567-8900</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>emilie.corner@gmail.com</Text>
        </View>

        {/* Appointment Details */}
        <Text style={styles.sectionHeading}>Appointment Details</Text>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Doctor name:</Text>
          <Text style={styles.value}>Dr. Ayesha</Text>

          <Text style={styles.label}>Appt. date:</Text>
          <Text style={styles.value}>Jan 31, 2025</Text>

          <Text style={styles.label}>Appt. time:</Text>
          <Text style={styles.value}>05:00 pm</Text>

          <Text style={styles.label}>Contact no:</Text>
          <Text style={styles.value}>+1 (234) 567-8900</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>admin@clinicname.com</Text>

          <Text style={styles.label}>Linked clinic:</Text>
          <Text style={styles.value}>Fatima Memorial Hospital</Text>

          <Text style={styles.label}>Website:</Text>
          <Text style={styles.value}>www.fatimamemorialhospital.com</Text>
        </View>

        {/* Medical Details */}
        <Text style={styles.sectionHeading}>Medical Details</Text>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Is it your first therapy?</Text>
          <Text style={styles.value}>No</Text>

          <Text style={styles.label}>Are you taking any medicine?</Text>
          <Text style={styles.value}>No</Text>

          <Text style={styles.label}>When was your last visit?</Text>
          <Text style={styles.value}>About a week ago</Text>

          <Text style={styles.label}>Pre condition</Text>
          <Text style={styles.value}>Normal</Text>

          <Text style={styles.label}>Current condition</Text>
          <Text style={styles.value}>Serious</Text>

          <Text style={styles.label}>How can a doctor help you?</Text>
          <Text style={styles.value}>
            Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa
            mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.
          </Text>

          <Text style={styles.label}>Invoice will be sent to</Text>
          <Text style={styles.value}>alexander39@gmail.com</Text>
        </View>

        {/* Reports Section */}
        <Text style={styles.sectionHeading}>Reports</Text>
        {[1, 2].map((_, index) => (
          <View style={styles.reportFile} key={index}>
            <FontAwesome
              name="file-pdf-o"
              size={30}
              color="red"
              style={{ marginRight: 10 }}
            />
            <View>
              <Text style={styles.reportTitle}>File title.pdf</Text>
              <Text style={styles.reportSize}>Size: 39mb</Text>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.downloadButton}>
          <Text style={styles.downloadText}>Download Report</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Report;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  header: {
    backgroundColor: "#EAF6EF",
    padding: 10,
    borderRadius: 15,
    alignSelf: "flex-start",
  },
  backButton: {
    padding: 5,
  },
  backArrow: {
    fontSize: 18,
    fontWeight: "bold",
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 15,
    marginBottom: 10,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 25,
    marginBottom: 10,
  },
  reportBox: {
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 10,
  },
  reportId: {
    backgroundColor: "#000",
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 80,
    fontSize: 13,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  reportInfo: {
    fontSize: 16,
    color: "#333",
    marginBottom: 3,
  },
  infoBox: {
    marginBottom: 10,
  },
  label: {
    color: "#888",
    fontSize: 16,
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#000",
  },
  reportFile: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  reportTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  reportSize: {
    fontSize: 13,
    color: "#888",
  },
  downloadButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  downloadText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
