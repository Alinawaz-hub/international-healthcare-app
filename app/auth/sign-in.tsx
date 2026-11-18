import React, { useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  useWindowDimensions,
  Dimensions,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Input from "@/components/input";
import Button from "@/components/button";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import PasswordInput from "@/components/password-input";
import { useFocusEffect } from "@react-navigation/native";
// import Modal from "react-native-modal"; // Commented out since modal is no longer used

const signInSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Enter a valid email address."),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters."),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function Signin() {
  const { width } = useWindowDimensions();
  const passwordInputRef = useRef<TextInput>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [role, setRole] = useState<"PATIENT" | "DOCTOR">("PATIENT");

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
  });

  useFocusEffect(
    useCallback(() => {
      reset();
      setSubmitError("");
    }, [reset])
  );

  const onSubmit = (data: SignInFormData) => {
    setSubmitError("");
    console.log("Form Submitted:", data);
    console.log("Role:", role);

    // Route based on selected role
    if (role === "PATIENT") {
      router.push("/(home-screen)/home-page");
    } else if (role === "DOCTOR") {
      router.push("/(home-screen-doctor)/home-page-doctor");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.logoContainer, { width: width * 0.9 }]}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={[styles.logo, { width: Math.min(width * 0.5, 200), height: Math.min(width * 0.2, 80) }]}
          />
        </View>
        <View style={[styles.titleContainer, { width: width * 0.9 }]}>
          <MaskedView
            maskElement={
              <Text style={[styles.title, { fontSize: Math.min(width * 0.1, 40) }]}>Login to your account!</Text>
            }
          >
            <LinearGradient
              colors={[Colors.primary, Colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={[styles.title, { opacity: 0, fontSize: Math.min(width * 0.1, 40) }]}>
                Login to your account!
              </Text>
            </LinearGradient>
          </MaskedView>
        </View>
        <View style={[styles.subtitleContainer, { width: width * 0.9 }]}>
          <Text style={[styles.subtitle, { fontSize: Math.min(width * 0.04, 16) }]}>
            Provide your credentials below to login to your account.
          </Text>
        </View>
        {/* Role Switcher Tab */}
        <View style={[styles.tabsContainer, { width: Math.min(width * 0.8, 320) }]}>
          <TouchableOpacity
            style={[styles.tab, role === "PATIENT" && styles.activeTab]}
            onPress={() => setRole("PATIENT")}
          >
            <Text
              style={[
                styles.tabText,
                role === "PATIENT" && styles.activeTabText,
                { fontSize: Math.min(width * 0.035, 14) }
              ]}
            >
              Patient
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, role === "DOCTOR" && styles.activeTab]}
            onPress={() => setRole("DOCTOR")}
          >
            <Text
              style={[
                styles.tabText,
                role === "DOCTOR" && styles.activeTabText,
                { fontSize: Math.min(width * 0.035, 14) }
              ]}
            >
              Doctor
            </Text>
          </TouchableOpacity>
        </View>
        {/* End Role Switcher Tab */}
        <View style={[styles.inputContainer, { width: width * 0.9 }]}>
          <Input
            placeholder="Email"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => passwordInputRef.current?.focus()}
            onChangeText={(text) =>
              setValue("email", text, { shouldValidate: true })
            }
            error={errors.email?.message}
          />

          <PasswordInput
            placeholder="Password"
            ref={passwordInputRef}
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
            onChangeText={(text: string) =>
              setValue("password", text, { shouldValidate: true })
            }
            error={errors.password?.message}
          />
        </View>
        <View style={[styles.row, { width: width * 0.9 }]}>
          <TouchableOpacity
            style={styles.rememberContainer}
            onPress={() => setRememberMe(!rememberMe)}
          >
            <View style={[styles.checkbox, rememberMe && styles.checked]}>
              {rememberMe && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={[styles.rememberText, { fontSize: Math.min(width * 0.035, 14) }]}>Remember me</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/auth/reset-password")}>
            <Text style={[styles.forgotText, { fontSize: Math.min(width * 0.035, 14) }]}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <Button
          title="Login To Account"
          type="default"
          style={[styles.loginButton, { width: width * 0.9 }]}
          onPress={handleSubmit(onSubmit, () => setSubmitError(""))}
        />
        {submitError ? (
          <Text style={styles.submitError}>{submitError}</Text>
        ) : null}
        <View style={[styles.orContainer, { width: width * 0.9 }]}>
          <View style={styles.line} />
          <Text style={[styles.orText, { fontSize: Math.min(width * 0.035, 14) }]}>or continue with</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.socialContainer}>
          <TouchableOpacity style={[styles.socialButton, { width: Math.min(width * 0.12, 48), height: Math.min(width * 0.12, 48) }]}>
            <Image
              source={require("@/assets/images/apple.png")}
              style={[styles.socialIcon, { width: Math.min(width * 0.06, 24), height: Math.min(width * 0.06, 24) }]}
            />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialButton, { width: Math.min(width * 0.12, 48), height: Math.min(width * 0.12, 48) }]}>
            <Image
              source={require("@/assets/images/google.png")}
              style={[styles.socialIcon, { width: Math.min(width * 0.06, 24), height: Math.min(width * 0.06, 24) }]}
            />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialButton, { width: Math.min(width * 0.12, 48), height: Math.min(width * 0.12, 48) }]}>
            <Image
              source={require("@/assets/images/facebook.png")}
              style={[styles.socialIcon, { width: Math.min(width * 0.06, 24), height: Math.min(width * 0.06, 24) }]}
            />
          </TouchableOpacity>
        </View>
        <Text style={[styles.signupText, { fontSize: Math.min(width * 0.035, 14) }]}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/auth/sign-up")}>
          <Text style={[styles.signupLink, { fontSize: Math.min(width * 0.035, 14) }]}>Sign Up For Free</Text>
        </TouchableOpacity>

        {/* Modal code commented out
        <Modal
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          onSwipeComplete={() => setModalVisible(false)}
          swipeDirection="down"
          style={styles.bottomModal}
          backdropOpacity={0.3}
        >
          <View style={styles.modalContainer}>
            <View style={styles.homeIndicator} />

            <Text style={styles.modalTitle}>Select Option</Text>
            <Text style={styles.modalSubtitle}>
              Select an option below to create your account.
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(false);
                  router.push("/auth-user/sign-up");
                }}
              >
                <Image
                  source={require("@/assets/images/cpatient.png")}
                  style={styles.modalIcon}
                />
                <Text style={styles.modalButtonText}>Continue as patient</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(false);
                  router.push("/auth-doctor/sign-up");
                }}
              >
                <Image
                  source={require("@/assets/images/cdoctor.png")}
                  style={styles.modalIcon}
                />
                <Text style={styles.modalButtonText}>
                  Continue as Therapist
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        */}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 40,
  },
  logoContainer: {
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
    alignItems: "flex-start",
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    lineHeight: 40,
    color: "black",
    marginBottom: 10,
  },
  subtitleContainer: {
    alignItems: "flex-start",
  },
  subtitle: {
    fontSize: 16,
    color: "#767E8C",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    gap: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 2,
    alignSelf: "flex-start",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 5,
    marginTop: 15,
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#767E8C",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkmark: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  rememberText: {
    fontSize: 14,
    color: "#767E8C",
  },
  forgotText: {
    fontSize: 14,
    color: "red",
    fontWeight: "700",
  },
  loginButton: {
    marginTop: 30,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  orText: {
    marginHorizontal: 10,
    color: "#767E8C",
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 20,
  },
  socialButton: {
    backgroundColor: "#F5F5F5",
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  socialIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  signupText: {
    fontSize: 14,
    color: "#767E8C",
    marginTop: 10,
  },
  signupLink: {
    color: Colors.primary,
    fontWeight: "700",
    fontSize: 14,
  },
  submitError: {
    color: "red",
    fontSize: 14,
    marginTop: 10,
    alignSelf: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: width * 0.95,
    height: height * 0.3,
    backgroundColor: "#fff",
    padding: width * 0.05,
    borderRadius: 20,
    alignItems: "center",
    alignSelf: "center",
    top: -15,
  },
  homeIndicator: {
    width: width * 0.4,
    height: 5,
    backgroundColor: "#1F1F1F",
    borderRadius: 2.5,
    top: -10,
  },
  modalTitle: {
    fontSize: width * 0.05,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 10,
  },
  modalSubtitle: {
    fontSize: width * 0.04,
    color: "#767E8C",
    textAlign: "center",
    marginBottom: height * 0.02,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    gap: width * 0.05,
  },
  modalButton: {
    width: width * 0.4,
    height: height * 0.15,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  modalIcon: {
    width: width * 0.08,
    height: height * 0.05,
    resizeMode: "contain",
  },
  modalButtonText: {
    fontSize: width * 0.04,
    fontWeight: "700",
    marginTop: height * 0.01,
    textAlign: "center",
    width: 100,
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    alignSelf: "center",
    width: 320,
    padding: 5,
    height: 50,
    marginTop: 0,
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    borderRadius: 20,
    alignItems: "center",
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
});