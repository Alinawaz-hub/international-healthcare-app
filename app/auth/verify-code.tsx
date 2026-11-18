import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const VerifyCode = () => {
  const inputRefs: React.RefObject<TextInput>[] = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  // Track if each input has a value or is focused
  const [inputValues, setInputValues] = useState<string[]>(["", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleInputChange = (text: string, index: number) => {
    const updatedValues = [...inputValues];
    updatedValues[index] = text;
    setInputValues(updatedValues);

    if (text.length === 1 && index < inputRefs.length - 1) {
      // Check if the next ref is not null and then focus it
      const nextInputRef = inputRefs[index + 1];
      if (nextInputRef.current) {
        nextInputRef.current.focus();
      }
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  const handleBackspace = (text: string, index: number) => {
    if (text.length === 0 && index > 0) {
      // Move focus back to the previous input if backspace is pressed
      const prevInputRef = inputRefs[index - 1];
      if (prevInputRef.current) {
        prevInputRef.current.focus();
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backarrow}
        >
          <Ionicons name="chevron-back" size={25} color="#212A38" />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.logo}
          />
        </View>

        <View style={styles.titleContainer}>
          <MaskedView
            maskElement={<Text style={styles.title}>Verify your code</Text>}
          >
            <LinearGradient
              colors={[Colors.primary, Colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={[styles.title, { opacity: 0 }]}>
                Verify your email!
              </Text>
            </LinearGradient>
          </MaskedView>
        </View>

        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>
            Verification code has been sent to your email{" "}
            <Text style={{ color: "#1F1F1F", fontWeight: "500", fontSize: 16 }}>
              laslie.alexander@gmail.com
            </Text>{" "}
            Please enter your verification code to verify your identity.
          </Text>
        </View>

        <View>
          <TouchableOpacity>
            <Text style={{ color: "#1F1F1F", fontWeight: "600", fontSize: 16 }}>
              Resend Email
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", gap: 10, marginTop: 40 }}>
          {[0, 1, 2, 3].map((index) => (
            <TextInput
              key={index}
              ref={inputRefs[index]}
              style={[
                styles.input,
                {
                  borderColor:
                    inputValues[index] || focusedIndex === index
                      ? Colors.primary
                      : Colors.secondary,
                  backgroundColor:
                    focusedIndex === index ? Colors.secondary : "transparent",
                },
              ]}
              maxLength={1}
              keyboardType="numeric"
              placeholder=""
              placeholderTextColor="#9E9E9E"
              onChangeText={(text) => {
                handleInputChange(text, index);
                handleBackspace(text, index);
              }}
              onFocus={() => handleFocus(index)}
              onBlur={handleBlur}
            />
          ))}
        </View>

        <View style={{ marginTop: 60 }}>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>
              If you didn’t receive the code then click on the button below.
            </Text>
          </View>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => router.push("/auth/new-password")}
            style={{ top: -10 }}
          >
            <Text style={{ color: "#1F1F1F", fontWeight: "600", fontSize: 16 }}>
              Resend Code
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 50,
  },
  backarrow: {
    top: 77,
    right: 150,
  },
  logoContainer: {
    width: 327,
    alignItems: "center",
    top: 40,
  },
  logo: {
    width: 200,
    height: 80,
    resizeMode: "contain",
    marginBottom: 60,
  },
  titleContainer: {
    width: 200,
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 40,
    color: "black",
    marginBottom: 10,
  },
  subtitleContainer: {
    width: 320,
    alignItems: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#525252",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: 70,
    height: 48,
    borderRadius: 80,
    borderWidth: 1,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.secondary,
    paddingVertical: 0,
    paddingHorizontal: 0,
    includeFontPadding: false,
  },
});

export default VerifyCode;