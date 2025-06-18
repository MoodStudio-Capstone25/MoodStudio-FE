import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "../screens/MainScreen";
import Edit3DScreen from "../screens/Edit3DScreen";
import Create3DScreen from "../screens/Create3DScreen";

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Edit3D" component={Edit3DScreen} />
      <Stack.Screen name="Create3D" component={Create3DScreen} />
    </Stack.Navigator>
  );
}
