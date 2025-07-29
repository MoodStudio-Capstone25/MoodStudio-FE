import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DetailScreen from "../screens/DetailScreen";
import EditScreen from "../screens/EditScreen";

const Stack = createStackNavigator();

export default function DetailStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Edit" component={EditScreen} />
    </Stack.Navigator>
  );
}
