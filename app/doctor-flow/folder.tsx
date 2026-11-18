import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
// Helper function to format date
const formatDate = (date: Date) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
  
  return `${month} ${day}, ${formattedHours}:${minutes} ${ampm}`;
};
import { Entypo, Ionicons } from "@expo/vector-icons";
import HomeHeaderDoc from "../../components/doctor-flow/home-header-doctor";
import { Colors } from "@/constants/Colors";

const Folder = () => {
  const { folderName } = useLocalSearchParams<{ folderName: string }>();
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  // Format current date & time
  const formattedDate = formatDate(new Date());

  // Function to delete the folder
  const deleteFolder = () => {
    Alert.alert(
      "Delete Folder",
      "Are you sure you want to delete this folder?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => router.back() },
      ]
    );
  };

  const closeMenu = () => {
    if (menuVisible) setMenuVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={closeMenu}>
      <View style={styles.container}>
        <HomeHeaderDoc showSearch={false} showFilter={true} showAdd={true} />
        <Text style={styles.heading}>Resources</Text>

        {/* Folder Container */}
        <View style={styles.outContainer}>
          <View style={styles.folderContainer}>
            {/* Folder Icon */}
            <Ionicons
              name="folder"
              size={70}
              color={Colors.primary}
              style={styles.folderIcon}
            />

            {/* 3-Dot Menu (Absolute Position) */}
            <TouchableOpacity
              style={styles.menuIcon}
              onPress={() => setMenuVisible(!menuVisible)}
            >
              <Entypo name="dots-three-vertical" size={18} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={styles.folderName}>{folderName}</Text>
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>

        {/* Delete Menu */}
        {menuVisible && (
          <TouchableOpacity style={styles.menuOption} onPress={deleteFolder}>
            <Text style={styles.menuText}>Delete Folder</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Folder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 10,
    fontFamily: "Raleway-Bold",
    marginTop: 20,
  },
  folderContainer: {
    width: 140,
    height: 130,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 15,
    paddingVertical: 10,
  },
  outContainer: {
    width: 180,
    height: 200,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 15,
    paddingVertical: 10,
  },
  folderImage: {
    width: 70,
    height: 70,
    marginBottom: 5,
  },
  folderIcon: {
    marginBottom: 5,
  },
  folderName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginTop: 5,
  },
  dateText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 2,
  },
  menuIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  menuOption: {
    position: "absolute",
    top: 230,
    left: 90,
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 5,
    elevation: 3,
    width: 120,
  },
  menuText: {
    color: "red",
    fontWeight: "bold",
  },
});
