import { View, Text, StyleSheet } from "react-native";
import React from "react";
import PasswordInput from "@/components/password-input";
import Button from "@/components/button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import HomeHeaderDoc from "../../components/doctor-flow/home-header-doctor";

const schema = z
  .object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z.string().min(1, "New password is required"),
    confirmPassword: z.string().min(1, "Confirm new password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ChangePassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("✅ Password Updated:", data);
  };
  return (
    <View style={styles.container}>
      <HomeHeaderDoc showSearch={false} showFilter={false} showAdd={false} />
      <Text style={styles.title}>Change Password</Text>
      <View style={{ gap: 15 }}>
        {/* Old Password */}
        <Controller
          control={control}
          name="oldPassword"
          render={({ field: { onChange, value } }) => (
            <View>
              <PasswordInput
                placeholder="Old password"
                value={value}
                onChangeText={onChange}
              />
              {errors.oldPassword && (
                <Text style={styles.errorText}>
                  {errors.oldPassword.message}
                </Text>
              )}
            </View>
          )}
        />

        {/* New Password */}
        <Controller
          control={control}
          name="newPassword"
          render={({ field: { onChange, value } }) => (
            <View>
              <PasswordInput
                placeholder="New password"
                value={value}
                onChangeText={onChange}
              />
              {errors.newPassword && (
                <Text style={styles.errorText}>
                  {errors.newPassword.message}
                </Text>
              )}
            </View>
          )}
        />

        {/* Confirm New Password */}
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <View>
              <PasswordInput
                placeholder="Confirm new password"
                value={value}
                onChangeText={onChange}
              />
              {errors.confirmPassword && (
                <Text style={styles.errorText}>
                  {errors.confirmPassword.message}
                </Text>
              )}
            </View>
          )}
        />
      </View>

      {/* Update Password Button */}
      <View style={styles.buttonContainer}>
        <Button
          title="Update Password"
          type="default"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    gap: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
  },
  buttonContainer: {
    gap: 10,
    marginTop: 50,
    alignSelf: "center",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    left: 20,
  },
});

export default ChangePassword;
