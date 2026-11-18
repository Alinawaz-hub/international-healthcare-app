import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";

type Message = {
  id: string;
  sender: "user" | "other";
  text?: string;
  audio?: string;
  time: string;
  date?: string;
};

const ChatDetails = () => {
  const { name } = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "user",
      text: "Hello, how are you today?",
      time: "08:39 pm",
      date: "Sep 12",
    },
    {
      id: "2",
      sender: "other",
      text: "Hello, how are you today?",
      time: "08:39 pm",
      date: "Sep 12",
    },
  ]);
  const [messageInput, setMessageInput] = useState("");

  const sendMessage = () => {
    if (messageInput.trim() === "") return;

    const newMessage: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: messageInput,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setMessageInput("");
  };

  const attachFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];

        const newMessage: Message = {
          id: Math.random().toString(),
          sender: "user",
          text: `📎 ${file.name}`,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages([...messages, newMessage]);
      }
    } catch (error) {
      console.error("File pick error:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.heading}>{name}</Text>

            <FlatList
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View>
                  {item.date && <Text style={styles.date}>{item.date}</Text>}

                  <View
                    style={[
                      styles.messageContainer,
                      item.sender === "user"
                        ? styles.userMessage
                        : styles.otherMessage,
                    ]}
                  >
                    {item.sender === "other" && (
                      <Image
                        source={require("@/assets/images/chat2.png")}
                        style={styles.userImage}
                      />
                    )}

                    <View style={styles.messageBubble}>
                      <Text style={styles.messageText}>{item.text}</Text>
                      <Text style={styles.time}>{item.time}</Text>
                    </View>

                    {item.sender === "user" && (
                      <Image
                        source={require("@/assets/images/chat3.png")}
                        style={styles.userImage}
                      />
                    )}
                  </View>
                </View>
              )}
              contentContainerStyle={{ paddingBottom: 100 }}
              keyboardShouldPersistTaps="handled"
            />

            {/* Message Input */}
            <View style={styles.inputContainer}>
              <TouchableOpacity onPress={attachFile}>
                <FontAwesome
                  name="paperclip"
                  size={20}
                  color="#666"
                  style={styles.icon}
                />
              </TouchableOpacity>

              <TextInput
                placeholder="Write your message"
                style={styles.input}
                value={messageInput}
                onChangeText={setMessageInput}
                placeholderTextColor="#9E9E9E"
              />

              <TouchableOpacity onPress={sendMessage}>
                <FontAwesome
                  name="send"
                  size={20}
                  color="#000"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#FFF",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    marginTop: 15,
  },
  date: {
    textAlign: "center",
    color: "#999",
    marginVertical: 10,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
  },
  otherMessage: {
    alignSelf: "flex-start",
  },
  messageBubble: {
    backgroundColor: "#E0E0E0",
    padding: 10,
    borderRadius: 10,
    maxWidth: "70%",
  },
  messageText: {
    fontSize: 14,
    color: "#000",
  },
  time: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 25,
    position: "absolute",
    bottom: 20,
    left: 15,
    right: 15,
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 10,
  },
  icon: {
    padding: 5,
  },
});
