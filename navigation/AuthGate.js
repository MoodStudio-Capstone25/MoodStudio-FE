import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, ActivityIndicator } from "react-native";
import * as SecureStore from "expo-secure-store";

const Stack = createStackNavigator();

export default function AuthGate({ navigation }) {
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const access = await SecureStore.getItemAsync("access");
        const refresh = await SecureStore.getItemAsync("refresh");

        // access 유효 체크
        if (access) {
          if (mounted) navigation.replace("MainTabs");
        } else {
          if (mounted) navigation.replace("LoginStack");
        }

        // refresh 갱신 시도 (있을 때만) (추가하기)
        // access 토큰 없음
      } catch {
        if (mounted) navigation.replace("LoginStack");
      }
    })();

    return () => {
      mounted = false;
    };
  }, [navigation]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator />
    </View>
  );
}
