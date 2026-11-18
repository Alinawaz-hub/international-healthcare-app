import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import HomeHeaderDoc from "../../components/doctor-flow/home-header-doctor";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";

const { width } = Dimensions.get("window");

const reviews = [
  {
    id: "5646543",
    name: "Cody Fisher",
    rating: "5.0",
    review:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliqua...",
    image: require("@/assets/images/codyfisher.png"),
  },
  {
    id: "5646544",
    name: "Jane Doe",
    rating: "4.8",
    review:
      "Pellentesque sit amet sapien. Morbi non venenatis nisi. Nulla facilisi...",
    image: require("@/assets/images/codyfisher.png"),
  },
];

const RatingsReviews = () => {
  return (
    <View style={styles.container}>
      <HomeHeaderDoc showSearch={true} showFilter={true} showAdd={false} />

      <Text style={styles.heading}>Ratings & Reviews</Text>
      <Text style={styles.subheading}>
        Ratings & feedback you’ve submitted against your sessions.
      </Text>

      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.reviewCard}
            activeOpacity={0.8}
            onPress={() => router.push("/doctor-flow/reviews-details")}
          >
            {/* Card Header */}
            <View style={styles.cardHeader}>
              <Text style={styles.idBadge}>ID: {item.id}</Text>
              <View style={styles.ratingContainer}>
                <Entypo name="star-outlined" size={16} color="#000" />
                <Text style={styles.ratingText}>{item.rating}</Text>
              </View>
            </View>

            {/* Reviewer Info */}
            <View style={styles.userInfo}>
              <Text style={styles.reviewFrom}>Review from:</Text>
              <View style={styles.userDetails}>
                <Image source={item.image} style={styles.userImage} />
                <Text style={styles.userName}>{item.name}</Text>
              </View>
            </View>

            {/* Review Text */}
            <Text style={styles.reviewLabel}>Review:</Text>
            <Text style={styles.reviewText}>{item.review}</Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default RatingsReviews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    fontFamily: "Raleway-Bold",
    marginTop: 20,
  },
  subheading: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  reviewCard: {
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
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
    overflow: "hidden",
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
    backgroundColor: "#EBEBEB",
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  reviewFrom: {
    fontSize: 12,
    color: "#777",
    marginBottom: 5,
  },
  userDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: width * 0.08,
    height: width * 0.08,
    borderRadius: (width * 0.08) / 2,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  reviewLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#9E9E9E",
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 16,
    color: "#525252",
  },
});
