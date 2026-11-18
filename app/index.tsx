import { View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { useAuth } from "@/auth-context";
import { OnboardingManager } from "@/utils/onboarding";
import Onboarding from "./onboarding";
import Signin from "./auth/sign-in";

export default function Index() {
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { session, isAuthenticated } = useAuth();

  useEffect(() => {
    // Check if user has seen onboarding
    const checkFirstTime = async () => {
      try {
        const hasSeenOnboarding = await OnboardingManager.hasSeenOnboarding();
        setIsFirstTime(!hasSeenOnboarding);
        setIsLoading(false);
      } catch (error) {
        console.error("Error checking onboarding status:", error);
        // If there's an error, show onboarding as fallback
        setIsFirstTime(true);
        setIsLoading(false);
      }
    };
    checkFirstTime();
  }, []);

  useEffect(() => {
    if (!isLoading && isFirstTime !== null) {
      if (isFirstTime) {
        // Show onboarding
      } else if (isAuthenticated && session?.user) {
        if (session.user.userType === "PATIENT") {
          router.replace("/(home-screen)/home-page");
        } else if (session.user.userType === "DOCTOR") {
          // Route doctors directly to their home screen instead of subscription
              router.replace("/subscription-doctor/subscriptions");
        }
      }
    }
  }, [isLoading, isFirstTime, isAuthenticated, session]);

  if (isLoading || isFirstTime === null) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (isFirstTime) {
    return <Onboarding />;
  }

  return <Signin />;
}