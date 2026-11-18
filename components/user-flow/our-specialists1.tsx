import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import Button from "@/components/button";
import { Colors } from "@/constants/Colors";

interface OurSpecialistsProps {
  showHeading?: boolean;
  showButton?: boolean;
  selectableSpecialists?: string[];
  selectedSpecialist?: string | null;
  onSelectSpecialist?: (id: string) => void;
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

const OurSpecialists1: React.FC<OurSpecialistsProps> = ({
  showHeading = true,
  showButton = false,
  selectableSpecialists = [],
  selectedSpecialist,
  onSelectSpecialist,
}) => {
  return (
    <View style={styles.container}>
      {showHeading && <Text style={styles.heading}>Our Specialists</Text>}

      {specialists
        .reduce<(typeof specialists)[]>((rows, specialist, index) => {
          if (index % 2 === 0) {
            rows.push([specialist]);
          } else {
            rows[rows.length - 1].push(specialist);
          }
          return rows;
        }, [])
        .map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((specialist) => {
              const isSelected = selectedSpecialist === specialist.id;
              const isSelectable = selectableSpecialists.includes(
                specialist.id
              );

              return (
                <TouchableOpacity
                  key={specialist.id}
                  activeOpacity={isSelectable ? 0.7 : 1}
                  onPress={() =>
                    isSelectable && onSelectSpecialist?.(specialist.id)
                  }
                  style={[
                    styles.card,
                    isSelectable && isSelected && styles.selectedCard,
                  ]}
                >
                  <Image source={specialist.image} style={styles.image} />
                  <View style={styles.overlay}>
                    <View style={styles.ratingContainer}>
                      <FontAwesome name="star" size={12} color="white" />
                      <Text style={styles.ratingText}>
                        {" "}
                        {specialist.rating}
                      </Text>
                    </View>
                    <View style={styles.detailsContainer}>
                      <Text style={styles.specialty}>
                        {specialist.specialty}
                      </Text>
                      <Text style={styles.name}>{specialist.name}</Text>
                      <Text style={styles.id}>ID: {specialist.detail}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}

      {showButton && (
        <View style={styles.buttonContainer}>
          <Button
            title="Select & Continue"
            style={[
              styles.selectButton,
              {
                backgroundColor: selectedSpecialist ? Colors.primary : "#CBCACE",
              },
            ]}
            type="default"
            onPress={() =>
              router.push("/book-appointments/available-time-slot")
            }
            disabled={!selectedSpecialist}
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "700",
    color: "black",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  card: {
    width: "48%",
    height: 220,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  selectedCard: {
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: "#E6FFF4",
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
    width: 95,
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
    width: 80,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 20,
    paddingHorizontal: 0,
  },
  selectButton: {
    width: "100%",
  },
});

export default OurSpecialists1;