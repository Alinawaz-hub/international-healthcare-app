import React, { forwardRef, useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  Text,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

interface PasswordInputProps extends TextInputProps {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  style?: TextInputProps["style"];
  error?: string;
}

const PasswordInput = forwardRef<TextInput, PasswordInputProps>(
  ({ placeholder, value, onChangeText, style, error, ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { width } = useWindowDimensions();
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];

    const inputContainerStyles = [
      styles.inputContainer,
      { 
        width: width * 0.9,
        backgroundColor: theme.inputBackground,
        borderColor: theme.inputBorder,
      },
      isFocused && {
        borderColor: theme.text,
        borderWidth: 1,
      },
      error && styles.inputError,
    ];

    return (
      <View style={[styles.container, { width: width * 0.9 }]}>
        <View style={inputContainerStyles}>
          <TextInput
            ref={ref}
            placeholder={placeholder}
            placeholderTextColor="#9E9E9E"
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={!showPassword}
            style={[
              styles.input, 
              { color: "#000000" }, // Hardcoded black text
              style
            ]}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...rest}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={22}
              color={error ? "red" : "#767E8C"}
            />
          </TouchableOpacity>
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export default PasswordInput;

const styles = StyleSheet.create({
  container: {
    width: "90%", 
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    borderRadius: 80,
    borderWidth: 1,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    height: "100%",
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 12,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 8,
  },
});
