import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Button from "@/components/button";
import { router } from "expo-router";

interface OurSpecialistsProps {
  showHeading?: boolean;
  showButton?: boolean;
}

const specialists = [
  {
    id: "1",
    name: "Dr. Ayesha",
    specialty: "Allergist",
    rating: "Ratings: 5.4",
    detail: "5646543",
    image: require("@/assets/images/Drayesha.png"),
  },
  {
    id: "2",
    name: "Dr. Imran",
    specialty: "Allergist",
    rating: "Ratings: 5.4",
    detail: "5646543",
    image: require("@/assets/images/Drimran.png"),
  },
  {
    id: "3",
    name: "Dr. Kely",
    specialty: "Allergist",
    rating: "Ratings: 5.4",
    detail: "5646543",
    image: require("@/assets/images/Drkely.png"),
  },
  {
    id: "4",
    name: "Dr. Maria",
    specialty: "Allergist",
    rating: "Ratings: 5.4",
    detail: "5646543",
    image: require("@/assets/images/Drmaria.png"),
  },
];

const OurSpecialists: React.FC<OurSpecialistsProps> = ({
  showHeading = true,
  showButton = true,
}) => {
  return (
    <View style={styles.container}>
      {showHeading && <Text style={styles.heading}>Our Specialists</Text>}

      {/* Header with Dr. Ayesha & Button */}
      <View style={styles.headerRow}>
        <View style={styles.card}>
          <Image source={specialists[0].image} style={styles.image} />
          <View style={styles.overlay}>
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={12} color="white" />
              <Text style={styles.ratingText}> {specialists[0].rating}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.specialty}>{specialists[0].specialty}</Text>
              <Text style={styles.name}>{specialists[0].name}</Text>
              <Text style={styles.id}>ID: {specialists[0].detail}</Text>
            </View>
          </View>
        </View>

        {/* "View All" Button */}
        {showButton && (
          <Button
            title="View All"
            type="small"
            style={styles.viewAllButton}
            onPress={() => router.push("/book-appointments/select-doctor")}
          />
        )}
      </View>

      {/* Dr. Imran & Dr. Kely in the same row */}
      <View style={styles.row}>
        <View style={styles.card}>
          <Image source={specialists[1].image} style={styles.image} />
          <View style={styles.overlay}>
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={12} color="white" />
              <Text style={styles.ratingText}> {specialists[1].rating}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.specialty}>{specialists[1].specialty}</Text>
              <Text style={styles.name}>{specialists[1].name}</Text>
              <Text style={styles.id}>ID: {specialists[1].detail}</Text>
            </View>
          </View>
        </View>

        <View style={styles.card1}>
          <Image source={specialists[2].image} style={styles.image} />
          <View style={styles.overlay}>
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={12} color="white" />
              <Text style={styles.ratingText}> {specialists[2].rating}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.specialty}>{specialists[2].specialty}</Text>
              <Text style={styles.name}>{specialists[2].name}</Text>
              <Text style={styles.id}>ID: {specialists[2].detail}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Dr. Maria alone in the 3rd row, aligned at the bottom */}
      <View style={styles.lastRow}>
        <View style={[styles.card, styles.fullWidthCard]}>
          <Image source={specialists[3].image} style={styles.image} />
          <View style={styles.overlay}>
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={12} color="white" />
              <Text style={styles.ratingText}> {specialists[3].rating}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.specialty}>{specialists[3].specialty}</Text>
              <Text style={styles.name}>{specialists[3].name}</Text>
              <Text style={styles.id}>ID: {specialists[3].detail}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "700",
    color: "black",
    marginBottom: 10,
    fontFamily: "Raleway-Bold",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  viewAllButton: {
    width: 150,
    marginBottom: 170,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  lastRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: -150,
    top: -170,
  },
  card: {
    width: "48%",
    height: 220,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8, // Stronger elevation for Android
  },
  card1: {
    width: "48%",
    height: 220,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8, // Stronger elevation for Android
    top: -175,
  },
  fullWidthCard: {
    width: "48%",
    alignSelf: "flex-end",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
    padding: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    backgroundColor: "black",
    padding: 5,
    borderRadius: 80,
    alignSelf: "flex-start",
    width: 90,
    height: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  ratingText: {
    color: "white",
    fontSize: 12,
    marginLeft: 5,
  },
  detailsContainer: {
    alignItems: "flex-start",
  },
  specialty: {
    fontSize: 12,
    color: "black",
    fontWeight: "bold",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
    fontFamily: "Raleway-Bold",
  },
  id: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 80,
    fontSize: 12,
    width: 74,
    textAlign: "center",
  },
});

export default OurSpecialists;