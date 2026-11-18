import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { useAuth } from "@/auth-context";

export default function CustomDrawer({
  closeDrawer,
}: {
  closeDrawer: () => void;
}) {
  const navigation = useNavigation();
  const { logout } = useAuth();

  return (
    <View style={styles.drawerContainer}>
      <Text style={styles.sectionTitle}>Profile Options</Text>
      {[
        {
          icon: "file-medical",
          label: "Medical Info",
          onPress: () => {
            closeDrawer();
            router.push("/settings/medical-info");
          },
        },
        {
          icon: "calendar-alt",
          label: "Appointments",
          onPress: () => {
            closeDrawer();
            router.push("/(home-screen)/appointments");
          },
        },
        {
          icon: "prescription-bottle",
          label: "My Prescriptions",
          onPress: () => {
            closeDrawer();
            router.push("/(home-screen)/prescriptions");
          },
        },
        {
          icon: "heart",
          label: "Services",
          onPress: () => {
            closeDrawer();
            router.push("/settings/services");
          },
        },
    
        {
          icon: "user-md",
          label: "Doctors",
          onPress: () => {
            closeDrawer();
            router.push("/book-appointments/select-doctor");
          },
        },
     
        {
          icon: "file-invoice-dollar",
          label: "Invoices",
          onPress: () => {
            closeDrawer();
            router.push("/settings/invoices");
          },
        },
        {
          icon: "star",
          label: "Rating & Reviews",
          onPress: () => {
            closeDrawer();
            router.push("/settings/rating&reviews");
          },
        },
        {
          icon: "comments",
          label: "Chats",
          onPress: () => {
            closeDrawer();
            router.push("/book-appointments/chat-details");
          },
        },
        { icon: "headset", label: "Contact Us" },
      ].map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={item.onPress}
        >
          <FontAwesome5 name={item.icon as any} size={18} color="#444" />
          <Text style={styles.menuText}>{item.label}</Text>
        </TouchableOpacity>
      ))}

      {/* Account Settings */}
      <Text style={styles.sectionTitle}>Account Settings</Text>
      {[
        {
          icon: "user-cog",
          label: "Profile Settings",
          onPress: () => {
            closeDrawer();
            router.push("/settings/profile-settings");
          },
        },
        {
          icon: "cogs",
          label: "Language",
          onPress: () => {
            closeDrawer();
            router.push("/settings/account-management");
          },
        },
        {
          icon: "lock",
          label: "Change Password",
          onPress: () => {
            closeDrawer();
            router.push("/settings/change-password");
          },
        },
        {
          icon: "bell",
          label: "Notification Settings",
          onPress: () => {
            closeDrawer();
            router.push("/(home-screen)/notifications");
          },
        },
        {
          icon: "question-circle",
          label: "Help & FAQ’s",
       
          onPress: () => {
          },
        },
      ].map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={item.onPress}
        >
          <FontAwesome5 name={item.icon as any} size={18} color="#444" />
          <Text style={styles.menuText}>{item.label}</Text>
        </TouchableOpacity>
      ))}

      {/* Logout */}
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

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Terms & Conditions</Text>
        <Text style={styles.footerText}>Privacy Policy</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 15,
    color: "#444",
  },
  logout: {
    marginTop: 0,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#888",
    top: 20,
  },
});

// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
// import { DrawerContentScrollView } from "@react-navigation/drawer";
// import { router } from "expo-router";

// interface CustomDrawerProps {
//   closeDrawer: () => void;
// }

// const profileOptions = [
//   {
//     icon: "calendar-alt",
//     label: "Appointments",
//     route: "/Home-Screen/appointments",
//   },
//   {
//     icon: "prescription-bottle",
//     label: "My Prescriptions",
//     route: "/Home-Screen/Prescriptions",
//   },
//   {
//     icon: "heart",
//     label: "Services",
//     route: "/book-appointments/select-doctor",
//   },
//   {
//     icon: "clinic-medical",
//     label: "Clinics",
//     route: "/book-appointments/select-doctor?tab=Clinics",
//   },
//   {
//     icon: "user-md",
//     label: "Therapists",
//     route: "/book-appointments/select-doctor?tab=Therapist",
//   },
//   {
//     icon: "file-invoice-dollar",
//     label: "Invoices",
//     route: "/book-appointments/invoices",
//   },
//   {
//     icon: "star",
//     label: "Rating & Reviews",
//     route: "/book-appointments/rating&reviews",
//   },
//   { icon: "comments", label: "Chats", route: "/Home-Screen/chats" },
//   { icon: "headset", label: "Contact Us", route: "/contact-us" },
// ] as const;

// const accountSettings = [
//   {
//     icon: "user-cog",
//     label: "Profile Settings",
//     route: "/book-appointments/profile-setting",
//   },
//   {
//     icon: "cogs",
//     label: "Account Management",
//     route: "/book-appointments/account-management",
//   },
//   {
//     icon: "lock",
//     label: "Change Password",
//     route: "/book-appointments/change-password",
//   },
//   {
//     icon: "bell",
//     label: "Notification Settings",
//     route: "/notification-settings",
//   },
//   { icon: "question-circle", label: "Help & FAQ’s", route: "/help-faqs" },
// ] as const;

// const CustomDrawerContent: React.FC<CustomDrawerProps> = ({ closeDrawer }) => {
//   return (
//     <DrawerContentScrollView contentContainerStyle={styles.drawerContainer}>
//       {/* Profile Options */}
//       <Text style={styles.sectionTitle}>Profile Options</Text>
//       {profileOptions.map((item, index) => (
//         <TouchableOpacity
//           key={index}
//           style={styles.menuItem}
//           onPress={() => {
//             closeDrawer();
//             router.push(item.route as any); // ✅ Fix Type Error
//           }}
//         >
//           <FontAwesome5 name={item.icon} size={18} color="#444" />
//           <Text style={styles.menuText}>{item.label}</Text>
//         </TouchableOpacity>
//       ))}

//       {/* Account Settings */}
//       <Text style={styles.sectionTitle}>Account Settings</Text>
//       {accountSettings.map((item, index) => (
//         <TouchableOpacity
//           key={index}
//           style={styles.menuItem}
//           onPress={() => {
//             closeDrawer();
//             router.push(item.route as any); // ✅ Fix Type Error
//           }}
//         >
//           <FontAwesome5 name={item.icon} size={18} color="#444" />
//           <Text style={styles.menuText}>{item.label}</Text>
//         </TouchableOpacity>
//       ))}

//       {/* Logout Button */}
//       <TouchableOpacity
//         onPress={() => {
//           closeDrawer();
//           router.push("/auth/sign-in" as any); // ✅ Fix Type Error
//         }}
//         style={[styles.menuItem, styles.logout]}
//       >
//         <MaterialIcons name="logout" size={20} color="red" />
//         <Text style={[styles.menuText, { color: "red" }]}>Logout</Text>
//       </TouchableOpacity>

//       {/* Footer Links */}
//       <View style={styles.footer}>
//         <Text style={styles.footerText}>Terms & Conditions</Text>
//         <Text style={styles.footerText}>Privacy Policy</Text>
//       </View>
//     </DrawerContentScrollView>
//   );
// };

// // ✅ Styles
// const styles = StyleSheet.create({
//   drawerContainer: {
//     flex: 1,
//     backgroundColor: "white",
//     paddingHorizontal: 20,
//     paddingVertical: 40,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   menuItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 10,
//   },
//   menuText: {
//     fontSize: 16,
//     marginLeft: 15,
//     color: "#444",
//   },
//   logout: {
//     marginTop: 10,
//   },
//   footer: {
//     marginTop: 20,
//   },
//   footerText: {
//     fontSize: 14,
//     color: "#888",
//     marginTop: 5,
//   },
// });

// export default CustomDrawerContent;
