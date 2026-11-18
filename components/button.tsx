import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  Dimensions,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

const { width } = Dimensions.get("window");

type ButtonProps = TouchableOpacityProps & {
  type: "default" | "small";
  title: string;
  textStyle?: object;
};

export default function Button({
  title,
  type = "default",
  style,
  textStyle,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[type === "default" ? styles.defaultbtn : styles.smallbtn, style]}
      {...rest}
    >
      <Text style={[styles.btnText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  defaultbtn: {
    width: width * 0.9,
    height: 48,
    backgroundColor: Colors.primary,
    borderRadius: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  smallbtn: {
    width: width * 0.45,
    height: 40,
    backgroundColor: Colors.primary,
    borderRadius: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 16.8,
    color: "#FFFFFF",
  },
});
