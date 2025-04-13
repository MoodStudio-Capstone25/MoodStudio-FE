import React from "react";
import { Button, Text, View } from "react-native";
import Layout from "../layouts/Layout";

const LoginScreen = ({ navigation }) => {
  return (
    <Layout>
      <View>
        <Text>LoginScreen</Text>
        <Button title="카카오톡으로 로그인하기" onPress={() => navigation.navigate("Main")} />
      </View>
    </Layout>
  );
};

export default LoginScreen;
