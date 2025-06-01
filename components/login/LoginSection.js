import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Fonts } from "../../styles/Fonts";
import KakaotalkIcon from "../../assets/icons/login-kakaotalk.svg";

const LoginSection = ({ navigation, height }) => {
  return (
    <View style={[styles.container, { height: height }]}>
      <View style={styles.overlineTextContainer}>
        <Text style={Fonts.h1}>MoodStudio</Text>
        <Text style={Fonts.subtitle2}>다양한 취미를 캐비넷에 모아보세요</Text>
      </View>

      <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.replace("MainTabs")}>
        <KakaotalkIcon width={24} height={24} />
        <Text style={[Fonts.subtitle2, { marginLeft: 12 }]}>카카오톡으로 로그인하기</Text>
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

    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 24,
    height: 22,
  },
});
