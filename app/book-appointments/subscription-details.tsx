import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import { router } from "expo-router";
import Button from "@/components/button";
import { Ionicons } from "@expo/vector-icons";
import Input from "@/components/input";
import Header from "@/components/user-flow/header";
import { Colors } from "@/constants/Colors";

export default function ReviewAppointmentScreen() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const nameRef = useRef<TextInput>(null);
  const cardNumberRef = useRef<TextInput>(null);
  const expDateRef = useRef<TextInput>(null);
  const cvvRef = useRef<TextInput>(null);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [files, setFiles] = useState<
    { name: string; size: number; uri: string }[]
  >([]);

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

  const paymentIcons = [
    require("@/assets/images/shoppay.png"),
    require("@/assets/images/visa.png"),
    require("@/assets/images/master.png"),
    require("@/assets/images/applepay.png"),
    require("@/assets/images/googlepay.png"),
    require("@/assets/images/amex.png"),
  ];

  const handleCardSelection = (cardId: string) => {
    setSelectedCard(selectedCard === cardId ? null : cardId);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.container}>
        {/* Header */}
        <Header
          showBack={true}
          showSearch={false}
          showFilter={false}
          showAdd={false}
          showDownload={false}
        />

        {/* Title */}
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>Select your payment method</Text>
          <Text style={styles.description}>
            Provide the information below to add your new payment method.
          </Text>
        </View>

        {/* Payment Cards */}
        {cards.map((card) => (
          <View key={card.id} style={styles.cardContainer}>
            <TouchableOpacity
              style={styles.cardButton}
              onPress={() => handleCardSelection(card.id)}
            >
              <Image source={card.image} style={styles.cardImage} />
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.cardText}>Ending in: {card.last4}</Text>
                <Text style={styles.cardText1}>Exp: {card.exp}</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <TouchableOpacity
                  style={[
                    styles.radioButton,
                    selectedCard === card.id && styles.radioButtonSelected,
                  ]}
                  onPress={() => handleCardSelection(card.id)}
                >
                  {selectedCard === card.id && (
                    <View style={styles.radioInnerCircle} />
                  )}
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        ))}

        {/* Add New Payment Method */}
        <TouchableOpacity
          style={{ gap: 10, flexDirection: "row", marginTop: 25 }}
          onPress={() => setModalVisible(true)}
        >
          <View>
            <Ionicons name="add" size={25} color={Colors.primary} />
          </View>
          <View>
            <Text style={styles.addNewPaymentText}>Add New Payment Method</Text>
          </View>
        </TouchableOpacity>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            title="Continue"
            type="default"
            onPress={() =>
              router.push("/appointment-details/appointment-details")
            }
            style={{
              width: "100%",
              height: 48,
              backgroundColor: Colors.primary,
              marginBottom: 10,
            }}
          />
          <Button
            title="Cancel"
            type="default"
            onPress={() => router.back()}
            style={{
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "#E0E0E0",
              width: "100%",
            }}
            textStyle={{ color: "black" }}
          />
        </View>

        {/* Add Payment Method Modal */}
        <Modal
          isVisible={isModalVisible}
          onSwipeComplete={toggleModal}
          swipeDirection="down"
          onBackdropPress={toggleModal}
          style={styles.modal}
          propagateSwipe={true}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <ScrollView contentContainerStyle={styles.modalContent}>
              <View style={styles.indicator} />
              <Text style={styles.modalHeading}>Add New Payment Method</Text>
              <Text style={styles.modalDescription}>
                Provide the information below to add your new payment method.
              </Text>

              {/* Payment Icons Row */}
              <View style={styles.paymentIconsContainer}>
                {paymentIcons.map((icon, index) => (
                  <Image key={index} source={icon} style={styles.paymentIcon} />
                ))}
              </View>

              {/* Input Fields */}
              <View style={styles.rowSpacing}>
                <Input
                  ref={nameRef}
                  placeholder="Name on Card"
                  returnKeyType="next"
                  onSubmitEditing={() => cardNumberRef.current?.focus()}
                />
              </View>
              <View style={styles.rowSpacing}>
                <Input
                  ref={cardNumberRef}
                  placeholder="Card no."
                  returnKeyType="next"
                  onSubmitEditing={() => expDateRef.current?.focus()}
                />
              </View>
              <View style={[styles.row1, styles.rowSpacing]}>
                <Input placeholder="Exp. date" size="half" />
                <Input placeholder="CVV Cdoe" size="half" />
              </View>

              {/* Buttons */}
              <Button
                title="Add Payment Method"
                type="default"
                onPress={() => {
                  setModalVisible(false);
                  setTimeout(() => {
                    router.push("/appointment-details/appointment-details");
                  }, 300);
                }}
                style={{
                  width: "100%",
                  height: 48,
                  backgroundColor: Colors.primary,
                  marginBottom: 10,
                  marginTop: 5,
                }}
              />
              <Button
                title="Cancel"
                type="default"
                onPress={() => setModalVisible(false)}
                style={{
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderColor: "#E0E0E0",
                  width: "100%",
                }}
                textStyle={{ color: "black" }}
              />
            </ScrollView>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
    marginTop: 5,
  },
  headerContainer: {
    marginTop: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    width: 190,
    fontFamily: "Raleway-Bold",
  },
  description: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
    width: 270,
    marginTop: 5,
    fontFamily: "OpenSans-Regular",
  },
  indicator: {
    width: 140,
    height: 6,
    backgroundColor: "#1F1F1F",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 12,
    top: -10,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 160,
    paddingBottom: 20,
  },
  continueButton: {
    width: "100%",
    height: 48,
    backgroundColor: "#00EF99",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  cancelButton: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#A8A8A8",
    marginTop: 10,
  },
  cardContainer: {
    marginTop: 10,
    alignItems: "flex-start",
    backgroundColor: "rgb(250, 250, 250)",
    borderRadius: 8,
    padding: 10,
  },
  cardButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
  },
  cardImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginRight: 15,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  cardText1: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#b5b3b3",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#525252",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    backgroundColor: "white",
  },
  radioInnerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },

  modal: {
    justifyContent: "flex-end",
    margin: 10,
    marginTop: 45,
    marginBottom: 5,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 30,
    width: "100%",
    alignSelf: "center",
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 5,
    fontFamily: "Raleway-Bold",
  },
  modalDescription: {
    fontSize: 16,
    color: "gray",
    textAlign: "left",
    marginBottom: 15,
    fontFamily: "OpenSans-Regular",
  },
  paymentIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  paymentIcon: {
    width: 50,
    height: 32,
    resizeMode: "contain",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "48%",
  },

  addPaymentButton: {
    backgroundColor: "#00EF99",
    width: "100%",
    marginBottom: 10,
    marginTop: 20,
  },
  cancelModalButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#A8A8A8",
    width: "100%",
  },
  addNewPaymentText: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.primary,
    top: 5,
    fontFamily: "Raleway-Bold",
  },
  row1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  rowSpacing: {
    marginBottom: 12,
  },
});
