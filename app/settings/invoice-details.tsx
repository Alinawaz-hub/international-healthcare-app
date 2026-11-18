import HomeHeader from "@/components/user-flow/home-header";
import { Colors } from "@/constants/Colors";
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const invoiceData = {
  id: "5646543",
  billTo: {
    name: "Parkway Good",
    address:
      "Street 1122 Block D United States\nBlock A USA\nNew York. NY 1001",
  },
  shipTo: {
    name: "Parkway Good",
    address:
      "Street 1122 Block D United States\nBlock A USA\nNew York. NY 1001",
  },
  services: [
    {
      id: "01",
      service: "Skin care",
      amount: "$199.99",
      tax: "$20.00",
      total: "$219.99",
    },
  ],
  summary: {
    subTotal: "$219.99",
    cardFee: "$00.00",
    grandTotal: "$219.00",
  },
};

const InvoiceDetails = () => {
  return (
    <View style={styles.container}>
      <HomeHeader
        showSearch={false}
        showFilter={false}
        showEdit={false}
        showShare={false}
        showDownload={true}
      />

      <Text style={styles.heading}>Invoice Details</Text>

      <View style={styles.invoiceIdContainer}>
        <Text style={styles.invoiceIdText}>ID: {invoiceData.id}</Text>
      </View>

      {/* Bill To / Ship To */}
      <View style={styles.detailsCard}>
        <View style={styles.addressBlock}>
          <Text style={styles.boldText}>Bill To</Text>
          <Text style={styles.detailText}>{invoiceData.billTo.name}</Text>
          <Text style={styles.detailText}>{invoiceData.billTo.address}</Text>
        </View>

        <View style={styles.addressBlock}>
          <Text style={styles.boldText}>Ship To</Text>
          <Text style={styles.detailText}>{invoiceData.shipTo.name}</Text>
          <Text style={styles.detailText}>{invoiceData.shipTo.address}</Text>
        </View>
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>#No.</Text>
        <Text style={styles.headerText}>Service</Text>
        <Text style={styles.headerText}>Amount</Text>
        <Text style={styles.headerText}>Tax</Text>
        <Text style={styles.headerText}>Total</Text>
      </View>

      <FlatList
        data={invoiceData.services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.cellText}>{item.id}</Text>
            <Text style={styles.cellText}>{item.service}</Text>
            <Text style={styles.cellText}>{item.amount}</Text>
            <Text style={styles.cellText}>{item.tax}</Text>
            <Text style={styles.cellText}>{item.total}</Text>
          </View>
        )}
      />

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          Sub total: {invoiceData.summary.subTotal}
        </Text>
        <Text style={styles.summaryText}>
          Card fee: {invoiceData.summary.cardFee}
        </Text>
        <Text style={styles.grandTotal}>
          Grand total: {invoiceData.summary.grandTotal}
        </Text>
      </View>
    </View>
  );
};

export default InvoiceDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    marginBottom: 10,
    fontFamily: "Raleway-Bold",
    marginTop: 20,
  },
  invoiceIdContainer: {
    backgroundColor: Colors.primary,
    padding: 6,
    borderRadius: 80,
    width: 100,
    alignItems: "center",
    marginBottom: 10,
  },
  invoiceIdText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  detailsCard: {
    backgroundColor: "#F9F9F9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  addressBlock: {
    marginBottom: 10,
  },
  boldText: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Raleway-Bold",
    marginBottom: 2,
  },
  detailText: {
    fontSize: 14,
    color: "#4A4A4A",
    fontFamily: "OpenSans-Regular",
    marginBottom: 3,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F3F3F3",
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    flex: 1,
    textAlign: "center",
    fontFamily: "OpenSans-Bold",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
  },
  cellText: {
    fontSize: 14,
    color: "#4A4A4A",
    flex: 1,
    textAlign: "center",
    fontFamily: "OpenSans-Regular",
  },
  summaryContainer: {
    marginTop: 20,
    marginBottom: 250,
  },
  summaryText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#000",
    textAlign: "right",
    fontFamily: "OpenSans-Regular",
  },
  grandTotal: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    textAlign: "right",
    fontFamily: "Raleway-Bold",
    marginTop: 5,
  },
});
