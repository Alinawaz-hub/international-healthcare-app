import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import Header from "@/components/user-flow/header";
import { Colors } from "@/constants/Colors";

const ReviewDetails = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <Header
        showBack={true}
        showSearch={false}
        showFilter={false}
        showAdd={false}
        showDownload={false}
      />

      {/* Title */}
      <Text style={styles.title}>Review Details</Text>

      {/* ID & Rating */}
      <View style={styles.cardHeader}>
        <View style={styles.idBadge}>
          <Text style={styles.idText}>ID: 5646543</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Entypo name="star-outlined" size={16} color="#000" />
          <Text style={styles.ratingText}>5.0</Text>
        </View>
      </View>

      {/* Therapist Info */}
      <View style={styles.clinicCard}>
        {/* Therapist Name Section */}
        <View>
          <Text style={styles.label}>Therapist name</Text>
          <View style={styles.row}>
            <Image
              source={require("@/assets/images/chat1.png")}
              style={styles.profileImage}
            />
            <Text style={styles.therapistText}> Cody Fisher</Text>
          </View>
        </View>
      </View>

      {/* Service Info */}
      <View style={styles.infoSection}>
        <Text style={styles.infoLabel}>Service got:</Text>
        <Text style={styles.infoValue}>Allergist</Text>
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.infoLabel}>Service date:</Text>
        <Text style={styles.infoValue}>Jan 22, 2025</Text>
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.infoLabel}>Reviewed on:</Text>
        <Text style={styles.infoValue}>Jan 22, 2025</Text>
      </View>

      {/* Review Text */}
      <Text style={styles.reviewTitle}>Your Review</Text>
      <Text style={styles.reviewText}>
        Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
        Aliqua...
      </Text>
    </View>
  );
};

export default ReviewDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 15,
    marginTop: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  idBadge: {
    backgroundColor: Colors.primary,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 80,
  },
  idText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
    color: "#000",
  },
  clinicCard: {
    backgroundColor: "#EBEBEB",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  label: {
    fontSize: 12,
    color: "#888",
    marginBottom: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  therapistText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 8, // Add spacing between text and image
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 10,
  },
  infoSection: {
    flexDirection: "row",
    marginBottom: 5,
  },
  infoLabel: {
    fontSize: 14,
    color: "#777",
  },
  infoValue: {
    fontSize: 16,
    color: "#525252",
    fontWeight: "bold",
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginTop: 15,
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 14,
    color: "#525252",
  },
});
