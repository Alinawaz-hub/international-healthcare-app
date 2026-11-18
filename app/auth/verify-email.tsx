import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

export default function verifyemail() {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backarrow}>
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
          maskElement={<Text style={styles.title}>Verify your email!</Text>}
        >
          <LinearGradient
            colors={["#1F1F1F", "#1F1F1F"]}
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
          A verification link has been sent to your email address. Please click
          on that link to verify your identity to continue using Health Direct
          services.
        </Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity>
          <Text style={{ color: Colors.primary, fontWeight: "700" }}>
            Resend Email
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
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
    width: 100,
    height: 50,
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
    width: 280,
    alignItems: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#525252",
    textAlign: "center",
    marginBottom: 20,
  },
});