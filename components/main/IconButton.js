import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

const IconButton = ({ IconComponent, onPress, style, iconProps }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <IconComponent width={24} height={24} {...iconProps} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E5CBFF",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
});

export default IconButton;
