import React, { useState, useEffect } from "react";
import { Alert, Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as AuthSession from "expo-auth-session";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { KAKAO_REST_API_KEY, BACKEND_API_URL } from "@env";
import { Fonts } from "../../styles/Fonts";
import KakaotalkIcon from "../../assets/icons/login-kakaotalk.svg";

const discovery = {
  authorizationEndpoint: "https://kauth.kakao.com/oauth/authorize",
  tokenEndpoint: "https://kauth.kakao.com/oauth/token",
};

const USE_PROXY = false;

const LoginSection = ({ navigation, height }) => {
  // 카카오 임시 인가코드(하드코딩.. 추후 삭제 필요) // 여기에 넣어주시면 됩니다!
  const [devKakaoAuthCode, setDevKakaoAuthCode] = useState(
    "DiiH8pfDnBowgfzULUg9zayJVjYIo9vpLVpxS-Cp85mxAGKLkUl24AAAAAQKDRlTAAABmQk2uSwhI_W2iNNaegg"
  );

  const [loading, setLoading] = useState(false);

  const KAKAO_REDIRECT_URI = `${BACKEND_API_URL}/`;

  const postKakaoAccessToken = async () => {
    // 카카오 임시 인가코드
    if (!devKakaoAuthCode) {
      Alert.alert("필요 정보 누락", "인가코드를 입력하세요.");
      return;
    }

    try {
      setLoading(true);

      // 카카오 액세스 토큰
      const form = new URLSearchParams({
        grant_type: "authorization_code",
        client_id: KAKAO_REST_API_KEY,
        redirect_uri: KAKAO_REDIRECT_URI,
        code: devKakaoAuthCode,
      });

      const { data: kakaoTokenData } = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        form.toString(),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      const kakaoAccessToken = kakaoTokenData?.access_token;
      if (!kakaoAccessToken) throw new Error("카카오 access_token을 받지 못했습니다.");
      // console.log("kakaoAccessToken >>> ", kakaoAccessToken); // 카카오 액세스 토큰

      // 백엔드 로그인(JWT 발급)
      const { data: apiData } = await axios.post(
        `${BACKEND_API_URL}/users/auth/kakao/`,
        { access_token: kakaoAccessToken },
        { headers: { "Content-Type": "application/json" } }
      );

      const { tokens, user } = apiData || {};
      if (!tokens?.access || !tokens?.refresh) {
        throw new Error("백엔드로부터 올바른 JWT를 받지 못했습니다.");
      }

      // 토큰 안전 저장
      await SecureStore.setItemAsync("access", tokens.access);
      await SecureStore.setItemAsync("refresh", tokens.refresh);

      console.log("user:", user); // {"cabinet_public": true, "email": "usernumber42@naver.com"}
      navigation.replace("MainTabs");
    } catch (error) {
      const st = error?.response?.status;
      const d = error?.response?.data;
      const msg =
        d?.error_description || // 카카오가 내려주는 상세 사유
        d?.error || // 카카오 에러 코드
        error?.message || // 일반 에러
        "로그인 처리 중 오류가 발생했습니다.";

      console.error("LOGIN ERROR >>>", { status: st, data: d });
      Alert.alert("로그인 실패 ", String(msg));
    } finally {
      setLoading(false);
    }
  };

  // // 추후 백엔드 수정시 활용 // 인가코드 삭제
  // const redirectUri = AuthSession.makeRedirectUri({
  //   scheme: "moodstudio",
  //   path: "redirect",
  //   useProxy: USE_PROXY,
  // });

  // useEffect(() => {
  //   console.log("Kakao Redirect URI >>>", redirectUri);
  //   // 이 주소를 카카오 콘솔 Redirect URI에 그대로 추가 등록!
  // }, [redirectUri]);

  // const [request, response, promptAsync] = AuthSession.useAuthRequest(
  //   {
  //     clientId: KAKAO_REST_API_KEY,
  //     responseType: AuthSession.ResponseType.Code,
  //     scopes: ["account_email"],
  //     redirectUri: `${BACKEND_API_URL}/`,
  //   },
  //   discovery
  // );

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     const { code } = response.params;
  //     Alert.alert("인가코드 수신", code.slice(0, 10) + "...");
  //     console.log("AUTH CODE >>>", code);
  //   }
  // }, [response]);

  return (
    <View style={[styles.container, { height: height }]}>
      <View style={styles.overlineTextContainer}>
        <Text style={Fonts.h1}>MoodStudio</Text>
        <Text style={Fonts.subtitle2}>다양한 취미를 캐비넷에 모아보세요</Text>
      </View>

      <TouchableOpacity
        onPress={postKakaoAccessToken}
        disabled={loading}
        style={styles.buttonStyle}
      >
        <KakaotalkIcon width={24} height={24} />
        <Text style={[Fonts.subtitle2, { marginLeft: 12 }]}>
          {loading ? "요청 중..." : "카카오톡으로 로그인하기"}
        </Text>
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
