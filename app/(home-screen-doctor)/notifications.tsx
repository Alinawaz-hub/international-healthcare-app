import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import Header from "@/components/doctor-flow/header-doc";

const { width } = Dimensions.get("window");

const notifications = [
  {
    id: "1",
    date: "Today",
    data: [
      {
        id: "101",
        message: "Your order #453548 has been completed.",
        time: "35 min",
        image: require("@/assets/images/1.png"),
      },
      {
        id: "102",
        message: "Your order #453548 has been completed.",
        time: "1hr",
        image: require("@/assets/images/2.png"),
      },
    ],
  },
  {
    id: "2",
    date: "Yesterday",
    data: [
      {
        id: "103",
        message: "Your order #453548 has been cancelled.",
        time: "1d",
        image: require("@/assets/images/icon.png"),
      },
      {
        id: "104",
        message: "Your order #453548 has been cancelled.",
        time: "1d",
        image: require("@/assets/images/5.png"),
      },
      {
        id: "105",
        message: "Your order #453548 has been completed.",
        time: "1d",
        image: require("@/assets/images/6.png"),
      },
    ],
  },
  {
    id: "3",
    date: "Jan 15, 2024",
    data: [
      {
        id: "106",
        message: "Your order #453548 has been completed.",
        time: "2d",
        image: require("@/assets/images/1.png"),
      },
      {
        id: "107",
        message: "Your order #453548 has been completed.",
        time: "2d",
        image: require("@/assets/images/5.png"),
      },
    ],
  },
];

const NotificationsDoc = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFF", paddingHorizontal: 15 }}>
      {/* Sticky Header */}
      <Header
        showBack={true}
        showSearch={false}
        showFilter={false}
        showAdd={false}
        showDownload={false}
        showEdit={false}
        showShare={false}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text style={styles.title}>Notifications You’ve Got In A While</Text>

        {/* Notifications List */}
        {notifications.map((section) => (
          <View key={section.id}>
            <Text style={styles.sectionTitle}>{section.date}</Text>
            {section.data.map((notif) => (
              <View key={notif.id} style={styles.notificationCard}>
                <Image source={notif.image} style={styles.notificationImage} />
                <Text style={styles.notificationText}>{notif.message}</Text>
                <Text style={styles.notificationTime}>{notif.time}</Text>
              </View>
            ))}
          </View>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  markAllButton: {
    backgroundColor: "#E4F1E9",
    alignSelf: "flex-end",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 10,
    top: -25,
  },
  markAllText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: width * 0.035,
    fontFamily: "Raleway-Bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "Raleway-Bold",
    marginBottom: 15,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: width * 0.04,
    fontWeight: "bold",
    color: "#6C757D",
    marginTop: 5,
  },
  notificationCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 80,
    padding: width * 0.03,
    marginTop: 10,
  },
  notificationImage: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.05,
  },
  notificationText: {
    flex: 1,
    marginLeft: 10,
    fontSize: width * 0.035,
    color: "#000",
  },
  notificationTime: {
    fontSize: width * 0.03,
    color: "#6C757D",
  },
});

export default NotificationsDoc;
