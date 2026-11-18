import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Input from "@/components/input";
import Button from "@/components/button";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import HeaderDoctor from "../../components/doctor-flow/header-doc";
import { Colors } from "@/constants/Colors";

const CreatePrescription = () => {
  const router = useRouter();
  const [medicines, setMedicines] = useState([{ id: Date.now() }]);

  const addMedicine = () => {
    setMedicines([...medicines, { id: Date.now() }]); // Generate a unique ID
  };

  const removeMedicine = (id: number) => {
    setMedicines(medicines.filter((med) => med.id !== id));
  };

  return (
    <View style={styles.container}>
      <HeaderDoctor
        showBack={true}
        showSearch={false}
        showFilter={false}
        showAdd={false}
        showDownload={false}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Create Prescription</Text>
        <Input placeholder="Prescription title" />

        <Text style={styles.sectionTitle}>Medicines</Text>

        {medicines.map((medicine) => (
          <View key={medicine.id} style={styles.medicineContainer}>
            <Input placeholder="Medicine type" />
            <Input placeholder="Medicine name" />
            <View style={styles.row}>
              <Input placeholder="Dosage (e.g. 50mg)" size="half" />
              <Input placeholder="Usage duration" size="half" />
            </View>
            <Input placeholder="Units taken (e.g. 1 tablet)" />
            <View style={styles.row}>
              <Input placeholder="Taken before" size="half" />
              <Input placeholder="Taken time" size="half" />
            </View>

            {/* Remove Button */}
            {medicines.length > 1 && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => removeMedicine(medicine.id)}
              >
                <Ionicons name="trash-outline" size={18} color="black" />
                <Text style={styles.text}>Remove Education</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        {/* Add Another Button */}
        <TouchableOpacity style={styles.button} onPress={addMedicine}>
          <Ionicons name="add" size={18} color="black" />
          <Text style={styles.text}>Add another</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Advise</Text>
        <Input placeholder="Write your advise" />

        <Button
          title="Create Prescription"
          type="default"
          style={styles.createButton}
          onPress={() =>
            router.push("/appointment-details-doc/appointment-details")
          }
        />
        <Button
          title="Cancel"
          type="default"
          style={styles.cancelButton}
          textStyle={{ color: "black" }}
          onPress={() =>
            router.push("/appointment-details-doc/appointment-details-doc")
          }
        />
      </ScrollView>
    </View>
  );
};

export default CreatePrescription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
    alignSelf: "flex-start",
    marginLeft: 5,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    alignSelf: "flex-start",
    marginLeft: 5,
  },
  medicineContainer: {
    borderRadius: 8,
    marginBottom: 12,
    gap: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    flexWrap: "wrap",
  },
  halfInput: {
    width: 165,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 20,
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F1F1F",
  },
  createButton: {
    width: "100%",
    height: 48,
    backgroundColor: Colors.primary,
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    width: "100%",
    marginTop: 10,
  },
});
