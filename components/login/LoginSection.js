import React, { useState, useEffect } from "react";
import { Alert, Text, View, StyleSheet, TouchableOpacity, Linking } from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { KAKAO_REST_API_KEY, BACKEND_API_URL } from "@env";
import { Fonts } from "../../styles/Fonts";
import KakaotalkIcon from "../../assets/icons/login-kakaotalk.svg";

const LoginSection = ({ navigation, height }) => {
  const [loading, setLoading] = useState(false);

  const KAKAO_REDIRECT_URI = `${BACKEND_API_URL}/users/`;

  // 03. 카카오 인가코드로 JWT 토큰 받기
  const handleKakaoRedirect = async (url) => {
    try {
      // console.log("handleKakaoRedirect url >>>", url);

      if (loading) return;
      setLoading(true);

      let authCode = null;

      try {
        const parsed = new URL(url);
        authCode = parsed.searchParams.get("code");
      } catch (e) {
        // URL 클래스를 못 쓰는 환경이면 수동 파싱
        const queryString = url.split("?")[1] || "";
        const params = new URLSearchParams(queryString);
        authCode = params.get("code");
      }

      if (!authCode) {
        Alert.alert("로그인 실패", "인가코드(code)를 찾지 못했습니다.");
        return;
      }

      // console.log("카카오 인가코드 >>>", authCode);

      // 03-1. JWT 받기
      const form = new URLSearchParams({
        grant_type: "authorization_code",
        client_id: KAKAO_REST_API_KEY,
        redirect_uri: KAKAO_REDIRECT_URI,
        code: authCode,
      });

      const { data: kakaoTokenData } = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        form.toString(),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      const kakaoAccessToken = kakaoTokenData?.access_token;
      if (!kakaoAccessToken) {
        throw new Error("카카오 access_token을 받지 못했습니다.");
      }

      // console.log("kakaoAccessToken >>>", kakaoAccessToken);

      // 500에러
      const { data: apiData } = await axios.post(
        `${BACKEND_API_URL}/users/auth/kakao/`,
        { access_token: kakaoAccessToken },
        { headers: { "Content-Type": "application/json" } }
      );

      const { tokens, user } = apiData || {};
      if (!tokens?.access || !tokens?.refresh) {
        throw new Error("백엔드로부터 올바른 JWT를 받지 못했습니다.");
      }

      // 03-2. JWT를 안전하게 저장
      await SecureStore.setItemAsync("access", tokens.access);
      await SecureStore.setItemAsync("refresh", tokens.refresh);

      navigation.replace("MainTabs");

      // console.log("tokens:", tokens);
      console.log("user:", user); // 사용자 정보(설정 페이지에 사용)
      //////////
    } catch (error) {
      const st = error?.response?.status;
      const d = error?.response?.data;
      const msg =
        d?.error_description || // 카카오에서 내려주는 상세 사유
        d?.error || // 카카오 에러 코드
        error?.message ||
        "로그인 처리 중 오류가 발생했습니다.";

      console.error("LOGIN ERROR >>>", { status: st, data: d });
      Alert.alert("로그인 실패", String(msg));
    } finally {
      setLoading(false);
    }
  };

  // 02. 카카오 인가코드 받기
  useEffect(() => {
    const handler = (event) => {
      handleKakaoRedirect(event.url);
    };

    const sub = Linking.addEventListener("url", handler);

    Linking.getInitialURL().then((url) => {
      if (url) handler({ url });
    });

    return () => {
      if (sub && typeof sub.remove === "function") {
        // 새 버전 RN
        sub.remove();
      } else {
        // 예전 RN 버전 호환용
        Linking.removeEventListener("url", handler);
      }
    };
  }, []);

  // 01. 카카오 로그인 페이지로 보내기
  const startKakaoLogin = async () => {
    if (loading) return;

    try {
      const authUrl =
        `https://kauth.kakao.com/oauth/authorize` +
        `?response_type=code&scope=account_email` +
        `&client_id=${KAKAO_REST_API_KEY}` +
        `&redirect_uri=${encodeURIComponent(KAKAO_REDIRECT_URI)}`;

      await Linking.openURL(authUrl);
    } catch (error) {
      console.error("KAKAO AUTH URL ERROR >>>", error);

      Alert.alert("로그인 실패", "카카오 로그인 페이지를 여는 중 문제가 발생했습니다.");
    }
  };

  return (
    <View style={[styles.container, { height: height }]}>
      <View style={styles.overlineTextContainer}>
        <Text style={Fonts.h1}>MoodStudio</Text>
        <Text style={Fonts.subtitle2}>다양한 취미를 캐비넷에 모아보세요</Text>
      </View>

      <TouchableOpacity onPress={startKakaoLogin} disabled={loading} style={styles.buttonStyle}>
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
