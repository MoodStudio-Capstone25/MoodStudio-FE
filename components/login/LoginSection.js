import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Typography } from "../../styles/Fonts";

const LoginSection = ({ navigation, height }) => {
  return (
    <View style={[styles.container, { height: height }]}>
      <View style={styles.overlineTextContainer}>
        <Text style={styles.h1}>MoodStudio</Text>
        <Text style={styles.h2}>다양한 취미를 캐비넷에 모아보세요</Text>
      </View>

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => navigation.navigate("Main")}
      >
        {/* <Image source={require("../../assets/icons/login-kakaotalk.svg")} style={styles.image} /> */}
        <Text style={styles.h2}>카카오톡으로 로그인하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginSection;

// style
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",

    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  overlineTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  buttonStyle: {
    marginTop: 36,
    width: "100%",
    height: 54,

    borderRadius: 27,
    borderWidth: 1,
    borderColor: "#333",
    backgroundColor: "#FEE500",

    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 24,
    height: 22,
  },
  // 텍스트 임시(수정예정)
  h1: {
    fontFamily: Typography.Tenada,
    fontSize: 36,
    color: "#333",
  },
  h2: {
    fontFamily: Typography.NanumSquareNeo.extraBold,
    fontSize: 14,
    color: "#333",
  },
});
