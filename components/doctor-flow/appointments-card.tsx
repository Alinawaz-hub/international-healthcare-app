import { Colors } from "@/constants/Colors";
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Svg, Circle } from "react-native-svg";

type AppointmentsCardProps = {
  progress?: number;
};

const AppointmentsCard: React.FC<AppointmentsCardProps> = ({
  progress = 0.6,
}) => {
  const size = 120;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressValue = circumference * (1 - progress);

  return (
    <View style={styles.card}>
      {/* Left Side Content */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Appointments</Text>
        <Text style={styles.description}>
          Total no. of Appointments/{"\n"}Appointments you need to attend.
        </Text>

        {/* Legend Section */}
        <View style={styles.legendContainer}>
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: "#EBEBEB" }]} />
              <Text style={styles.legendText}>Total</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: Colors.primary }]} />
              <Text style={styles.legendText}>Upcoming</Text>
            </View>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: Colors.secondary }]} />
            <Text style={styles.legendText}>Completed</Text>
          </View>
        </View>
      </View>

      {/* Circular Progress Bar */}
      <View style={styles.progressContainer}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#EBEBEB"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={Colors.primary}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - 0.6)}
            strokeLinecap="round"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={Colors.secondary}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - 0.3)}
            strokeLinecap="square"
          />
        </Svg>
        <View style={styles.textOverlay}>
          <Text style={styles.confirmedText}>
            Confirmed Appt’s{"\n"}this month.
          </Text>
          <Text style={styles.count}>08</Text>
        </View>
      </View>
    </View>
  );
};
const { width } = Dimensions.get("window");
export default AppointmentsCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1F1F1F",
    borderRadius: 12,
    width: width * 0.92,
    height: width * 0.42,
    flexDirection: "row",
    padding: 16,
    marginTop: 10,
    alignSelf: "center",
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  description: {
    fontSize: 12,
    color: "#B0B0B0",
    marginTop: 4,
  },
  legendContainer: {
    marginTop: 12,
  },
  legendRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
    marginTop: 4,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: "#FFFFFF",
  },
  progressContainer: {
    justifyContent: "center",
  },
  textOverlay: {
    position: "absolute",
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmedText: {
    fontSize: 10,
    color: "#FFFFFF",
    textAlign: "center",
  },
  count: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 4,
  },
});
