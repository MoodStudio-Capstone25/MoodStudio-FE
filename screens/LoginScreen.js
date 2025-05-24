import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import Layout from "../layouts/Layout";
import ScreenCarousel from "../components/login/ScreenCarousel";
import LoginSection from "../components/login/LoginSection";

const LoginScreen = ({ navigation }) => {
  const { height } = useWindowDimensions();

  return (
    <Layout fullBackgroundCSS={styles.fullBackgroundCSS}>
      <ScreenCarousel height={height * 0.6} />
      {/* 컴포넌트 기능 추가 예정 */}
      <View style={styles.indicatorDotWrapper}>
        <View style={styles.indicatorDotSelected} />
        <View style={styles.indicatorDot} />
        <View style={styles.indicatorDot} />
      </View>
      <LoginSection navigation={navigation} height={height * 0.4} />
    </Layout>
  );
};

export default LoginScreen;

// style
const styles = StyleSheet.create({
  fullBackgroundCSS: {
    backgroundColor: "#FFF4FC",
  },
  indicatorDotWrapper: {
    marginTop: -20,
    marginBottom: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  indicatorDotSelected: {
    marginHorizontal: 4,
    width: 8,
    height: 8,
    backgroundColor: "#000",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#000",
  },
  indicatorDot: {
    marginHorizontal: 4,
    width: 6,
    height: 6,
    backgroundColor: "#FFF",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#000",
  },
});
