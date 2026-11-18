import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import Header from "@/components/header-user";
import Button from "@/components/button";
import { router } from "expo-router";
import Modal from "react-native-modal";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

// Define the expected route parameters
type RouteParams = {
  planTitle: string;
  planPrice: string;
};

// Card data for payment options
const cards = [
  {
    id: "mastercard",
    image: require("@/assets/images/mastercard.png"),
    last4: "5643",
    exp: "05/26",
  },
  {
    id: "visacard",
    image: require("@/assets/images/visacard.png"),
    last4: "2345",
    exp: "08/27",
  },
  {
    id: "pay",
    image: require("@/assets/images/pay.png"),
    last4: "9876",
    exp: "11/25",
  },
];

// Screen Component
const SubscriptionDetailsUser = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: RouteParams }, "params">>();

  // Get the selected plan details (default values as fallback)
  const planTitle = route.params?.planTitle || "Basic Plan";
  const planPrice = route.params?.planPrice || "$49.00 USD";

  // State for modal visibility & selected payment method
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [files, setFiles] = useState<
    { name: string; size: number; uri: string }[]
  >([]);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <Header
        showBack={true}
        showSearch={false}
        showFilter={false}
        showAdd={false}
        showDownload={false}
      />

      {/* Plan Title */}
      <Text style={styles.planTitle}>{planTitle}</Text>

      {/* Subtitle */}
      <Text style={styles.planReady}>Your Plan Is Ready!</Text>
      <Text style={styles.planDescription}>
        Try 7 days free, then {planPrice}/mo. Cancel anytime.
      </Text>

      {/* Features Section */}
      <Text style={styles.featuresTitle}>Features</Text>
      {featuresList.map((feature, index) => (
        <View key={index} style={styles.featureItem}>
          <Ionicons name="shield-checkmark-sharp" size={18} color={Colors.primary} />
          <Text style={styles.featureText}>{feature}</Text>
        </View>
      ))}

      {/* Subscribe Button */}
      <Button
        title="Try free & subscribe"
        type="default"
        style={styles.subscribeButton}
        onPress={() => setModalVisible(true)}
      />

      {/* Payment Modal */}
      <Modal
        isVisible={isModalVisible}
        onSwipeComplete={toggleModal}
        swipeDirection="down"
        onBackdropPress={toggleModal}
        style={styles.modal}
        propagateSwipe={true}
      >
        {/* Close modal when clicking outside */}
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.modalContent}>
                {/* Modal Header */}
                <View style={styles.indicator} />
                <Text style={styles.modalTitle}>Payment Details</Text>
                <Text style={styles.modalSubtitle}>
                  Select from existing payment methods or add a new one.
                </Text>

                {/* Payment Methods */}
                {cards.map((card) => (
                  <TouchableOpacity
                    key={card.id}
                    style={[
                      styles.cardContainer,
                      selectedCard === card.id && styles.selectedCard,
                    ]}
                    onPress={() => setSelectedCard(card.id)}
                  >
                    <Image source={card.image} style={styles.cardIcon} />
                    <View style={styles.cardDetails}>
                      <Text style={styles.cardText}>
                        Ending in: {card.last4}
                      </Text>
                      <Text style={styles.cardExp}>Exp: {card.exp}</Text>
                    </View>
                    <Ionicons
                      name={
                        selectedCard === card.id
                          ? "radio-button-on"
                          : "radio-button-off"
                      }
                      size={20}
                      color={
                        selectedCard === card.id ? Colors.primary : "#525252"
                      }
                    />
                  </TouchableOpacity>
                ))}

                {/* Add New Payment Method */}
                <TouchableOpacity
                  style={styles.addPaymentButton}
                  onPress={() => {
                    setModalVisible(false); // Close modal before navigating
                    router.push("/subscription-user/new-payment");
                  }}
                >
                  <Text style={styles.addPaymentText}>
                    Add New Payment Method
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

// Features List
const featuresList = [
  "Book 10 appointments per month.",
  "100+ guided meditations on anxiety, stress, cardio and various specialists.",
  "Find clinics and Therapists nearby your current location and make appointment.",
  "Trackability of all the reports and appointments.",
  "Many of the other exclusive features.",
  "Make appointments for children's.",
];

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    marginTop: -8,
  },
  planTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
    marginTop: 15,
  },
  planReady: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginBottom: 5,
  },
  planDescription: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#525252",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  featureText: {
    fontSize: 14,
    color: "gray",
    marginLeft: 8,
  },
  subscribeButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 80,
    alignItems: "center",
    marginTop: 20,
    alignSelf: "center",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  indicator: {
    width: 140,
    height: 6,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 12,
    top: -10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 5,
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#525252",
    marginBottom: 15,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedCard: {
    // borderColor: "#06C167",
    // borderWidth: 2,
  },
  cardIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
    resizeMode: "contain",
  },
  cardDetails: {
    flex: 1,
  },
  cardText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  cardExp: {
    fontSize: 12,
    color: "gray",
  },
  addPaymentButton: {
    alignItems: "center",
    paddingVertical: 10,
  },
  addPaymentText: {
    color: Colors.primary,
    fontWeight: "bold",
  },
  swipeModal: {
    justifyContent: "flex-end",
    margin: 0, // Needed to cover the full screen without margins
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
});

export default SubscriptionDetailsUser;
