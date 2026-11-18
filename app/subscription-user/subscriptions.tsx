import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import { Colors } from "@/constants/Colors";

const SubscriptionUser = () => {
  const [selectedPlan, setSelectedPlan] = useState("Basic");
  const [activeTab, setActiveTab] = useState("Monthly");

  const monthlyPlans = [
    {
      id: "Basic",
      title: "Basic",
      price: "$49.00 USD",
      description: "Per month, billed yearly",
      benefits: [
        "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
        "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
        "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
      ],
    },
    {
      id: "Professional",
      title: "Professional",
      price: "$79.00 USD",
      description: "Per month, billed yearly",
      benefits: [
        "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
        "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
        "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
      ],
    },
  ];

  const yearlyPlans = [
    {
      id: "Basic",
      title: "Basic",
      price: "$499.00 USD",
      description: "Billed annually",
      benefits: [
        "Save 20% compared to monthly billing.",
        "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
        "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
      ],
    },
    {
      id: "Professional",
      title: "Professional",
      price: "$799.00 USD",
      description: "Billed annually",
      benefits: [
        "Save 20% compared to monthly billing.",
        "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
        "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
      ],
    },
  ];

  const plans = activeTab === "Monthly" ? monthlyPlans : yearlyPlans;

  return (
    <ScrollView
      style={{ backgroundColor: "white" }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <View style={[styles.titleContainer]}>
          <MaskedView
            maskElement={<Text style={styles.title}>Plans & pricing</Text>}
          >
            <LinearGradient
              colors={[Colors.primary, Colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={[styles.title, { opacity: 0 }]}>
                Plans & pricing
              </Text>
            </LinearGradient>
          </MaskedView>
        </View>
        <Text style={styles.subheading}>
          Select your required subscription plan or continue with percentage
          charges.
        </Text>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "Monthly" && styles.activeTab]}
            onPress={() => setActiveTab("Monthly")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Monthly" && styles.activeTabText,
              ]}
            >
              Monthly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "Yearly" && styles.activeTab]}
            onPress={() => setActiveTab("Yearly")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Yearly" && styles.activeTabText,
              ]}
            >
              Yearly
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/(home-screen)/home-page")}
          style={styles.commissionedContainer}
        >
          <Text style={styles.commissionedText}>
            Or Continue As One Time Payment
          </Text>
          <Ionicons name="information-circle-outline" size={20} color="black" />
        </TouchableOpacity>

        {/* Subscription Plans */}
        <FlatList
          data={plans}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedPlan(item.id);
                router.push("/subscription-user/subscription-details");
              }}
              style={[
                styles.planCard,
                selectedPlan === item.id && styles.selectedCard,
              ]}
            >
              <View style={styles.planHeader}>
                <Text
                  style={[
                    styles.planTitle,
                    selectedPlan === item.id && styles.selectedTitle,
                  ]}
                >
                  {item.title}
                </Text>
                <Ionicons
                  name={
                    selectedPlan === item.id
                      ? "radio-button-on"
                      : "radio-button-off"
                  }
                  size={20}
                  color={selectedPlan === item.id ? Colors.primary : "#525252"}
                />
              </View>
              <Text style={styles.planPrice}>{item.price}</Text>
              <Text style={styles.planDescription}>{item.description}</Text>

              {item.benefits.map((benefit, index) => (
                <View key={index} style={styles.benefitItem}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={16}
                    color={Colors.primary}
                  />
                  <Text style={styles.benefitText}>{benefit}</Text>
                </View>
              ))}
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
};
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  titleContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 40,
    color: "black",
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 5,
    marginTop: 50,
    fontFamily: "Raleway-Regular",
  },
  subheading: {
    fontSize: 16,
    textAlign: "center",
    color: "gray",
    marginBottom: 20,
    fontWeight: "400",
    paddingLeft: 20,
    paddingRight: 20,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    alignSelf: "center",
    width: 320,
    padding: 5,
    height: 50,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 20,
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
  },
  activeTabText: {
    color: "white",
  },
  commissionedContainer: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  commissionedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
    marginRight: 5,
  },
  planCard: {
    backgroundColor: "#F0F0F0",
    padding: 20,
    borderRadius: 10,
    marginVertical: 8,
    width: width * 0.85,
    minHeight: 220,
    justifyContent: "center",
    alignSelf: "center",
  },
  selectedCard: {
    backgroundColor: Colors.tertiary,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  planHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  planTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#9E9E9E",
  },
  selectedTitle: {
    color: "#9E9E9E",
  },
  planPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
    fontFamily: "Raleway-Bold",
  },
  planDescription: {
    fontSize: 14,
    color: "gray",
    marginBottom: 10,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    marginTop: 10,
  },
  benefitText: {
    fontSize: 15,
    marginLeft: 5,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 50,
  },
});

export default SubscriptionUser;
