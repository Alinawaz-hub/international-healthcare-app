import React, { useRef, useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";

interface HeaderProps {
  showBack?: boolean;
  showSearch?: boolean;
  showFilter?: boolean;
  showAdd?: boolean;
  showDownload?: boolean;
  hideEmptyContainer?: boolean;
  onSearch?: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  showBack = true,
  showSearch = true,
  showFilter = true,
  showAdd = true,
  showDownload = true,
  hideEmptyContainer = true,
  onSearch,
}) => {
  const router = useRouter();
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef<TextInput>(null);

  const showIconGroup = showSearch || showFilter || showAdd || showDownload;

  useEffect(() => {
    if (searchVisible) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [searchVisible]);

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    onSearch?.(text);
  };

  const handleOutsidePress = () => {
    if (searchVisible) {
      setSearchVisible(false);
      Keyboard.dismiss();
    }
  };

  const handleClosePress = () => {
    setSearchText(""); // Clear the search text when the close button is clicked
    setSearchVisible(false); // Hide the search bar
    onSearch?.(""); // Trigger the search callback with an empty string
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.header}>
        {/* Back Arrow Button */}
        {showBack && (
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.iconButton}
          >
            <Ionicons name="arrow-back" size={28} color="black" />
          </TouchableOpacity>
        )}

        {/* Search Input or Icon Group */}
        {searchVisible ? (
          <View style={styles.searchInputContainer}>
            <TextInput
              ref={inputRef}
              placeholder="Search..."
              value={searchText}
              onChangeText={handleSearchChange}
              style={styles.searchInput}
              placeholderTextColor="#9E9E9E"
            />
            <TouchableOpacity onPress={handleClosePress}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ) : (
          (!hideEmptyContainer || showIconGroup) && (
            <View style={styles.iconGroup}>
              {showSearch && (
                <TouchableOpacity
                  style={styles.smallIconButton}
                  onPress={() => setSearchVisible(true)}
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
          )
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 50,
    backgroundColor: Colors.tertiary,
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
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 80,
    paddingHorizontal: 15,
    height: 38,
    marginLeft: 10,
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
});

export default Header;
