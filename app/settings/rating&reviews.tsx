import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

import { router } from "expo-router";
import HomeHeader from "@/components/user-flow/home-header";
import { Colors } from "@/constants/Colors";

const reviewsData = [
  {
    id: "5646543",
    rating: "5.0",
    review:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliqua...",
  },
  {
    id: "5646543",
    rating: "5.0",
    review:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliqua...",
  },
  {
    id: "5646543",
    rating: "5.0",
    review:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliqua...",
  },
];

const RatingsAndReviews = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <HomeHeader
        showSearch={true}
        showFilter={true}
        showEdit={false}
        showShare={false}
        showDownload={false}
      />

      {/* Title & Subtitle */}
      <Text style={styles.title}>Ratings & Reviews</Text>
      <Text style={styles.subtitle}>
        Ratings & feedback you’ve submitted against your sessions.
      </Text>

      {/* Reviews List */}
      <FlatList
        data={reviewsData}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push("/settings/review-details")}
            activeOpacity={0.9}
            style={styles.card}
          >
            {/* ID & Rating in the same line */}
            <View style={styles.cardHeader}>
              <View style={styles.idBadge}>
                <Text style={styles.idText}>ID: {item.id}</Text>
              </View>
              <View style={styles.ratingContainer}>
                <Entypo name="star-outlined" size={16} color="#000" />
                <Text style={styles.ratingText}>{item.rating}</Text>
              </View>
            </View>

            {/* Review Content */}
            <Text style={styles.reviewLabel}>Your review</Text>
            <Text style={styles.reviewText}>{item.review}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default RatingsAndReviews;

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
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#F8F8F8",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
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
  reviewLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 3,
  },
  reviewText: {
    fontSize: 14,
    color: "#333",
  },
});
