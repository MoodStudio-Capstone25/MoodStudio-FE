import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import SectionTitle from "../common/SectionTitle";
import { ScrollView } from "react-native-gesture-handler";
import { Fonts } from "../../../styles/Fonts";

const ThreeDItem = ({ itemName }) => {
  return (
    <TouchableOpacity style={{ marginRight: 12 }}>
      <View style={styles.imageContainer}></View>
      <Text style={[Fonts.subtitle2, styles.itemText]}>{itemName}</Text>
    </TouchableOpacity>
  );
};

const ThreeDList = () => {
  return (
    <ScrollView
      style={styles.listContainer}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ overflow: "visible" }}
      overScrollMode="never"
    >
      <ThreeDItem itemName="책" />
      <ThreeDItem itemName="DVD" />
      <ThreeDItem itemName="게임" />
    </ScrollView>
  );
};

export default ThreeDList;

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 20,
    overflow: "visible", // 안드로이드
  },
  // 아이템
  imageContainer: {
    width: 120,
    height: 120,

    borderRadius: 60,
    borderWidth: 1.5,
  },
  itemText: {
    textAlign: "center",
    marginTop: 8,
  },
});
