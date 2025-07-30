import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Fonts } from "../../styles/Fonts";

const CustomButton = ({ buttonText, buttonLayoutProps, onPress }) => {
  // 기능 추가 필요

  return (
    <View style={[styles.buttonLayout, buttonLayoutProps]}>
      <TouchableOpacity style={[styles.buttonStyle]} onPress={onPress}>
        <Text style={[Fonts.subtitle1, { color: "#FFFFFF" }]}>
          {buttonText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonLayout: {
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  buttonStyle: {
    height: 52,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 26,
    borderWidth: 1.5,
    backgroundColor: "#C881FF",
  },
});
