import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import HeaderDoctor from "@/components/doctor-flow/header-doc";
import { Colors } from "@/constants/Colors";

const medicalRecords = [
  {
    date: "Nov 12, 2025",
    firstTherapy: "No",
    takingMedicine: "No",
    lastVisit: "About a week ago",
    preCondition: "Normal",
    currentCondition: "Serious",
    therapistHelp:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.",
    email: "alexander39@gmail.com",
    reports: [
      { title: "Report title", file: "File title.pdf", size: "39mb" },
      { title: "Report title", file: "File title.pdf", size: "39mb" },
    ],
  },
  {
    date: "Nov 15, 2025",
    firstTherapy: "No",
    takingMedicine: "No",
    lastVisit: "Two weeks ago",
    preCondition: "Normal",
    currentCondition: "Moderate",
    therapistHelp:
      "Patient reported mild discomfort in movement. Further examination suggested.",
    email: "john.doe@email.com",
    reports: [
      { title: "Report title", file: "File title.pdf", size: "39mb" },
      { title: "Report title", file: "File title.pdf", size: "39mb" },
    ],
  },
];

const MedicalHistory = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFF", paddingHorizontal: 15 }}>
      <HeaderDoctor
        showBack={true}
        showSearch={false}
        showFilter={false}
        showAdd={false}
        showDownload={false}
        showEdit={false}
        showShare={false}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 16,
            marginTop: 15,
          }}
        >
          Medical History
        </Text>
        {medicalRecords.map((record, index) => (
          <View
            key={index}
            style={{
              backgroundColor: "#F5F5F5",
              padding: 16,
              borderRadius: 8,
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                backgroundColor: Colors.primary,
                color: "white",
                padding: 8,
                borderRadius: 80,
                alignSelf: "flex-start",
              }}
            >
              Date: {record.date}
            </Text>
            <Text style={{ color: "gray", marginTop: 8 }}>
              Is it your first therapy?
            </Text>
            <Text>{record.firstTherapy}</Text>
            <Text style={{ color: "gray", marginTop: 10 }}>
              Are you taking any medicine?
            </Text>
            <Text>{record.takingMedicine}</Text>
            <Text style={{ color: "gray", marginTop: 10 }}>
              When was your last visit?
            </Text>
            <Text>{record.lastVisit}</Text>
            <Text style={{ color: "gray", marginTop: 10 }}>
              Pre condition: {record.preCondition} | Current condition:{" "}
              {record.currentCondition}
            </Text>
            <Text style={{ color: "gray", marginTop: 10 }}>
              How can a Therapist help you?
            </Text>
            <Text style={{ color: "black", marginBottom: 8 }}>
              {record.therapistHelp}
            </Text>
            <Text style={{ color: "gray" }}>Invoice will be sent to</Text>
            <Text>{record.email}</Text>
            <Text
              style={{
                fontWeight: "bold",
                marginTop: 8,
                fontSize: 20,
                marginBottom: 10,
              }}
            >
              Reports Attached
            </Text>
            {record.reports.map((report, idx) => (
              <View key={idx} style={{ marginBottom: 10 }}>
                <Text
                  style={{ fontWeight: "bold", fontSize: 14, color: "gray" }}
                >
                  {report.title}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 4,
                  }}
                >
                  <Image
                    source={require("../../assets/images/pdf.png")}
                    style={{ width: 24, height: 24, marginRight: 8 }}
                  />
                  <View>
                    <Text>{report.file}</Text>
                    <Text style={{ color: "gray", fontSize: 12 }}>
                      Size: {report.size}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MedicalHistory;
