import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useRouter } from "expo-router";
import Header from "@/components/header-user";
import Input from "@/components/input";
import Button from "@/components/button";
import { Colors } from "@/constants/Colors";

const paymentIcons = [
  require("@/assets/images/shoppay.png"),
  require("@/assets/images/visa.png"),
  require("@/assets/images/master.png"),
  require("@/assets/images/applepay.png"),
  require("@/assets/images/googlepay.png"),
  require("@/assets/images/amex.png"),
];

const NewPaymentUser = () => {
  const router = useRouter();
  const nameRef = useRef<TextInput>(null);
  const cardNumberRef = useRef<TextInput>(null);
  const expDateRef = useRef<TextInput>(null);
  const cvvRef = useRef<TextInput>(null);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        {/* Back Button */}
        <Header
          showBack={true}
          showSearch={false}
          showFilter={false}
          showAdd={false}
          showDownload={false}
        />

        {/* Title & Subtitle */}
        <Text style={styles.title}>Add New Payment Method</Text>
        <Text style={styles.subtitle}>
          Provide the information below to add your new payment method.
        </Text>

        {/* Payment Icons */}
        <View style={styles.paymentIconsContainer}>
          {paymentIcons.map((icon, index) => (
            <Image key={index} source={icon} style={styles.paymentIcon} />
          ))}
        </View>

        {/* Input Fields */}
        <Input
          ref={nameRef}
          placeholder="Name on Card"
          returnKeyType="next"
          onSubmitEditing={() => cardNumberRef.current?.focus()}
          style={styles.inputSpacing}
        />
        <Input
          ref={cardNumberRef}
          placeholder="Card no."
          returnKeyType="next"
          keyboardType="numeric"
          onSubmitEditing={() => expDateRef.current?.focus()}
          style={styles.inputSpacing}
        />

        {/* Expiry Date & CVV - Fixed layout */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Input placeholder="Exp. date" size="half" />
          <Input placeholder="CVV Code" size="half" />
        </View>

        {/* Buttons */}
        <Button
          title="Add Payment Method"
          type="default"
          style={styles.addPaymentButton}
          onPress={() => router.push("/(home-screen)/home-page")}
        />
        <Button
          title="Cancel"
          type="default"
          style={{
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "#E0E0E0",
            width: "100%",
          }}
          textStyle={{ color: "black" }}
          onPress={() => router.back()}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    marginTop: -8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginTop: 15,
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
  },
  paymentIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  paymentIcon: {
    width: 50,
    height: 30,
    resizeMode: "contain",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10, // optional if RN 0.71+, otherwise use margin
  },
  halfInput: {
    width: "48%", // works fine too
  },
  inputSpacing: {
    marginBottom: 15,
  },
  inputHalf: {
    width: "48%",
  },
  addPaymentButton: {
    backgroundColor: Colors.primary,
    width: "100%",
    marginBottom: 10,
    marginTop: 30,
  },
  cancelModalButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    width: "100%",
  },
});

export default NewPaymentUser;
