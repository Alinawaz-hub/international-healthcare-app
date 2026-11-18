import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { View, Image, StyleSheet } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/auth-context";
import Toast, { ErrorToast } from "react-native-toast-message";
import { Colors } from "@/constants/Colors";

// Prevent splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  
  const toastConfig = {
    error: (props: any) => (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: Colors.primary,
          backgroundColor: theme.cardBackground,
        }}
        text1Style={{
          color: "red",
          fontSize: 15,
          fontWeight: "bold",
        }}
        text2Style={{
          color: theme.text,
          fontSize: 13,
        }}
      />
    ),
  };

  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      if (loaded) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setAppReady(true);
        await SplashScreen.hideAsync();
      }
    };
    prepareApp();
  }, [loaded]);

  if (!loaded || !appReady) {
    return (
      <View style={styles.splashContainer}>
        <Image
          source={require("@/assets/images/splash-logo.png")}
          style={styles.logo}
        />
      </View>
    );
  }

  const queryClient = new QueryClient();

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="auth/sign-in"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="auth/sign-up"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="subscription-user"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="auth/verify-email"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="auth/reset-password"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="auth/verify-code"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="auth/new-password"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />
            <Stack.Screen
              name="(home-screen)"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="book-appointments/select-service"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="book-appointments/select-doctor"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="book-appointments/doctor-details"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="book-appointments/available-time-slot"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="book-appointments/available-time-slot2"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="book-appointments/available-time-slot3"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="book-appointments/available-time-slot4"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="book-appointments/available-time-slot5"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="book-appointments/available-time-slot6"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="book-appointments/available-time-slot7"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="book-appointments/subscription-details"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="appointment-details/prescription-details"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="book-appointments/chat-details"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="assessment/assessment"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="assessment/assessment-details"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="take-assessment/take-assessment"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="take-assessment/medical-issue-file"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="take-assessment/select-payment"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="resubmit-assessment/rejected-documents"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="resubmit-assessment/resubmit-document"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="appointment-details/appointment-details"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="appointment-details/report"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="appointment-details/join-session"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="appointment-details/session-joined"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="settings/profile-settings"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="doctor-flow/languages"
              options={{ headerShown: false }}
            />
              <Stack.Screen
              name="settings/languages"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="settings/change-password"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="settings/medical-info"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="settings/rating&reviews"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="settings/review-details"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="settings/invoices"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="settings/invoice-details"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="settings/clinics"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="settings/clinic-details"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="settings/services"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(home-screen-doctor)"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="patients-doc/patients"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="patients-doc/patients-details"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="prescriptions-doc/prescriptions-details"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="doctor-flow/chat-details"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="appointment-details-doc/appointment-details-doc"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="appointment-details-doc/create-prescription"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="appointment-details-doc/appointment-details"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="appointment-details-doc/prescription-details"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="appointment-details-doc/add-note"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="appointment-details-doc/join-session"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="appointment-details-doc/session-joined"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="doctor-flow/services"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="doctor-flow/update-services"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="doctor-flow/payments"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="doctor-flow/invoice-details"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="doctor-flow/resources"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="doctor-flow/folder"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="doctor-flow/rating&reviews"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="doctor-flow/reviews-details"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="doctor-flow/patients"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="doctor-flow/patients-details-general-info"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="doctor-flow/profile-settings"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="doctor-flow/professional-info"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="doctor-flow/personal-info"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="doctor-flow/educational-info"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="doctor-flow/change-password"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="auth-user/sign-in"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="auth-user/sign-up"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="auth-doctor/sign-up"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="auth-doctor/sign-in"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="subscription-doctor/subscriptions"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="subscription-doctor/subscription-details"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="subscription-doctor/new-payment"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="appointment-details-doc/report"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="appointment-details-doc/medical-history"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="book-appointments/select-doctor-service"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="set-availability"
              options={{ headerShown: false }}
            />

            <Stack.Screen name="+not-found" />
          </Stack>
          <Toast config={toastConfig} />
          <StatusBar style="dark" />
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: "#28A0D7",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
   
  },
});
