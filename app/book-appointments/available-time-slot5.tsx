import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Input from "@/components/input";
import Button from "@/components/button";
import Header from "@/components/user-flow/header";
import { Dropdown } from "react-native-element-dropdown";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Colors } from "@/constants/Colors";

const schema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone number is too short" }),
  sex: z.string().min(1, { message: "Sex is required" }),
  age: z.string().min(1, { message: "Age is required" }),
  isFirstTherapy: z.string().min(1, { message: "This field is required" }),
  takingMedicine: z.string().min(1, { message: "This field is required" }),
  lastVisit: z.string().min(1, { message: "This field is required" }),
  preCondition: z.string().min(1, { message: "This field is required" }),
  currentCondition: z.string().min(1, { message: "This field is required" }),
});

const PersonalInfoScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      sex: "",
      age: "",
      isFirstTherapy: "",
      takingMedicine: "",
      lastVisit: "",
      preCondition: "",
      currentCondition: "",
    },
  });

  const onSubmit = (data: any) => {
    router.push("/book-appointments/available-time-slot6");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1, backgroundColor: "#FFF", paddingHorizontal: 15 }}
      >
        {/* <View style={styles.container}> */}
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Header
            showBack
            showSearch={false}
            showFilter={false}
            showAdd={false}
            showDownload={false}
          />

          <Text style={styles.title}>Book Your Appointment</Text>
          <Text style={styles.subtitle}>
            Complete the following steps to schedule appointment.
          </Text>

          <Text style={styles.sectionTitle}>Personal Info</Text>

          <View style={[styles.row, styles.rowSpacing]}>
            <Controller
              name="firstName"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="First name"
                  size="half"
                  value={value}
                  onChangeText={onChange}
                  error={errors.firstName?.message}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Last name"
                  size="half"
                  value={value}
                  onChangeText={onChange}
                  error={errors.lastName?.message}
                />
              )}
            />
          </View>

          <View style={styles.inputSpacing}>
            <Controller
              name="email"
              control={control}
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

          <View style={styles.inputSpacing}>
            <Controller
              name="phone"
              control={control}
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
          </View>

          <View style={[styles.row, styles.rowSpacing]}>
            <View style={styles.dropdownWrapper}>
              <Controller
                name="sex"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Dropdown
                      data={[
                        { label: "Male", value: "Male" },
                        { label: "Female", value: "Female" },
                        { label: "Other", value: "Other" },
                      ]}
                      labelField="label"
                      valueField="value"
                      placeholder="Sex"
                      placeholderStyle={styles.placeholderStyle}
                      value={value}
                      onChange={(item) => onChange(item.value)}
                      style={[
                        styles.dropdownContainer,
                        errors.sex && { borderColor: "red", borderWidth: 1 },
                      ]}
                    />
                    {errors.sex && (
                      <Text style={styles.errorText}>{errors.sex.message}</Text>
                    )}
                  </>
                )}
              />
            </View>
            <Controller
              name="age"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Age"
                  size="half"
                  keyboardType="numeric"
                  value={value}
                  onChangeText={onChange}
                  error={errors.age?.message}
                />
              )}
            />
          </View>

          <Text style={styles.sectionTitle}>Medical Info</Text>
          <Text style={styles.sectionSub}>
            Provide your medical history and your conditions. If you’ve any.
          </Text>

          <View style={styles.inputSpacing}>
            <Controller
              name="isFirstTherapy"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Is that your first therapy?"
                  value={value}
                  onChangeText={onChange}
                  error={errors.isFirstTherapy?.message}
                />
              )}
            />
          </View>

          <View style={styles.inputSpacing}>
            <Controller
              name="takingMedicine"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Are you taking any medicine?"
                  value={value}
                  onChangeText={onChange}
                  error={errors.takingMedicine?.message}
                />
              )}
            />
          </View>

          <View style={styles.inputSpacing}>
            <Controller
              name="lastVisit"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="When was your last visit?"
                  value={value}
                  onChangeText={onChange}
                  error={errors.lastVisit?.message}
                />
              )}
            />
          </View>

          <View style={styles.inputSpacing}>
            <Controller
              name="preCondition"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Pre condition"
                  value={value}
                  onChangeText={onChange}
                  error={errors.preCondition?.message}
                />
              )}
            />
          </View>

          <View style={styles.inputSpacing}>
            <Controller
              name="currentCondition"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Current condition"
                  value={value}
                  onChangeText={onChange}
                  error={errors.currentCondition?.message}
                />
              )}
            />
          </View>

          <View style={styles.buttonGroup}>
            <Button
              title="Continue"
              type="default"
              style={styles.continueBtn}
              onPress={handleSubmit(onSubmit)}
            />
            <Button
              title="Cancel"
              type="default"
              style={styles.cancelBtn}
              textStyle={{ color: "#000" }}
              onPress={() => router.push("/(home-screen)/home-page")}
            />
          </View>
        </ScrollView>
        {/* </View> */}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default PersonalInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  inputSpacing: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 5,
    marginBottom: 10,
  },
  sectionSub: {
    fontSize: 13,
    color: "#666",
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    flexWrap: "wrap",
  },
  buttonGroup: {
    marginTop: 30,
  },
  continueBtn: {
    backgroundColor: Colors.primary,
    height: 48,
    borderRadius: 30,
    marginBottom: 10,
  },
  cancelBtn: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    height: 48,
    borderRadius: 30,
  },
  rowSpacing: {
    marginBottom: 16,
  },
  dropdownWrapper: {
    width: "48%",
  },
  dropdownContainer: {
    borderWidth: 0.5,
    borderColor: "#eae5e7",
    borderRadius: 80,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: "100%",
  },
  placeholderStyle: {
    color: "#9E9E9E",
    fontSize: 14,
    marginLeft: 5,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});