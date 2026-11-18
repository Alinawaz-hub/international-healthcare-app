import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

const clinics = [
  {
    id: "1",
    name: "Clinic Name",
    therapists: 23,
    services: 12,
    phone: "(234) 567-890",
    website: "www.website.com",
  },
  {
    id: "2",
    name: "Clinic Name",
    therapists: 23,
    services: 12,
    phone: "(234) 567-890",
    website: "www.website.com",
  },
];

export default function RegisteredClinics() {
  return (
    <View>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Registered clinics</Text>
        <TouchableOpacity onPress={() => router.push("/settings/clinics")}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 250 }}>
        <FlatList
          horizontal
          data={clinics}
          keyExtractor={(item) => item.id}
          nestedScrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 30 }}
          renderItem={({ item }) => (
            <ImageBackground
              source={require("@/assets/images/black.png")}
              style={[styles.imageBackground, { marginRight: 25 }]}
            >
              <View style={styles.card}>
                <View style={styles.topContainer}>
                  <Image
                    source={require("@/assets/images/layout1.png")}
                    style={styles.overlayImage}
                  />
                  <Image
                    source={require("@/assets/images/apple.png")}
                    style={styles.clinicImage}
                  />

                  <View style={styles.ratingContainer}>
                    <FontAwesome name="star" size={12} color="white" />
                    <Text style={styles.ratingText}> Ratings: 5.4</Text>
                  </View>
                </View>

                <Text style={styles.name}>{item.name}</Text>

                <View style={styles.row}>
                  <View style={styles.iconWithText}>
                    <Image
                      source={require("@/assets/images/23doctor.png")}
                      style={styles.iconSmall}
                    />
                    <Text style={styles.info}>
                      {item.therapists} Therapists
                    </Text>
                  </View>

                  <View style={styles.iconWithText}>
                    <Image
                      source={require("@/assets/images/12services.png")}
                      style={styles.iconSmall}
                    />
                    <Text style={styles.info}>{item.services} Services</Text>
                  </View>
                </View>

                <View style={styles.row}>
                  <Image
                    source={require("@/assets/images/Mobile.png")}
                    style={styles.iconSmall}
                  />
                  <Text style={styles.info}>{item.phone}</Text>
                </View>

                <View style={styles.row}>
                  <Image
                    source={require("@/assets/images/12services.png")}
                    style={styles.iconSmall}
                  />
                  <Text style={styles.info}>{item.website}</Text>
                </View>
              </View>
            </ImageBackground>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    right: 0,
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    fontFamily: "Raleway-Bold",
  },
  viewAll: {
    fontSize: 14,
    color: "#1F1F1F",
    fontWeight: "600",
    fontFamily: "Raleway-Bold",
  },
  imageBackground: {
    width: 270,
    height: 225,
    borderRadius: 10,
    marginRight: 10,
    padding: 15,
  },
  card: {
    width: 270,
    height: 192,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  clinicImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    backgroundColor: "#1F1F1F",
    padding: 5,
    borderRadius: 4,
    alignSelf: "flex-start",
    width: 90,
    height: 26,
    alignItems: "center",
    justifyContent: "center",
    right: 0,
  },
  ratingText: {
    color: "white",
    fontSize: 12,
    marginLeft: 5,
    fontWeight: "500",
  },
  name: {
    fontWeight: "bold",
    marginTop: 5,
    fontSize: 16,
  },
  info: {
    color: "gray",
    marginTop: 3,
    marginLeft: 5,
  },
  overlayImage: {
    width: 270,
    height: 192,
    position: "absolute",
    borderRadius: 10,
    top: -15,
    right: -15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
    padding: 3,
  },
  iconWithText: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12, // adds space between icon-text groups
  },
  iconSmall: {
    width: 16,
    height: 16,
    resizeMode: "contain",
  },
});