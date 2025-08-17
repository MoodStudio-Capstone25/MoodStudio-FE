import React, { useEffect } from "react";
import { Alert, Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as AuthSession from "expo-auth-session";
import { KAKAO_REST_API_KEY, BACKEND_API_URL } from "@env";
import { Fonts } from "../../styles/Fonts";
import KakaotalkIcon from "../../assets/icons/login-kakaotalk.svg";

const discovery = {
  authorizationEndpoint: "https://kauth.kakao.com/oauth/authorize",
  tokenEndpoint: "https://kauth.kakao.com/oauth/token",
};

const USE_PROXY = false;

const LoginSection = ({ navigation, height }) => {
  const redirectUri = AuthSession.makeRedirectUri({
    scheme: "moodstudio",
    path: "redirect",
    useProxy: USE_PROXY,
  });

  useEffect(() => {
    console.log("Kakao Redirect URI >>>", redirectUri);
    // 이 주소를 카카오 콘솔 Redirect URI에 그대로 추가 등록!
  }, [redirectUri]);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: KAKAO_REST_API_KEY,
      responseType: AuthSession.ResponseType.Code,
      scopes: ["account_email"],
      redirectUri: `${BACKEND_API_URL}/`,
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      Alert.alert("인가코드 수신", code.slice(0, 10) + "...");
      console.log("AUTH CODE >>>", code);
    }
  }, [response]);

  return (
    <View style={[styles.container, { height: height }]}>
      <View style={styles.overlineTextContainer}>
        <Text style={Fonts.h1}>MoodStudio</Text>
        <Text style={Fonts.subtitle2}>다양한 취미를 캐비넷에 모아보세요</Text>
      </View>

      <TouchableOpacity
        disabled={!request}
        onPress={() => promptAsync({ useProxy: USE_PROXY })}
        style={styles.buttonStyle}
      >
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
