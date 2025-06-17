import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import SectionTitle from "../common/SectionTitle";
import { ScrollView } from "react-native-gesture-handler";
import { Fonts } from "../../../styles/Fonts";

const threeDImages = {
  // 추가 예정
  book: require("../../../assets/images/3d-items/book1.png"),
  dvd: require("../../../assets/images/3d-items/music1.png"),
  game: require("../../../assets/images/3d-items/game1.png"),
};

const ThreeDItem = ({ itemName, itemImage }) => {
  return (
    <TouchableOpacity style={{ marginRight: 12 }}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={itemImage} />
      </View>
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
      <ThreeDItem itemName="책" itemImage={threeDImages.book} />
      <ThreeDItem itemName="DVD" itemImage={threeDImages.dvd} />
      <ThreeDItem itemName="게임" itemImage={threeDImages.game} />
      <ThreeDItem itemName="책" itemImage={threeDImages.book} />
      <ThreeDItem itemName="DVD" itemImage={threeDImages.dvd} />
      <ThreeDItem itemName="게임" itemImage={threeDImages.game} />
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
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  itemText: {
    textAlign: "center",
    marginTop: 8,
  },
});
