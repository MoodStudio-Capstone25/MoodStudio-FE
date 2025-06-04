import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DetailScreen from "../screens/DetailScreen";

const Stack = createStackNavigator();

export default function DetailStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}
