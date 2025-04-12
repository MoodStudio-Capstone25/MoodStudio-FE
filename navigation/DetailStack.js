import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CreateScreen from "../screens/CreateScreen";

const Stack = createStackNavigator();

export default function DetailStack() {
  return (
    <Stack.Navigator initialRouteName="Create">
      <Stack.Screen name="Create" component={CreateScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
