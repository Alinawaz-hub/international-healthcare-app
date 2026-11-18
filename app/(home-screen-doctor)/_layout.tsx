import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Keyboard, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";

export default function RootLayoutDoctor() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: Colors.primary,
            height: isKeyboardVisible ? 0 : 60,
            paddingBottom: isKeyboardVisible ? 0 : 10,
            width: "92%",
            alignSelf: "center",
            borderRadius: 15,
            bottom: 20,
            borderTopWidth: 0,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            overflow: "hidden",
          },
          tabBarItemStyle: {
            top: 8,
          },
          tabBarActiveTintColor: "#FFFFFF",
          tabBarInactiveTintColor: "#FFFFFF",
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="home-page-doctor"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="home"
                label="Home"
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="appointments"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="calendar"
                label="Appointments"
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="prescriptions"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="book"
                label="Prescriptions"
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="notifications"
                label="Notifications"
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="chats"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="chatbox-ellipses"
                label="Chats"
                color={color}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
const TabIcon = ({
  name,
  label,
  color,
  focused,
}: {
  name: keyof typeof Ionicons.glyphMap;
  label: string;
  color: string;
  focused: boolean;
}) => {
  const iconName = focused
    ? name
    : (`${name}-outline` as keyof typeof Ionicons.glyphMap);

  return (
    <View style={{ alignItems: "center", width: 80 }}>
      <Ionicons name={iconName} size={24} color={color} />
      {focused && (
        <Text
          style={{
            fontSize: 11,
            color: "#FFF",
            fontWeight: "bold",
            marginTop: 2,
            textAlign: "center",
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {label}
        </Text>
      )}
    </View>
  );
};
