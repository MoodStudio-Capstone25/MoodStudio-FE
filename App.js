import { enableScreens } from "react-native-screens";
enableScreens();

import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AuthStack from "./navigation/AuthStack";
import MainStack from "./navigation/MainStack";
import DetailStack from "./navigation/DetailStack";

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await SplashScreen.preventAutoHideAsync();
      await Font.loadAsync({
        Tenada: require("./assets/fonts/Tenada.ttf"),
        "NanumSquareNeo-cBd": require("./assets/fonts/NanumSquareNeo-cBd.ttf"),
        "NanumSquareNeo-dEb": require("./assets/fonts/NanumSquareNeo-dEb.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth">
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={MainStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Detail"
            component={DetailStack}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
