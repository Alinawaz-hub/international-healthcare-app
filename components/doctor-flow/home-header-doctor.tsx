import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  Animated,
  TextInput,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomDrawer2 from "./customedrawer2";
import { Colors } from "@/constants/Colors";

interface HomeHeaderProps {
  showSearch: boolean;
  showFilter: boolean;
  showAdd: boolean;
  onSearch?: (term: string) => void;
}

export default function HomeHeaderDoc({
  showSearch,
  showFilter,
  showAdd,
  onSearch,
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

        {searchVisible && (
          <TextInput
            ref={inputRef}
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#9E9E9E"
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
              onSearch?.(text);
            }}
            onBlur={() => setSearchVisible(false)}
          />
        )}

        {!searchVisible && (
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
            {showAdd && (
              <TouchableOpacity style={styles.searchIcon}>
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
                    <CustomDrawer2
                      closeDrawer={() => setDrawerVisible(false)}
                    />
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
  },
  searchInput: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 80,
    paddingHorizontal: 15,
    height: 40,
    marginHorizontal: 10,
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
