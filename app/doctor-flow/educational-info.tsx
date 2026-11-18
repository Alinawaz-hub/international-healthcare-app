import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import HeaderDoctor from "@/components/doctor-flow/header-doc";

const EducationalInfo = () => {
  const [educationList, setEducationList] = useState([
    {
      id: "1",
      degree: "MBBS",
      institute: "Oxford University",
      started: "Sep 2014",
      completion: "Aug 2020",
      address: "4517 Washington Ave. Manchester, Kentucky 39495",
      attachment: "File title.pdf",
      size: "39mb",
    },
    {
      id: "2",
      degree: "FCPS",
      institute: "Oxford University",
      started: "Sep 2014",
      completion: "Aug 2020",
      address: "4517 Washington Ave. Manchester, Kentucky 39495",
      attachment: "File title.pdf",
      size: "39mb",
    },
  ]);

  // Function to delete a card
  const deleteEducation = (id: string) => {
    setEducationList(educationList.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <HeaderDoctor
        showBack={true}
        showSearch={false}
        showFilter={false}
        showAdd={true}
        showDownload={false}
        showShare={false}
      />

      {/* Title */}
      <Text style={styles.title}>Educational Info</Text>

      {/* Education Cards */}
      <FlatList
        data={educationList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Header */}
            <View style={styles.cardHeader}>
              <Text style={styles.degreeTitle}>
                Degree title:{" "}
                <Text style={{ fontWeight: "bold" }}>{item.degree}</Text>
              </Text>
              <TouchableOpacity onPress={() => deleteEducation(item.id)}>
                <FontAwesome name="trash" size={20} color="black" />
              </TouchableOpacity>
            </View>

            {/* Details */}
            <Text style={styles.label}>
              Institute: <Text style={styles.value}>{item.institute}</Text>
            </Text>
            <Text style={styles.label}>
              Started on: <Text style={styles.value}>{item.started}</Text>
            </Text>
            <Text style={styles.label}>
              Completion year:{" "}
              <Text style={styles.value}>{item.completion}</Text>
            </Text>
            <Text style={styles.label}>
              Institute address:{" "}
              <Text style={styles.value}>{item.address}</Text>
            </Text>

            {/* Degree Attachment */}
            <Text style={styles.label}>Degree attachment:</Text>
            <View style={styles.attachment}>
              <FontAwesome name="file-pdf-o" size={20} color="red" />
              <View style={styles.attachmentInfo}>
                <Text style={styles.attachmentText}>{item.attachment}</Text>
                <Text style={styles.attachmentSize}>Size: {item.size}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default EducationalInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 20,
    marginTop: 20,
  },
  card: {
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E0E0E0",
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  degreeTitle: {
    fontSize: 16,
    color: "#000",
  },
  label: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
  value: {
    color: "#000",
    fontWeight: "bold",
  },
  attachment: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  attachmentInfo: {
    marginLeft: 10,
  },
  attachmentText: {
    fontSize: 14,
    color: "#000",
  },
  attachmentSize: {
    fontSize: 12,
    color: "#777",
  },
});
