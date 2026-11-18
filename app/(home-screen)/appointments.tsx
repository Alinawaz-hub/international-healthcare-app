import Header from "@/components/user-flow/header";
import UpcomingAppointments from "@/components/user-flow/upcomingappointments";
import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const categories = ["Upcoming", "Attended", "Cancelled", "Draft"];

const Appointments = () => {
  const [selectedCategory, setSelectedCategory] = useState("Upcoming");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 15 }}>
      <Header
        showSearch={true}
        showFilter={true}
        showDownload={false}
        onSearch={(text) => setSearchTerm(text)}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Text style={styles.heading}>Appointment Details</Text>
            <Text style={styles.description}>
              Appointments which you need to attend in your coming days.
            </Text>

            <FlatList
              data={categories}
              horizontal
              keyExtractor={(item) => item}
              showsHorizontalScrollIndicator={false}
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
          </>
        }
        data={[]} // This FlatList is only used for the header and footer
        renderItem={null}
        ListFooterComponent={
          <View style={{ padding: 15 }}>
            {selectedCategory === "Upcoming" && (
              <UpcomingAppointments
                showHeader={false}
                searchTerm={searchTerm}
              />
            )}
            {/* You can add components for Attended, Cancelled, Draft here */}
          </View>
        }
      />
    </View>
  );
};

export default Appointments;

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 5,
    fontFamily: "Raleway-Bold",
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
    width: 300,
    fontFamily: "OpenSans-Regular",
  },

  categoryItem: {
    width: 93,
    height: 42,
    backgroundColor: "#fafafa",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 80,
    marginRight: 10,
  },
  categoryText: { fontSize: 14, color: "black", fontWeight: "600" },

  selectedCategory: { backgroundColor: Colors.primary },
  selectedText: { color: "white" },
});
