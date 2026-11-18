import Header from "@/components/user-flow/header";
import { Colors } from "@/constants/Colors";
import React from "react";
import { View, Text, ScrollView } from "react-native";

const PrescriptionDetails = () => {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 15 }}
    >
      {/* Header */}
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFF",
        }}
      >
        <Header
          showBack={true}
          showSearch={false}
          showFilter={false}
          showAdd={false}
          showDownload={true}
        />
      </View>

      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginTop: 20,
          fontFamily: "Raleway-Bold",
        }}
      >
        Prescription Details
      </Text>
      <Text
        style={{
          color: "gray",
          marginTop: 10,
          marginBottom: 10,
          fontFamily: "OpenSans-Regular",
        }}
      >
        All of the prescriptions received by the Therapists from the start
        you’ve registered till date.
      </Text>
      <Text
        style={{
          color: "gray",
          marginBottom: 10,
          fontFamily: "OpenSans-Regular",
        }}
      >
        Service:<Text style={{ color: "black" }}> Skin Care</Text>
      </Text>
      <Text
        style={{
          color: "gray",
          marginBottom: 5,
          fontFamily: "OpenSans-Regular",
        }}
      >
        Date: <Text style={{ color: "black" }}>Jan 23, 2025 | 04:37 pm</Text>
      </Text>

      {/* Doctor Info */}
      <View
        style={{
          backgroundColor: Colors.tertiary,
          padding: 16,
          borderRadius: 10,
          marginTop: 16,
        }}
      >
        {/* ID Container */}
        <View
          style={{
            backgroundColor: Colors.primary,
            padding: 8,
            borderRadius: 80,
            alignSelf: "flex-start",
            marginBottom: 8,
          }}
        >
          <Text style={{ color: "white", fontSize: 14 }}>ID: 5646543</Text>
        </View>

        <Text
          style={{
            fontWeight: "bold",
            fontFamily: "Raleway-Bold",
            fontSize: 18,
            marginBottom: 5,
          }}
        >
          Dr. Joseph Chem
        </Text>
        <Text>M.B.B.S., M.D., M.S. | Reg. No: 1561235</Text>
        <Text>Mob. No: +1 (234) 567-8900</Text>
      </View>

      {/* Prescribed Medicines */}
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 16,
          fontFamily: "Raleway-Bold",
        }}
      >
        Prescribed Medicines
      </Text>

      {[1, 2].map((item) => (
        <View
          key={item}
          style={{
            backgroundColor: "#EBEBEB",
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          {/* Medicine Info Container */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: 8,
            }}
          >
            <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
              <Text style={{ color: "black" }}>Tablet</Text>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  fontFamily: "Raleway-Bold",
                }}
              >
                Demo Med Name 01
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "white",
                padding: 8,
                borderRadius: 80,
                width: 60,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontFamily: "OpenSans-Regular" }}>50 mg</Text>
            </View>
          </View>

          {/* Additional Medicine Details */}
          <View
            style={{
              backgroundColor: "white",
              padding: 12,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}
          >
            <Text
              style={{
                color: "#9E9E9E",
                fontSize: 16,
                fontFamily: "OpenSans-Regular",
              }}
            >
              Duration:<Text style={{ color: "#525252" }}>One Month </Text>{" "}
            </Text>
            <Text
              style={{
                color: "#9E9E9E",
                fontSize: 16,
                fontFamily: "OpenSans-Regular",
              }}
            >
              Taken times:
            </Text>
            <Text
              style={{
                color: "#525252",
                marginTop: 4,
                fontSize: 16,
                fontFamily: "OpenSans-Regular",
              }}
            >
              1 Morning, 1 Afternoon, 1 Evening, 1 Night
            </Text>
          </View>
        </View>
      ))}

      {/* Advice Given */}
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 16,
          fontFamily: "Raleway-Bold",
        }}
      >
        Advise Given
      </Text>
      <Text
        style={{
          color: "#525252",
          fontSize: 16,
          fontFamily: "OpenSans-Regular",
        }}
      >
        Avoid oily and spicy foods.
      </Text>
    </ScrollView>
  );
};

export default PrescriptionDetails;
