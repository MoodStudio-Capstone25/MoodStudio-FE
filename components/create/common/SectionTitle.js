import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Fonts } from "../../../styles/Fonts";

const SectionTitle = ({ titleText, highlightColor }) => {
  return (
    <View style={styles.titleContainer}>
      <View>
        <View style={[styles.titleHighlight, { backgroundColor: highlightColor }]} />
      </View>
      <Text style={[Fonts.subtitle1, styles.titleTextStyle]}>{titleText}</Text>
    </View>
  );
};

export default SectionTitle;

const styles = StyleSheet.create({
  titleContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignSelf: "flex-start",
  },
  titleHighlight: {
    width: "100%",
    height: 16,
    backgroundColor: "#FFE5E2",
    position: "absolute",
    top: 6,
  },
  titleTextStyle: {
    marginHorizontal: 4,
  },
});
