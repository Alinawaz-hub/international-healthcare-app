import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Button from "@/components/button";
import HomeHeader from "@/components/user-flow/home-header";
import { Colors } from "@/constants/Colors";

const MedicalInfoScreen = () => {
  const [activeTab, setActiveTab] = useState<"info" | "reports">("info");

  return (
    <View style={styles.container}>
      <HomeHeader
        showSearch={false}
        showFilter={false}
        showEdit={false}
        showShare={false}
        showDownload={true}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Heading */}
        <Text style={styles.heading}>Medical Info</Text>

        {/* Tabs */}
        <View style={styles.tabRow}>
          <TouchableOpacity
            onPress={() => setActiveTab("info")}
            style={[styles.tab, activeTab === "info" && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "info" && styles.activeTabText,
              ]}
            >
              Medical Info
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("reports")}
            style={[styles.tab, activeTab === "reports" && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "reports" && styles.activeTabText,
              ]}
            >
              Reports
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        {activeTab === "info" ? (
          <View style={styles.infoSection}>
            <Text style={styles.label}>Is it your first therapy?</Text>
            <Text style={styles.value}>No</Text>

            <Text style={styles.label}>Are you taking any medicine?</Text>
            <Text style={styles.value}>No</Text>

            <Text style={styles.label}>When was your last visit?</Text>
            <Text style={styles.value}>About a week ago</Text>

            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.label}>Pre condition</Text>
                <Text style={styles.value}>Normal</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.label}>Current condition</Text>
                <Text style={styles.value}>Serious</Text>
              </View>
            </View>

            <Text style={styles.label}>How can a doctor help you?</Text>
            <Text style={styles.value}>
              Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa
              mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.
            </Text>

            <Text style={styles.label}>Invoice will be sent to</Text>
            <Text style={styles.value}>alexander39@gmail.com</Text>

            <View style={{ marginTop: 30 }}>
              <Button title="Edit Medical Details" type="default" />
              <Button
                title="View History"
                type="default"
                style={styles.outlineButton}
                textStyle={{ color: "#000" }}
              />
            </View>
          </View>
        ) : (
          <View style={styles.infoSection}>
            <Text style={styles.value}>No reports available.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default MedicalInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111",
    marginTop: 20,
    marginBottom: 20,
  },
  tabRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  tab: {
    height: 42,
    minWidth: 112,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    borderRadius: 80,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    color: "#777",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#fff",
  },
  infoSection: {
    gap: 15,
  },
  label: {
    fontSize: 14,
    color: "#888",
  },
  value: {
    fontSize: 16,
    color: "#111",
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    width: "48%",
  },
  outlineButton: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
  },
});
