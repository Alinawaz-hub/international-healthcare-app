import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import HeaderDoctor from "@/components/doctor-flow/header-doc";
import { Colors } from "@/constants/Colors";

const ReviewDetails = () => {
  const router = useRouter();
  const { id, name, rating, service, serviceDate, reviewDate, review } =
    useLocalSearchParams<{
      id: string;
      name: string;
      rating: string;
      service: string;
      serviceDate: string;
      reviewDate: string;
      review: string;
    }>();

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

      <Text style={styles.heading}>Review Details</Text>

      {/* ID and Rating */}
      <View style={styles.cardHeader}>
        <Text style={styles.idBadge}>ID: {id}</Text>
        <View style={styles.ratingContainer}>
          <Entypo name="star" size={16} color="#000" />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </View>

      {/* User Info */}
      <View style={styles.userInfo}>
        <Image
          source={require("@/assets/images/codyfisher.png")}
          style={styles.userImage}
        />
        <Text style={styles.userName}>{name}</Text>
      </View>

      {/* Service Details */}
      <Text style={styles.serviceText}>
        <Text style={styles.boldText}>Service got: </Text> {service}
      </Text>
      <Text style={styles.serviceText}>
        <Text style={styles.boldText}>Service date: </Text> {serviceDate}
      </Text>
      <Text style={styles.serviceText}>
        <Text style={styles.boldText}>Reviewed on: </Text> {reviewDate}
      </Text>

      {/* Review Section */}
      <Text style={styles.reviewHeading}>Review</Text>
      <Text style={styles.reviewText}>{review}</Text>
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
  backButton: {
    marginVertical: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "Raleway-Bold",
    marginBottom: 10,
    marginTop: 15,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  idBadge: {
    backgroundColor: Colors.primary,
    color: "#FFF",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
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
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0E0E0",
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  userImage: {
    width: 32,
    height: 32,
    borderRadius: 15,
    marginRight: 10,
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  serviceText: {
    fontSize: 14,
    color: "#555",
    marginVertical: 3,
  },
  boldText: {
    fontWeight: "bold",
    color: "#9E9E9E",
    fontSize: 16,
  },
  reviewHeading: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginTop: 15,
  },
  reviewText: {
    fontSize: 14,
    color: "#1F1F1F",
    marginTop: 5,
  },
});
