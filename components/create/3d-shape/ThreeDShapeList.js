import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import SectionTitle from "../common/SectionTitle";
import { ScrollView } from "react-native-gesture-handler";
import { Fonts } from "../../../styles/Fonts";
import { threeDItems } from "../../../constants/threeDItems";

const ThreeDItem = ({ itemName, itemImage, isChecked = false, onPress }) => {
  return (
    <TouchableOpacity style={{ marginRight: 12 }} onPress={onPress}>
      <View style={styles.imageContainer}>
        <View style={[styles.doubleCircle, isChecked ? null : { borderColor: "#FFFFFF" }]}>
          <Image style={styles.image} source={itemImage} />
        </View>
      </View>
      <Text style={[Fonts.subtitle2, styles.itemText]}>{itemName}</Text>
    </TouchableOpacity>
  );
};

const ThreeDShapeList = ({ selectedShape, setSelectedShape }) => {
  return (
    <ScrollView
      style={styles.listContainer}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ overflow: "visible" }}
      overScrollMode="never"
    >
      {threeDItems.map((item) => (
        <ThreeDItem
          key={item.key}
          itemName={item.labelKo}
          itemImage={item.image}
          isChecked={item.key === selectedShape}
          onPress={() => setSelectedShape(item.key)}
        />
      ))}
    </ScrollView>
  );
};

export default ThreeDShapeList;

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
    borderColor: "#333333",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  doubleCircle: {
    width: 112,
    height: 112,
    borderRadius: 60,
    borderWidth: 1.5,
    borderColor: "#333333",
  },
  image: {
    width: 109,
    height: 109,
    borderRadius: 60,
  },
  itemText: {
    textAlign: "center",
    marginTop: 8,
  },
});
