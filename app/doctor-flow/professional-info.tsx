import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import HeaderDoctor from "@/components/doctor-flow/header-doc";

const pdfIcon = require("../../assets/images/pdf.png");

const documents = [
  { category: "Resume", title: "File title.pdf", size: "39mb" },
  { category: "Malpractice Insurance", title: "File title.pdf", size: "39mb" },
  { category: "W9 Form", title: "File title.pdf", size: "39mb" },
  { category: "Other attachments", title: "File title.pdf", size: "39mb" },
  { category: "Other affiliations", title: "File title.pdf", size: "39mb" },
];

const ProfessionalInfo = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <HeaderDoctor
        showBack={true}
        showSearch={false}
        showFilter={false}
        showAdd={false}
        showDownload={false}
        showShare={false}
      />

      {/* Title */}
      <Text style={styles.title}>Professional Info</Text>

      {/* General Info Section */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>General Info</Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>Profession:</Text> Therapist
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>Age group:</Text> 8 - 16 years
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>Language:</Text> English, Spanish
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>Funding option:</Text> Cash & Card
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>Service delivery:</Text> Immediate
        </Text>
        <Text style={[styles.label, styles.lightText]}>
          <Text style={styles.bold}>Special interest area:</Text>
          Lorem ipsum dolor sit amet consectetur adipiscing elit.
        </Text>
      </View>

      {/* Attached Documents */}
      <Text style={styles.sectionTitle}>Attached Documents</Text>
      {documents.map((doc, index) => (
        <View key={index} style={styles.documentContainer}>
          <Image source={pdfIcon} style={styles.pdfIcon} />
          <View>
            <Text style={styles.documentTitle}>{doc.title}</Text>
            <Text style={styles.documentSize}>Size: {doc.size}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default ProfessionalInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 10,
  },
  infoSection: {
    backgroundColor: "#F9F9F9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  bold: {
    fontWeight: "bold",
    color: "#000",
  },
  lightText: {
    color: "#999",
  },
  documentContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  pdfIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  documentTitle: {
    fontSize: 14,
    color: "#000",
  },
  documentSize: {
    fontSize: 12,
    color: "#777",
  },
});
