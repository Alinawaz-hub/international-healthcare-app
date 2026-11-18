import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Input from "@/components/input";
import Button from "@/components/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Colors } from "@/constants/Colors";

const schema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
});

const ResetPassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const onSubmit = (data: any) => {
    console.log("✅ Reset Link Sent to:", data.email);
    router.push({
      pathname: "/auth/verify-code",
      params: { email: data.email },
    });
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
            maskElement={<Text style={styles.title}>Reset your password</Text>}
          >
            <LinearGradient
              colors={[Colors.primary, Colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={[styles.title, { opacity: 0 }]}>
                Reset your password
              </Text>
            </LinearGradient>
          </MaskedView>
        </View>

        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>
            Kindly provide your email address to reset your account password.
          </Text>
        </View>

        {/* Email Input */}
        <View style={{ marginTop: 20, width: "100%" }}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Email"
                keyboardType="email-address"
                value={value}
                onChangeText={onChange}
                error={errors.email?.message}
              />
            )}
          />
        </View>

        {/* Submit Button */}
        <View style={{ marginTop: 40, width: "100%" }}>
          <Button
            title="Send Reset Link"
            type="default"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ResetPassword;

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
    width: 280,
    alignItems: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#525252",
    textAlign: "center",
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    alignSelf: "flex-start",
    left: 20,
  },
});