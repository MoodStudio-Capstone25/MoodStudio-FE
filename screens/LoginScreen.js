import React from "react";
import { StyleSheet, View } from "react-native";
import Layout from "../layouts/Layout";
import ScreenCarousel from "../components/login/ScreenCarousel";
import LoginSection from "../components/login/LoginSection";

const LoginScreen = ({ navigation }) => {
  return (
    <Layout fullBackgroundCSS={styles.fullBackgroundCSS}>
      <View style={styles.container}>
        <ScreenCarousel />
        <LoginSection navigation={navigation} />
      </View>
    </Layout>
  );
};

export default LoginScreen;

// style
const styles = StyleSheet.create({
  fullBackgroundCSS: {
    backgroundColor: "#FFF4FC",
  },
  container: {
    backgroundColor: "#FFF4FC",
  },
});
