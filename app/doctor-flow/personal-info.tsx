import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import HeaderDoctor from "@/components/doctor-flow/header-doc";

export default function PersonalInfo() {
  const [profileImage, setProfileImage] = useState(
    require("@/assets/images/profile-image.png")
  );
  const [email, setEmail] = useState("guyhawkins56@gmail.com");
  const [contact, setContact] = useState("+1 (234) 567-8900");
  const [address, setAddress] = useState("4517 Washington Ave. Ma...");
  const [dob, setDob] = useState("Sep 01, 2024");
  const [sex, setSex] = useState("Male");

  const [isEditing, setIsEditing] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setProfileImage({ uri: result.assets[0].uri });
    }
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
      <Text style={styles.title}>Profile Settings</Text>

      {/* Profile Image */}
      <TouchableOpacity onPress={pickImage}>
        <Image source={profileImage} style={styles.profileImage} />
      </TouchableOpacity>

      <Text style={styles.name}>Guy Hawkins</Text>
      <Text style={styles.since}>Since: January 17, 2025</Text>

      {/* Editable Fields */}
      {renderEditableField(
        "Email",
        email,
        setEmail,
        isEditing,
        setIsEditing,
        "email"
      )}
      {renderEditableField(
        "Contact no",
        contact,
        setContact,
        isEditing,
        setIsEditing,
        "contact"
      )}
      {renderEditableField(
        "Address",
        address,
        setAddress,
        isEditing,
        setIsEditing,
        "address"
      )}
      {renderEditableField(
        "Date of birth",
        dob,
        setDob,
        isEditing,
        setIsEditing,
        "dob",
        false
      )}
      {renderEditableField(
        "Sex",
        sex,
        setSex,
        isEditing,
        setIsEditing,
        "sex",
        false
      )}
    </View>
  );
}

const renderEditableField = (
  label: string,
  value: string,
  setValue: (text: string) => void,
  isEditing: string | null,
  setIsEditing: (value: string | null) => void,
  fieldKey: string,
  editable = true
) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}:</Text>
      {isEditing === fieldKey ? (
        <TextInput
          style={styles.input}
          value={String(value) || ""}
          onChangeText={setValue}
          onBlur={() => setIsEditing(null)}
          autoFocus
          placeholderTextColor="#9E9E9E"
        />
      ) : (
        <Text style={styles.value}>{value}</Text>
      )}
      {editable && (
        <TouchableOpacity onPress={() => setIsEditing(fieldKey)}>
          <Image
            source={require("@/assets/images/edit.png")}
            style={styles.editIconSmall}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 20,
    alignSelf: "flex-start",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 50,
    alignSelf: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    alignSelf: "center",
  },
  since: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
    alignSelf: "center",
  },
  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgb(98%, 98%, 98%)",
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    width: "90%",
    alignSelf: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "gray",
    flex: 1,
  },
  value: {
    fontSize: 14,
    flex: 2,
  },
  input: {
    fontSize: 14,
    flex: 2,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  editIconSmall: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
});
