import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface HeaderProps {
  showBack?: boolean;
  showSearch?: boolean;
  showFilter?: boolean;
  showAdd?: boolean;
  showDownload?: boolean;
  hideEmptyContainer?: boolean;
}

const HeaderUser: React.FC<HeaderProps> = ({
  showBack = true,
  showSearch = true,
  showFilter = true,
  showAdd = true,
  showDownload = true,
  hideEmptyContainer = true,
}) => {
  const router = useRouter();

  const showIconGroup = showSearch || showFilter || showAdd;

  return (
    <View style={styles.header}>
      {/* Back Arrow Button */}
      {showBack && (
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.iconButton}
        >
          <Ionicons name="arrow-back" size={25} color="#525252" />
        </TouchableOpacity>
      )}

      {/* Grouped Icons Container (Only shown if at least one icon is visible) */}
      {(!hideEmptyContainer || showIconGroup) && (
        <View style={styles.iconGroup}>
          {showSearch && (
            <TouchableOpacity
              onPress={() => router.push("/")}
              style={styles.smallIconButton}
            >
              <Ionicons name="search" size={24} color="black" />
            </TouchableOpacity>
          )}
          {showFilter && (
            <TouchableOpacity style={styles.smallIconButton}>
              <Ionicons name="options-outline" size={24} color="black" />
            </TouchableOpacity>
          )}
          {showAdd && (
            <TouchableOpacity
              onPress={() => router.push("/")}
              style={styles.smallIconButton}
            >
              <Ionicons name="add" size={24} color="black" />
            </TouchableOpacity>
          )}
          {showDownload && (
            <TouchableOpacity
              onPress={() => router.push("/")}
              style={styles.smallIconButton}
            >
              <Ionicons name="download-outline" size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 50,
    backgroundColor: "#E4F1E9",
    height: 56,
    borderRadius: 80,
    paddingHorizontal: 10,
  },
  iconButton: {
    backgroundColor: "white",
    borderRadius: 80,
    justifyContent: "center",
    alignItems: "center",
    height: 38,
    width: 40,
  },
  iconGroup: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 80,
    alignItems: "center",
    paddingHorizontal: 6,
    height: 38,
  },
  smallIconButton: {
    paddingHorizontal: 8,
  },
});

export default HeaderUser;
