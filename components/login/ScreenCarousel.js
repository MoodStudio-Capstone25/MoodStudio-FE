import React from "react";
import { StyleSheet, Dimensions, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ScreenCarousel = () => {
  return (
    <LinearGradient
      colors={["#FFF4FC", "#FBF6FF", "#FFFFFF"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <View style={styles.shadow}>
        <Image source={require("../../assets/dummy/main-page.png")} style={styles.image} />
      </View>
    </LinearGradient>
  );
};

export default ScreenCarousel;

// style
const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
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
