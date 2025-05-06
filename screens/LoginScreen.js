import React from "react";
import { View } from "react-native";
import Layout from "../layouts/Layout";
import ScreenCarousel from "../components/login/ScreenCarousel";
import LoginSection from "../components/login/LoginSection";

const LoginScreen = ({ navigation }) => {
  return (
    <Layout>
      <View>
        <ScreenCarousel />
        <LoginSection navigation={navigation} />
      </View>
    </Layout>
  );
};

export default LoginScreen;
