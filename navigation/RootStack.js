import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AuthGate from "./AuthGate";
import LoginStack from "./LoginStack";
import MainTabs from "./MainTabs";
import DetailStack from "./DetailStack";
import SettingsStack from "./SettingsStack";

import CabinetTestScreen from "../screens/CabinetTestScreen";

const Stack = createStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthGate" component={AuthGate} />
      <Stack.Screen name="LoginStack" component={LoginStack} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="DetailStack" component={DetailStack} />
      <Stack.Screen name="SettingsStack" component={SettingsStack} />

      {/* 테스트용 화면 */}
      <Stack.Screen name="CabinetTest" component={CabinetTestScreen} />
    </Stack.Navigator>
  );
}
