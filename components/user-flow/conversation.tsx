import React, { useState, useEffect } from "react";
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
} from "react-native";
import { useLocalSearchParams } from "expo-router";
// Mock Audio for static UI
const Audio = {
  Recording: class MockRecording {
    async prepareToRecordAsync(options?: any) {}
    async startAsync() {}
    async stopAndUnloadAsync() {}
    getURI() { return "mock-audio-uri"; }
  },
  RecordingOptionsPresets: {
    HIGH_QUALITY: {}
  },
  requestPermissionsAsync: async () => ({ status: "granted" }),
  Sound: class MockSound {
    static createAsync(options?: any) { return Promise.resolve({ sound: new MockSound() }); }
    async playAsync() {}
    async unloadAsync() {}
  }
};
import { FontAwesome } from "@expo/vector-icons";

// Define message type
type Message = {
  id: string;
  sender: "user" | "other";
  text?: string;
  audio?: string;
  time: string;
  date?: string;
};

export default function ChatDetails() {
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
  const [recording, setRecording] = useState<any>(null);

  // Function to send a text message
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

  // Function to start recording
  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access the microphone is required!");
        return;
      }

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      await newRecording.startAsync();
      setRecording(newRecording);
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  };

  // Function to stop recording and send the voice message
  const stopRecording = async () => {
    try {
      if (!recording) return;
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);

      if (uri) {
        const newMessage: Message = {
          id: Math.random().toString(),
          sender: "user",
          audio: uri,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setMessages([...messages, newMessage]);
      }
    } catch (error) {
      console.error("Failed to stop recording:", error);
    }
  };

  // Function to play voice message
  const playAudio = async (uri: string) => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri });
      await sound.playAsync();
    } catch (error) {
      console.error("Failed to play audio:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
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
                {item.audio ? (
                  <TouchableOpacity onPress={() => playAudio(item.audio!)}>
                    <FontAwesome name="play-circle" size={24} color="#000" />
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.messageText}>{item.text}</Text>
                )}
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
      />

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={recording ? stopRecording : startRecording}>
          <FontAwesome
            name="microphone"
            size={20}
            color={recording ? "red" : "#666"}
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
          <FontAwesome name="send" size={20} color="#000" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 15,
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
    marginTop: 20,
    top: -10,
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
