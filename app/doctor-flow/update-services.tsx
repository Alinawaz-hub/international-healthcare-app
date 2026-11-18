import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Input from "@/components/input";
import Button from "@/components/button";
import HeaderDoctor from "../../components/doctor-flow/header-doc";
import { Colors } from "@/constants/Colors";

export default function UpdateCategoryScreen() {
  const router = useRouter();
  const { id, name, price } = useLocalSearchParams();

  const [newPrice, setNewPrice] = useState(price);

  const handleUpdate = () => {
    router.replace({
      pathname: "/doctor-flow/services",
      params: { updatedId: id, updatedPrice: newPrice },
    });
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 15, backgroundColor: "white" }}>
      <HeaderDoctor
        showBack={true}
        showSearch={false}
        showFilter={false}
        showAdd={false}
        showDownload={false}
        showEdit={false}
        showShare={false}
      />

      <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 20 }}>
        Update Category
      </Text>
      <Text>
        Search and add the services you are providing to your patients.
      </Text>

      {/* Session Type (Read Only) */}
      <Text style={{ marginTop: 20, fontWeight: "bold", padding: 10 }}>
        Session Type
      </Text>
      <Text
        style={{
          borderWidth: 1,
          paddingVertical: 8,
          borderColor: "#E0E0E0",
          borderRadius: 80,
          padding: 10,
          height: 45,
        }}
      >
        {name}
      </Text>

      {/* Price Input */}
      <Text style={{ marginTop: 20, fontWeight: "bold" }}>
        Set Price for Service
      </Text>
      <Input
        style={{ borderBottomWidth: 1, paddingVertical: 8 }}
        keyboardType="numeric"
        value={String(newPrice)}
        onChangeText={setNewPrice}
        placeholder={""}
      />

      {/* Buttons */}
      <Button
        title="Update"
        type="default"
        onPress={handleUpdate}
        style={{
          width: "100%",
          height: 48,
          backgroundColor: Colors.primary,
          marginBottom: 10,
          marginTop: 30,
        }}
      />

      <Button
        title="Cancel"
        type="default"
        onPress={() => router.back()}
        style={{
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: "#E0E0E0",
          width: "100%",
        }}
        textStyle={{ color: "black" }}
      />
    </View>
  );
}
