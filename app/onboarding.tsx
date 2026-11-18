import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { OnboardingManager } from "@/utils/onboarding";
import slides from "@/slide";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleNext = async () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      // Mark that user has seen onboarding
      try {
        await OnboardingManager.markOnboardingAsSeen();
        router.push("/auth/sign-in");
      } catch (error) {
        console.error("Error saving onboarding status:", error);
        router.push("/auth/sign-in");
      }
    }
  };
  const handleDotPress = (index: number) => {
    flatListRef.current?.scrollToIndex({ index });
    setCurrentIndex(index);
  };
  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.subtitle}>
                {item.id === "1"
                  ? "Find specialists"
                  : item.id === "2"
                  ? "Free assessments"
                  : "Book appointments"}
              </Text>
              <View style={{ width: 250 }}>
                <Text style={styles.title}>{item.title}</Text>
              </View>
              <Text style={styles.description}>{item.text}</Text>
            </View>
          </View>
        )}
      />

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <TouchableOpacity key={index} onPress={() => handleDotPress(index)}>
            <View
              style={[styles.dot, currentIndex === index && styles.activeDot]}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Next / Get Started Button */}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>
          {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
        </Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  slide: {
    width,
    alignItems: "center",
  },
  image: {
    width: "95%",
    height: "70%",
    marginTop: 0,
    borderEndEndRadius: 16,
    borderEndStartRadius: 16,
  },
  textContainer: {
    alignItems: "flex-start",
    marginTop: 22,
    width: 330,
  },
  subtitle: {
    fontSize: 14,
    color: "#9E9E9E",
    fontWeight: "400",
    marginTop: -3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 2,
  },
  description: {
    fontSize: 16,
    textAlign: "justify",
    color: "#757575",
    marginTop: 9,
    lineHeight: 22,
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: "34%",
    alignSelf: "flex-end",
    right: "7.5%",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#C4C4C4",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#1A1A1A",
    width: 20,
  },
  button: {
    width: "90%",
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});