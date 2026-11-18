import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from "react-native";
import React, { useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Input from "@/components/input";
import Button from "@/components/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import PasswordInput from "@/components/password-input";
import { Colors } from "@/constants/Colors";

const schema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const NewPassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const confirmPasswordRef = useRef<TextInput>(null);

  const onSubmit = (data: any) => {
    console.log("✅ Password updated successfully:", data.password);
    alert("✅ Password updated successfully!");
    router.push("/");
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
            maskElement={<Text style={styles.title}>New password</Text>}
          >
            <LinearGradient
              colors={[Colors.primary, Colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={[styles.title, { opacity: 0 }]}>New password</Text>
            </LinearGradient>
          </MaskedView>
        </View>

        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>
            Enter your new password below to reset your account password.
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <PasswordInput
                placeholder="New Password"
                value={value}
                onChangeText={onChange}
                returnKeyType="next"
                onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                error={errors.password?.message}
              />
            )}
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <PasswordInput
                ref={confirmPasswordRef}
                placeholder="Confirm Password"
                value={value}
                onChangeText={onChange}
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
                error={errors.confirmPassword?.message}
              />
            )}
          />
        </View>

        <View style={{ marginTop: 40 }}>
          <Button
            title="Update Password"
            type="default"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default NewPassword;

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