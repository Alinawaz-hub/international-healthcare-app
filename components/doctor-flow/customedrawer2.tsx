import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/auth-context";

interface MenuItem {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
}

const CustomDrawerDoc = ({ closeDrawer }: { closeDrawer: () => void }) => {
  const router = useRouter();
  const navigation = useNavigation();
  const { logout } = useAuth();
  const menuItems: MenuItem[] = [
    {
      label: "Patients",
      icon: "calendar-outline",
      route: "/doctor-flow/patients",
    },
    {
      label: "Calendar",
      icon: "calendar-outline",
      route: "set-availability",
    },
    {
      label: "Prescriptions",
      icon: "document-text-outline",
      route: "/(home-screen-doctor)/prescriptions",
    },
    {
      label: "Appointments",
      icon: "grid-outline",
      route: "/(home-screen-doctor)/appointments",
    },
   
  
    {
      label: "Resources",
      icon: "people-outline",
      route: "/doctor-flow/resources",
    },
    {
      label: "Rating & Reviews",
      icon: "star-outline",
      route: "/doctor-flow/rating&reviews",
    },
    { label: "Contact us", icon: "headset-outline", route: "" },
  ];

  const accountSettings: MenuItem[] = [
    {
      label: "Profile Settings",
      icon: "settings-outline",
      route: "/doctor-flow/profile-settings",
    },

    {
      label: "Languages",
      icon: "language-outline",
      route: "/doctor-flow/languages",
    },
    {
      label: "Change Password",
      icon: "lock-closed-outline",
      route: "/doctor-flow/change-password",
    },
    {
      label: "Notification Settings",
      icon: "notifications-outline",
      route: "/(home-screen-doctor)/notifications",
    },
    { label: "Help & FAQ’s", icon: "help-circle-outline", route: "/help" },
  ];

  return (
    <View style={styles.drawerContainer}>
      {/* Close Button */}

      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Options */}
        <Text style={styles.sectionTitle}>Profile Options</Text>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => {
              closeDrawer();
              router.push(item.route as any);
            }}
          >
            <Ionicons name={item.icon} size={20} color="black" />
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        ))}

        {/* Account Settings */}
        <Text style={styles.sectionTitle1}>Account Settings</Text>
        {accountSettings.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => {
              closeDrawer();
              router.push(item.route as any);
            }}
          >
            <Ionicons name={item.icon} size={20} color="black" />
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        ))}

        {/* Logout Button */}
        <TouchableOpacity
          onPress={async () => {
            closeDrawer();
            await logout();
            navigation.reset({
              index: 0,
              routes: [{ name: "auth/sign-in" as never }],
            });
          }}
          style={[styles.menuItem, styles.logout]}
        >
          <MaterialIcons name="logout" size={20} color="red" />
          <Text style={[styles.menuText, { color: "red" }]}>Logout</Text>
        </TouchableOpacity>

        {/* Footer Links */}
        <View style={styles.footer}>
          <TouchableOpacity>
            <Text style={styles.footerText}>Terms & Conditions</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.footerText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 0,
    paddingHorizontal: 15,
    width: 280,
    marginBottom: 30,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  content: {
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 50,
    color: "black",
  },
  sectionTitle1: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
    color: "black",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  menuText: {
    fontSize: 14,
    marginLeft: 12,
    color: "black",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 10,
  },
  logoutText: {
    fontSize: 14,
    marginLeft: 12,
    color: "red",
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
  },
  footerText: {
    fontSize: 12,
    color: "gray",
    marginBottom: 5,
  },
  logout: {
    marginTop: 10,
  },
});

export default CustomDrawerDoc;
