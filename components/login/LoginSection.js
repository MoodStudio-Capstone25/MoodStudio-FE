import { Button, Text, View } from "react-native";
import React from "react";

const LoginSection = ({ navigation }) => {
  return (
    <View>
      <Text>LoginSection</Text>
      <Button title="카카오톡으로 로그인하기" onPress={() => navigation.navigate("Main")} />
    </View>
  );
};

export default LoginSection;
