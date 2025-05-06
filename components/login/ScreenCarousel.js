import { StyleSheet, Dimensions, View, Image } from "react-native";
import React from "react";

const ScreenCarousel = () => {
  return (
    <View style={styles.container}>
      <View style={styles.shadow}>
        <Image source={require("../../assets/dummy/main-page.png")} style={styles.image} />
      </View>
    </View>
  );
};

export default ScreenCarousel;

// style
const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    // npx expo install react-native-linear-gradient
    // background: linear-gradient(180deg, #FFF4FC 0%, #FBF6FF 50%, #FFF 100%);
    backgroundColor: "#FFF4FC",
    height: height * 0.6,
    justifyContent: "flex-end",
    alignItems: "center",

    overflow: "hidden",
  },
  shadow: {
    width: 221,
    height: 360,
    backgroundColor: "#6F29A8",
    borderRadius: 24,

    // iOS 그림자
    shadowColor: "rgba(111, 41, 168, 0.25)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 16,

    // Android 그림자
    elevation: 8,
  },
  image: {
    width: 221,
    height: 360,
  },
});
