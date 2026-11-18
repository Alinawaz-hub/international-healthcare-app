import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import Input from "@/components/input";
import Button from "@/components/button";
import { router } from "expo-router";
import { Dropdown } from "react-native-element-dropdown";
import PasswordInput from "@/components/password-input";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Colors } from "@/constants/Colors";
// Validation schema
const schema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email format"),
    dob: z.string().min(1, "Date of birth is required"),
    gender: z.string().min(1, "Please select your gender"),
    phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
    address: z.string().min(5, "Address is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms & conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function SignUp() {
  const [checked, setChecked] = useState(false);
  const passwordInputRef = useRef<TextInput>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [role, setRole] = useState<"PATIENT" | "DOCTOR">("PATIENT");
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      dob: "",
      gender: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    console.log("Role:", role);
    router.push("/auth/verify-email");
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContainer,
            { backgroundColor: "white" },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Image
                source={require("@/assets/images/logo.png")}
                style={styles.logo}
              />
            </View>

            <View style={styles.titleContainer}>
              <MaskedView
                maskElement={
                  <Text style={styles.title}>Create your account!</Text>
                }
              >
                <LinearGradient
                  colors={[Colors.primary, Colors.secondary]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={[styles.title, { opacity: 0 }]}>
                    Create your account!
                  </Text>
                </LinearGradient>
              </MaskedView>
            </View>

            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitle}>
                Provide your information below to create your account on International HealthCare Center.
              </Text>
            </View>

            {/* Role Switcher Tab */}
            <View style={styles.tabsContainer}>
              <TouchableOpacity
                style={[styles.tab, role === "PATIENT" && styles.activeTab]}
                onPress={() => setRole("PATIENT")}
              >
                <Text
                  style={[
                    styles.tabText,
                    role === "PATIENT" && styles.activeTabText,
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
                  ]}
                >
                  Doctor
                </Text>
              </TouchableOpacity>
            </View>
            {/* End Role Switcher Tab */}

            <View style={styles.inputContainer}>
              {/* First Name & Last Name in Row */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 10,
                  width: "100%",
                }}
              >
                <View style={{ flex: 1 }}>
                  <Controller
                    control={control}
                    name="firstName"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        placeholder="First name"
                        value={value}
                        onChangeText={onChange}
                        error={errors.firstName?.message}
                      />
                    )}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Controller
                    control={control}
                    name="lastName"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        placeholder="Last name"
                        value={value}
                        onChangeText={onChange}
                        error={errors.lastName?.message}
                      />
                    )}
                  />
                </View>
              </View>

              {/* Email Field */}
              <View>
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

              {/* Date of Birth */}
              <Controller
                control={control}
                name="dob"
                render={({ field: { onChange, value } }) => (
                  <>
                    <View style={{ position: "relative" }}>
                      <Input
                        placeholder="Date of birth"
                        value={value}
                        onChangeText={onChange}
                        editable={false}
                        error={errors.dob?.message}
                      />
                      <TouchableOpacity
                        onPress={() => setShowDatePicker(true)}
                        style={{
                          position: "absolute",
                          right: 20,
                          top: 14,
                        }}
                      >
                        <Ionicons
                          name="calendar-outline"
                          size={20}
                          color={errors.dob ? "red" : "#888"}
                        />
                      </TouchableOpacity>
                    </View>

                    {/* Modal Date Picker */}
                    <DateTimePickerModal
                      isVisible={showDatePicker}
                      mode="date"
                      date={value ? new Date(value) : new Date()}
                      onConfirm={(selectedDate) => {
                        onChange(formatDate(selectedDate));
                        setShowDatePicker(false);
                      }}
                      onCancel={() => {
                        setShowDatePicker(false);
                      }}
                    />
                  </>
                )}
              />
              <Controller
                control={control}
                name="gender"
                render={({ field: { onChange, value } }) => (
                  <View>
                    <Dropdown
                      data={[
                        { label: "Male", value: "male" },
                        { label: "Female", value: "female" },
                        { label: "Other", value: "other" },
                      ]}
                      labelField="label"
                      valueField="value"
                      placeholder="Select Gender"
                      placeholderStyle={styles.placeholderStyle}
                      value={value}
                      onChange={(item) => onChange(item.value)}
                      style={[
                        styles.dropdownContainer,
                        { width: "100%" },
                        errors.gender ? styles.dropdownError : null,
                      ]}
                    />
                    {errors.gender && (
                      <Text style={styles.errorText}>
                        {errors.gender.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Phone"
                    keyboardType="phone-pad"
                    value={value}
                    onChangeText={onChange}
                    error={errors.phone?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="address"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Address"
                    value={value}
                    onChangeText={onChange}
                    error={errors.address?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <PasswordInput
                    placeholder="Password"
                    value={value}
                    onChangeText={onChange}
                    error={errors.password?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, value } }) => (
                  <PasswordInput
                    placeholder="Confirm Password"
                    value={value}
                    onChangeText={onChange}
                    error={errors.confirmPassword?.message}
                  />
                )}
              />
            </View>

            <Controller
              control={control}
              name="termsAccepted"
              render={({ field: { value, onChange } }) => (
                <View style={styles.checkboxContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      setChecked(!checked);
                      onChange(!checked);
                    }}
                  >
                    <View style={[styles.checkbox, checked && styles.checked]}>
                      {checked && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.termsText}>
                    I agree with{" "}
                    <Text style={styles.linkText}>Terms & Conditions</Text>.
                  </Text>
                </View>
              )}
            />
            {errors.termsAccepted && (
              <Text style={styles.errorText}>
                {errors.termsAccepted.message}
              </Text>
            )}

            <Button
              title="Sign Up"
              type="default"
              style={styles.signupButton}
              onPress={handleSubmit(onSubmit)}
            />

            <Text style={styles.signupText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push("/auth/sign-in")}>
              <Text style={styles.signupLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  logoContainer: {
    width: 327,
    alignItems: "center",
    top: 40,
  },
  logo: {
    width: 200,
    height: 80,
    resizeMode: "contain",
    marginBottom: 50,
    marginTop: 10,
  },
  titleContainer: {
    width: 327,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
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
    fontSize: 14,
    color: "#767E8C",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    gap: 15,
    width: "100%",
  },
  dropdownContainer: {
    width: 350,
    height: 48,
    borderRadius: 80,
    borderWidth: 0.5,
    paddingLeft: 20,
    paddingRight: 16,
    backgroundColor: "#FFFFFF",
    borderColor: "#eae5e7",
  },

  dropdownError: {
    borderColor: "red",
    borderWidth: 1,
  },
  pickerInput: {
    fontSize: 16,
    color: "#333",
    top: 3,
    right: 3,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    width: 315,
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
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  termsText: {
    fontSize: 14,
    color: "#767E8C",
  },
  linkText: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  signupButton: {
    marginTop: 30,
  },
  signupText: {
    fontSize: 14,
    color: "#9E9E9E",
    marginTop: 10,
  },
  signupLink: {
    color: Colors.primary,
    fontWeight: "700",
    fontSize: 14,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    alignSelf: "flex-start",
  },

  datePickerContainer: {
    height: 48,
    borderRadius: 80,
    borderWidth: 0.5,
    paddingLeft: 20,
    backgroundColor: "#FFFFFF",
    borderColor: "#eae5e7",
  },
  dateTextPlaceholder: {
    fontSize: 14,
    color: "#9E9E9E",
  },
  dateTextSelected: {
    fontSize: 14,
    color: "black",
  },
  placeholderStyle: {
    color: "#9E9E9E",
    fontSize: 14,
  },
  iconContainer: {
    position: "absolute",
    right: 20,
    top: 14,
    zIndex: 1,
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