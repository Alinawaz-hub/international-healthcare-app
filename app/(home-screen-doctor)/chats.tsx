import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import HeaderDoctor from "../../components/doctor-flow/header-doc";

const chats = [
  {
    id: "1",
    name: "Usman Sindhu",
    message: "Are you there?",
    time: "5 min",
    image: require("@/assets/images/chat1.png"),
  },
  {
    id: "2",
    name: "Ch Umair",
    message: "Are you there?",
    time: "8 hrs",
    image: require("@/assets/images/chat2.png"),
  },
  {
    id: "3",
    name: "Ch Mohsin",
    message: "Are you there?",
    time: "3 mo",
    image: require("@/assets/images/chat3.png"),
  },
  {
    id: "4",
    name: "Ch Hassan",
    message: "Are you there?",
    time: "5 mo",
    image: require("@/assets/images/chat4.png"),
  },
];

const ChatsDoc = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFF", paddingHorizontal: 15 }}>
      <HeaderDoctor
        showBack={true}
        showSearch={true}
        showFilter={false}
        showAdd={false}
        showDownload={false}
        showEdit={false}
        showShare={false}
      />
      <Text style={styles.heading}>Chat</Text>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatCard}
            onPress={() =>
              router.push({
                pathname: "/doctor-flow/chat-details",
                params: { name: item.name },
              })
            }
          >
            <Image source={item.image} style={styles.userImage} />
            <View style={styles.chatInfo}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.message}>{item.message}</Text>
            </View>
            <Text style={styles.time}>{item.time}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ChatsDoc;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 15,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    marginTop: 20,
  },
  chatCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 80,
    marginBottom: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  chatInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  message: {
    fontSize: 14,
    color: "#666",
  },
  time: {
    fontSize: 12,
    color: "#999",
  },
});
