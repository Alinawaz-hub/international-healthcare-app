import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import HomeHeader from "@/components/user-flow/home-header";

const servicesData = [
  { id: "1", title: "Life Coaching Therapy Services" },
  { id: "2", title: "Mental Health Therapy" },
  { id: "3", title: "Support Group Therapy" },
  { id: "4", title: "Mindfulness & Stress Reduction" },
  { id: "5", title: "Life Coaching Therapy Services" },
  { id: "6", title: "Support Group Therapy" },
];

const Services = () => {
  return (
    <View style={styles.container}>
      <HomeHeader
        showSearch={true}
        showFilter={true}
        showEdit={false}
        showShare={false}
        showDownload={false}
      />

      <Text style={styles.heading}>Services</Text>
      <Text style={styles.description}>
        All of the prescriptions received by the doctors from the start you’ve
        registered till date.
      </Text>

      <FlatList
        data={servicesData}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingVertical: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.doctorCount}>23 Doctors</Text>
            <Text style={styles.serviceTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    width: "48%",
  },
  doctorCount: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
});