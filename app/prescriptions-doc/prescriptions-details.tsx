import React from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import Header from "@/components/doctor-flow/header-doc";
import { Colors } from "@/constants/Colors";

const PrescriptionDetails = () => {
  return (
    <View style={styles.container}>
      {/* Sticky Header */}

      <Header
        showBack={true}
        showSearch={false}
        showFilter={false}
        showAdd={false}
        showDownload={true}
        showEdit={false}
        showShare={false}
      />

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text style={styles.title}>Prescription Details</Text>
        <Text style={styles.subtitle}>
          All of the prescriptions received by the Therapists from the start
          you’ve registered till date.
        </Text>

        {/* Date & Service */}
        <Text style={styles.label}>
          Service:<Text style={styles.value}> Skin Care</Text>
        </Text>
        <Text style={styles.label}>
          Date: <Text style={styles.value}>Jan 23, 2025 | 04:37 pm</Text>
        </Text>

        {/* Doctor Info */}
        <View style={styles.doctorContainer}>
          <View style={styles.idBadge}>
            <Text style={styles.idText}>ID: 5646543</Text>
          </View>
          <Text style={styles.doctorName}>Dr. Joseph Chem</Text>
          <Text>M.B.B.S., M.D., M.S. | Reg. No: 1561235</Text>
          <Text>Mob. No: +1 (234) 567-8900</Text>
        
          
        </View>

        {/* Medicines */}
        <Text style={styles.sectionTitle}>Prescribed Medicines</Text>
        {[1, 2].map((item) => (
          <View key={item} style={styles.medicineCard}>
            <View style={styles.medicineTop}>
              <View>
                <Text style={styles.medicineType}>Tablet</Text>
                <Text style={styles.medicineName}>Demo Med Name 01</Text>
              </View>
              <View style={styles.doseBadge}>
                <Text style={styles.doseText}>50 mg</Text>
              </View>
            </View>
            <View style={styles.medicineBottom}>
              <Text style={styles.medicineLabel}>
                Duration:<Text style={styles.medicineValue}> One Month</Text>
              </Text>
              <Text style={styles.medicineLabel}>Taken times:</Text>
              <Text style={styles.medicineTimes}>
                1 Morning, 1 Afternoon, 1 Evening, 1 Night
              </Text>
            </View>
          </View>
        ))}

        {/* Advice */}
        <Text style={styles.sectionTitle}>Advise Given</Text>
        <Text style={styles.adviceText}>Avoid oily and spicy foods.</Text>
      </ScrollView>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFF",
    paddingHorizontal: 15,
  },
  headerWrapper: {
    zIndex: 10,
    backgroundColor: "#FFFF",
    elevation: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    fontFamily: "Raleway-Bold",
  },
  subtitle: {
    color: "gray",
    marginTop: 10,
    marginBottom: 10,
    fontFamily: "OpenSans-Regular",
  },
  label: {
    color: "gray",
    marginBottom: 5,
    fontFamily: "OpenSans-Regular",
  },
  value: {
    color: "black",
  },
  doctorContainer: {
    backgroundColor: Colors.tertiary,
    padding: 16,
    borderRadius: 10,
    marginTop: 16,
  },
  idBadge: {
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 80,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  idText: {
    color: "white",
    fontSize: 14,
  },
  doctorName: {
    fontWeight: "bold",
    fontFamily: "Raleway-Bold",
    fontSize: 18,
    marginBottom: 5,
  },
  divider: {
    borderTopWidth: 1,
    borderColor: "#ccc",
    marginVertical: 8,
  },
  clinicTitle: {
    fontWeight: "bold",
    fontFamily: "Raleway-Bold",
    fontSize: 18,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    fontFamily: "Raleway-Bold",
  },
  medicineCard: {
    backgroundColor: "#EBEBEB",
    borderRadius: 10,
    marginTop: 10,
  },
  medicineTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
  },
  medicineType: {
    color: "black",
  },
  medicineName: {
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Raleway-Bold",
  },
  doseBadge: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 80,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  doseText: {
    fontFamily: "OpenSans-Regular",
  },
  medicineBottom: {
    backgroundColor: "white",
    padding: 12,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  medicineLabel: {
    color: "#9E9E9E",
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
  },
  medicineValue: {
    color: "#525252",
  },
  medicineTimes: {
    color: "#525252",
    marginTop: 4,
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
  },
  adviceText: {
    color: "#525252",
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
  },
});

export default PrescriptionDetails;
