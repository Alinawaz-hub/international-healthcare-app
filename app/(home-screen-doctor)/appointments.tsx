import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import UpcomingAppointments from "@/components/doctor-flow/upcomingappointments";
import HomeHeaderDoc from "@/components/doctor-flow/home-header-doctor";
import { Colors } from "@/constants/Colors";

const { width } = Dimensions.get("window");

const categories = ["Upcoming", "Attended", "Cancelled", "Draft"];

const Appointmentsdoc = () => {
  const [selectedCategory, setSelectedCategory] = useState("Upcoming");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <View style={styles.screen}>
      <HomeHeaderDoc
        showSearch={true}
        showFilter={true}
        showAdd={true}
        onSearch={(val) => setSearchTerm(val)}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.container}>
            <Text style={styles.heading}>Appointment Details</Text>
            <Text style={styles.description}>
              Appointments which you need to attend in your coming days.
            </Text>

            <FlatList
              data={categories}
              horizontal
              keyExtractor={(item) => item}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryList}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.categoryItem,
                    selectedCategory === item && styles.selectedCategory,
                  ]}
                  onPress={() => setSelectedCategory(item)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === item && styles.selectedText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        }
        data={[]} // Replace with real data if needed
        renderItem={null}
        ListFooterComponent={
          <View style={styles.footer}>
            <UpcomingAppointments showHeader={false} />
          </View>
        }
      />
    </View>
  );
};

export default Appointmentsdoc;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
  },
  container: {
    marginTop: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    marginBottom: 5,
    fontFamily: "Raleway-Bold",
  },
  description: {
    fontSize: 15,
    color: "gray",
    marginBottom: 20,
    maxWidth: "90%",
    fontFamily: "OpenSans-Regular",
  },
  categoryList: {
    paddingBottom: 10,
  },
  categoryItem: {
    minWidth: width * 0.22,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#fafafa",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 80,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 14,
    color: "black",
    fontWeight: "600",
  },
  selectedCategory: {
    backgroundColor: Colors.primary,
  },
  selectedText: {
    color: "white",
  },
  footer: {
    padding: 15,
  },
});
