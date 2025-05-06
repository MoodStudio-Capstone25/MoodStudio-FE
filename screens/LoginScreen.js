import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import Layout from "../layouts/Layout";
import ScreenCarousel from "../components/login/ScreenCarousel";
import LoginSection from "../components/login/LoginSection";

const LoginScreen = ({ navigation }) => {
  const { height } = useWindowDimensions();

  return (
    <Layout fullBackgroundCSS={styles.fullBackgroundCSS}>
      <ScreenCarousel height={height * 0.6} />
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
});
