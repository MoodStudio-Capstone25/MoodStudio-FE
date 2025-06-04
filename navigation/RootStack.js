import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AuthStack from "./AuthStack";
import MainTabs from "./MainTabs";
import DetailStack from "./DetailStack";
import SettingsStack from "./SettingsStack";

const Stack = createStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="DetailStack" component={DetailStack} />
      <Stack.Screen name="SettingsStack" component={SettingsStack} />
    </Stack.Navigator>
  );
}
