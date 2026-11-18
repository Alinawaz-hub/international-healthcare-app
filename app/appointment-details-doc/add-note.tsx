import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import Input from "../../components/input";
import Button from "@/components/button";
import { Ionicons } from "@expo/vector-icons";
import HeaderDoctor from "../../components/doctor-flow/header-doc";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from "react-native-element-dropdown";
import { Colors } from "@/constants/Colors";

const AddNoteScreen = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [medicationTaken, setMedicationTaken] = useState<string | null>(null);
  const [overuseMedication, setOveruseMedication] = useState<string | null>(
    null
  );

  const [medications, setMedications] = useState([
    { medication: "", therapist: "" },
  ]);
  const [medicalHistories, setMedicalHistories] = useState([
    { habit: "", status: "", description: "" },
  ]);

  const [form, setForm] = useState({
    Yes: "",
  });

  const toggleDatePicker = () => setShowPicker(true);

  const handleDateChange = (_event: any, date: any) => {
    if (date) setSelectedDate(date);
    setShowPicker(false);
  };

  return (
    <View style={styles.container}>
      <HeaderDoctor
        showBack={true}
        showSearch={false}
        showFilter={false}
        showAdd={false}
        showDownload={false}
        showEdit={false}
        showShare={false}
      />

      <Text style={styles.header}>Add Notes</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Initial Review Date</Text>
        <TouchableOpacity
          style={styles.datePickerContainer}
          onPress={toggleDatePicker}
        >
          <Text style={styles.dateText}>{selectedDate.toDateString()}</Text>
          <Ionicons name="calendar-outline" size={20} color="gray" />
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
          />
        )}

        {/* Patient Info */}
        <Text style={styles.sectionTitle}>Patient Info</Text>
        <View style={{ gap: 10 }}>
          <Input placeholder="Patient name" />
          <Input placeholder="Patient age" keyboardType="numeric" />
          <Input placeholder="Home phone" keyboardType="phone-pad" />
          <Input placeholder="Email" keyboardType="email-address" />
          <Input placeholder="Phone no." keyboardType="phone-pad" />
          <Input placeholder="Patient address" />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <Input placeholder="City" size="half" />
            <Input placeholder="State" size="half" />
          </View>
          <Input placeholder="Zip code" keyboardType="numeric" />
        </View>

        {/* Work Status */}
        <Text style={styles.sectionTitle}>Work Status</Text>
        <View style={{ gap: 10 }}>
          <Input placeholder="Patient employed" />
          <Input placeholder="Employed as a" />
        </View>

        {/* Current Medication */}
        <Text style={styles.sectionTitle}>Current Medication</Text>
        {medications.map((med, index) => (
          <View key={index} style={{ gap: 10, marginBottom: 10 }}>
            <Input
              placeholder="Medication"
              value={med.medication}
              onChangeText={(text) => {
                const updated = [...medications];
                updated[index].medication = text;
                setMedications(updated);
              }}
            />
            <Input
              placeholder="Therapist describing"
              value={med.therapist}
              onChangeText={(text) => {
                const updated = [...medications];
                updated[index].therapist = text;
                setMedications(updated);
              }}
            />
            {index > 0 && (
              <TouchableOpacity
                onPress={() => {
                  const updated = medications.filter((_, i) => i !== index);
                  setMedications(updated);
                }}
              >
                <Text style={{ color: "red", fontWeight: "bold", left: 15 }}>
                  Remove
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
        <TouchableOpacity
          style={styles.addAnother}
          onPress={() =>
            setMedications([...medications, { medication: "", therapist: "" }])
          }
        >
          <Ionicons name="add" size={20} color="gray" />
          <Text style={{ fontWeight: "bold" }}>Add Another</Text>
        </TouchableOpacity>

        {/* Medication Taken As Prescribed */}
        <Text style={styles.sectionTitle1}>
          Are medication taken as prescribed?
        </Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setMedicationTaken("yes")}
          >
            <Ionicons
              name={
                medicationTaken === "yes"
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={22}
              color={medicationTaken === "yes" ? "#00EF99" : "gray"}
            />
            <Text style={styles.radioText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setMedicationTaken("no")}
          >
            <Ionicons
              name={
                medicationTaken === "no"
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={22}
              color={medicationTaken === "no" ? "#00EF99" : "gray"}
            />
            <Text style={styles.radioText}>No</Text>
          </TouchableOpacity>
        </View>

        {/* Overuse Medication */}
        <Text style={styles.sectionTitle1}>
          Do you take more medication or use medication than your Therapist
          prescribed?
        </Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setOveruseMedication("yes")}
          >
            <Ionicons
              name={
                overuseMedication === "yes"
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={22}
              color={overuseMedication === "yes" ? "#00EF99" : "gray"}
            />
            <Text style={styles.radioText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setOveruseMedication("no")}
          >
            <Ionicons
              name={
                overuseMedication === "no"
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={22}
              color={overuseMedication === "no" ? "#00EF99" : "gray"}
            />
            <Text style={styles.radioText}>No</Text>
          </TouchableOpacity>
        </View>

        {/* Medical History */}
        <Text style={styles.sectionTitle}>Medical History</Text>
        {medicalHistories.map((entry, index) => (
          <View key={index} style={{ gap: 10, marginBottom: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              <Input
                placeholder="e.g. smoking"
                value={entry.habit}
                onChangeText={(text) => {
                  const updated = [...medicalHistories];
                  updated[index].habit = text;
                  setMedicalHistories(updated);
                }}
                style={{ width: 160 }}
              />
              <Dropdown
                data={[
                  { label: "Yes", value: "Yes" },
                  { label: "No", value: "No" },
                ]}
                labelField="label"
                valueField="value"
                placeholder="Select"
                placeholderStyle={styles.placeholderStyle}
                value={entry.status}
                onChange={(item) => {
                  const updated = [...medicalHistories];
                  updated[index].status = item.value;
                  setMedicalHistories(updated);
                }}
                style={styles.dropdownContainer}
              />
            </View>
            <Input
              placeholder="Describe"
              value={entry.description}
              onChangeText={(text) => {
                const updated = [...medicalHistories];
                updated[index].description = text;
                setMedicalHistories(updated);
              }}
            />
            {index > 0 && (
              <TouchableOpacity
                onPress={() => {
                  const updated = medicalHistories.filter(
                    (_, i) => i !== index
                  );
                  setMedicalHistories(updated);
                }}
              >
                <Text style={{ color: "red", fontWeight: "bold", left: 15 }}>
                  Remove
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
        <TouchableOpacity
          style={styles.addAnother}
          onPress={() =>
            setMedicalHistories([
              ...medicalHistories,
              { habit: "", status: "", description: "" },
            ])
          }
        >
          <Ionicons name="add" size={20} color="gray" />
          <Text style={{ fontWeight: "bold" }}>Add Another</Text>
        </TouchableOpacity>

        {/* Other Options */}
        <Text style={styles.sectionTitle}>Other Options</Text>
        <Input
          heading="Any medical disorder being followed by therapist"
          placeholder="Describe"
        />
        <Input
          heading="Other medical history/surgeries/hospitalizations"
          placeholder="Describe"
        />
        <Input
          heading="I have difficulty with the following activities"
          placeholder="Describe"
        />
        <Input
          heading="For Chronic Pain Patients: The following terms describe the pain"
          placeholder="Describe"
        />
        <Input heading="I have received" placeholder="Select option" />

        {/* Family History */}
        <Text style={styles.sectionTitle}>Family History</Text>
        <View style={{ gap: 10 }}>
          <Input heading="" placeholder="Enter city" />
          <Input heading="" placeholder="Enter state" />
        </View>
        <Input
          heading="If patient was not born in the U.S., when did they arrive?"
          placeholder="Enter month & year"
        />

        {/* Submit & Cancel Buttons */}
        <View style={{ top: -10 }}>
          <Button
            title="Submit Note"
            type="default"
            style={styles.addPaymentButton}
            onPress={() =>
              router.push("/(home-screen-doctor)/home-page-doctor")
            }
          />
          <Button
            title="Cancel"
            type="default"
            style={styles.cancelModalButton}
            textStyle={{ color: "black" }}
            onPress={() =>
              router.push("/(home-screen-doctor)/home-page-doctor")
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddNoteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
  },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 8,
    borderBottomWidth: 0.5,
    borderColor: "#CCCCCC",
  },
  addPaymentButton: {
    width: "100%",
    height: 48,
    backgroundColor: Colors.primary,
    marginBottom: 10,
    marginTop: 30,
  },
  cancelModalButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    width: "100%",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
  sectionTitle1: {
    fontSize: 15,
    fontWeight: "400",
    marginVertical: 10,
    left: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    left: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    left: 10,
  },
  dateText: {
    fontSize: 14,
    color: "#000",
  },
  addAnother: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    marginTop: 10,
    left: 15,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    left: 15,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  radioText: {
    marginLeft: 5,
    fontSize: 16,
    color: "#333",
  },
  dropdownContainer: {
    borderWidth: 0.5,
    borderColor: "#eae5e7",
    borderRadius: 80,
    padding: 13,
    width: 170,
  },
  placeholderStyle: {
    color: "#9E9E9E",
    fontSize: 14,
  },
  rowSpacing: {
    marginBottom: 16,
  },
});
