import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  Animated,
  Keyboard,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomDrawer from "@/components/user-flow/customedrawer";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";

interface HomeHeaderProps {
  showSearch: boolean;
  showFilter: boolean;
  showEdit: boolean;
  showShare: boolean;
  showDownload: boolean;
  onPlusPress?: () => void;
  onSearch?: (term: string) => void;
}

export default function HomeHeader({
  showSearch,
  showFilter,
  showEdit,
  showShare,
  showDownload,
  onSearch,
  onPlusPress,
}: HomeHeaderProps) {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const slideAnim = useRef(new Animated.Value(-300)).current;
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (drawerVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [drawerVisible]);

  useEffect(() => {
    if (searchVisible) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [searchVisible]);

  const handleOutsidePress = () => {
    if (searchVisible) {
      setSearchVisible(false);
      Keyboard.dismiss();
    }
  };

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    onSearch?.(text);
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.header}>
        {/* Menu Button */}
        <TouchableOpacity
          onPress={() => setDrawerVisible(true)}
          style={styles.menuButton}
        >
          <Ionicons name="menu" size={28} color="black" />
        </TouchableOpacity>

        {/* Search Bar or Icons */}
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
            <TouchableOpacity onPress={() => setSearchVisible(false)}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.iconContainer}>
            {showSearch && (
              <TouchableOpacity
                style={styles.searchIcon}
                onPress={() => setSearchVisible(true)}
              >
                <Ionicons name="search" size={28} color="black" />
              </TouchableOpacity>
            )}
            {showFilter && (
              <TouchableOpacity style={styles.searchIcon}>
                <Ionicons name="options-outline" size={28} color="black" />
              </TouchableOpacity>
            )}
            {showEdit && (
              <TouchableOpacity style={styles.searchIcon}>
                <Ionicons name="create-outline" size={28} color="black" />
              </TouchableOpacity>
            )}
            {showShare && (
              <TouchableOpacity style={styles.searchIcon}>
                <Ionicons name="share-social-outline" size={28} color="black" />
              </TouchableOpacity>
            )}
            {showDownload && (
              <TouchableOpacity style={styles.searchIcon}>
                <Ionicons name="download-outline" size={28} color="black" />
              </TouchableOpacity>
            )}
            {onPlusPress && (
              <TouchableOpacity
                onPress={() => router.push("/take-assessment/take-assessment")}
                style={styles.plusIcon}
              >
                <Ionicons name="add" size={28} color="black" />
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Drawer Modal */}
        <Modal transparent visible={drawerVisible} animationType="none">
          <TouchableWithoutFeedback onPress={() => setDrawerVisible(false)}>
            <View style={styles.drawerOverlay}>
              <TouchableWithoutFeedback>
                <Animated.View
                  style={[
                    styles.drawerContainer,
                    { transform: [{ translateX: slideAnim }] },
                  ]}
                >
                  <ScrollView
                    contentContainerStyle={styles.drawerContent}
                    showsVerticalScrollIndicator={false}
                  >
                    <CustomDrawer closeDrawer={() => setDrawerVisible(false)} />
                  </ScrollView>
                </Animated.View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    backgroundColor: Colors.tertiary,
    height: 56,
    borderRadius: 80,
    paddingHorizontal: 10,
  },
  menuButton: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 80,
    paddingHorizontal: 6,
    height: 38,
    width: 40,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  searchIcon: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 80,
    paddingHorizontal: 6,
    height: 38,
    width: 40,
    justifyContent: "center",
  },
  plusIcon: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 80,
    paddingHorizontal: 6,
    height: 38,
    width: 40,
    justifyContent: "center",
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
  drawerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  drawerContainer: {
    width: 280,
    height: "100%",
    backgroundColor: "white",
    padding: 10,
    position: "absolute",
  },
  drawerContent: {
    flexGrow: 1,
  },
});
