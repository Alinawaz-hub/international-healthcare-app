import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MonthSelector = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    new Date().getMonth()
  );

  const goToPreviousMonth = () => {
    setCurrentMonthIndex((prev) => (prev === 0 ? 11 : prev - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonthIndex((prev) => (prev === 11 ? 0 : prev + 1));
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "white",
      }}
    >
      {/* Back Arrow */}
      <TouchableOpacity onPress={goToPreviousMonth}>
        <Ionicons name="chevron-back" size={20} color="black" />
      </TouchableOpacity>

      {/* Month Name */}
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        {months[currentMonthIndex]}
      </Text>

      {/* Forward Arrow */}
      <TouchableOpacity onPress={goToNextMonth}>
        <Ionicons name="chevron-forward" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default MonthSelector;
