import React, { forwardRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TextInputProps,
} from "react-native";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

interface InputProps extends TextInputProps {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  style?: TextInputProps["style"];
  secureTextEntry?: boolean;
  heading?: string;
  error?: string;
  size?: "full" | "half";
}

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      placeholder,
      value,
      onChangeText,
      style,
      secureTextEntry = false,
      heading,
      error,
      size = "full",
      ...rest
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];

    const inputStyles = [
      styles.input,
      {
        backgroundColor: theme.inputBackground,
        borderColor: theme.inputBorder,
        color: theme.inputText,
      },
      isFocused && {
        borderColor: theme.text,
        borderWidth: 1,
      },
      error && styles.inputError,
      style,
    ];

    return (
      <View style={[styles.wrapper, size === "half" && styles.halfWidth]}>
        {heading && (
          <Text style={[styles.heading, { color: theme.text }]}>
            {heading}
          </Text>
        )}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#9E9E9E"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          style={inputStyles}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }
);

export default Input;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  halfWidth: {
    width: "48%", // 👈 Half width for row layouts
  },
  input: {
    height: 48,
    borderRadius: 80,
    borderWidth: 0.5,
    paddingLeft: 20,
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
  },
  heading: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 20,
    paddingBottom: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 8,
  },
});
