import { useRouter, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import HomeHeaderDoc from "../../components/doctor-flow/home-header-doctor";

const servicesData = [
 
  { id: "2", name: "Video Session", price: 25 },
 
];

const Services = () => {
  const router = useRouter();
  const [categories, setCategories] = useState(servicesData);
  const { updatedId, updatedPrice } = useLocalSearchParams();

  useEffect(() => {
    if (updatedId && updatedPrice) {
      const priceValue = parseFloat(
        Array.isArray(updatedPrice) ? updatedPrice[0] : updatedPrice
      );
      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat.id === updatedId ? { ...cat, price: priceValue } : cat
        )
      );
    }
  }, [updatedId, updatedPrice]);

  return (
    <View style={{ flex: 1, paddingHorizontal: 15, backgroundColor: "white" }}>
      <HomeHeaderDoc showSearch={true} showFilter={true} showAdd={true} />
      <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 20 }}>
        Categories
      </Text>
      <Text>Services you're providing to your patients.</Text>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.categoryCard}>
            <Text style={styles.categoryName}>{item.name}</Text>
            <View style={styles.rightContainer}>
              <Text style={styles.categoryPrice}>${item.price.toFixed(2)}</Text>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/doctor-flow/update-services",
                    params: {
                      id: item.id,
                      name: item.name,
                      price: item.price.toString(),
                    },
                  })
                }
              >
                <Ionicons name="create-outline" size={22} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({
  categoryCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    top: 20,
  },
  categoryName: {
    flex: 1,
    fontSize: 14,
    fontWeight: "400",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  categoryPrice: {
    fontSize: 16,
    fontWeight: "400",
  },
});
