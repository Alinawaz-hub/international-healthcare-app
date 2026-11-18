import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import HomeHeader from "@/components/user-flow/home-header";
import { Colors } from "@/constants/Colors";

const invoicesData = [
  {
    id: "5646543",
    status: "Paid",
    service: "Service Name",
    amount: "$25.00",
    date: "Jan 12, 2025",
  },
  {
    id: "5646543",
    status: "Paid",
    service: "Service Name",
    amount: "$25.00",
    date: "Jan 12, 2025",
  },
];

const Invoices = () => {
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
      <Text style={styles.title}>Invoices</Text>
      <Text style={styles.subtitle}>
        Search for the doctors by your need or services.
      </Text>

      {/* Invoice List */}
      <FlatList
        data={invoicesData}
        keyExtractor={(item, index) => item.id + index}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push("/settings/invoice-details")} // You can update this route
            style={styles.card}
          >
            {/* Header Row */}
            <View style={styles.cardHeader}>
              <View style={styles.idBadge}>
                <Text style={styles.idText}>ID: {item.id}</Text>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>

            {/* Service Block */}
            <View style={styles.serviceBox}>
              <Text style={styles.serviceLabel}>Service</Text>
              <Text style={styles.serviceText}>{item.service}</Text>
            </View>

            {/* Amount & Date */}
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Amount:</Text> {item.amount}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Paid on:</Text> {item.date}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Invoices;

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
    marginBottom: 6,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#F8F8F8",
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  idBadge: {
    backgroundColor: Colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 80,
    height: 25,
    justifyContent: "center",
  },
  idText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  statusBadge: {
    backgroundColor: Colors.tertiary,
    height: 25,
    paddingHorizontal: 12,
    borderRadius: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  statusText: {
    fontSize: 12,
    color: "black",
    fontWeight: "bold",
  },
  serviceBox: {
    backgroundColor: "#EAEAEA",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  serviceLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  serviceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  detailText: {
    fontSize: 14,
    color: "#333",
    marginTop: 4,
  },
  detailLabel: {
    fontWeight: "bold",
  },
});
