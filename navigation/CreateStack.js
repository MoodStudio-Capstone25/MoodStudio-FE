import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CreateScreen from "../screens/CreateScreen";
import WirteScreen from "../screens/WirteScreen";

const Stack = createStackNavigator();

export default function CreateStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Create" component={CreateScreen} />
      <Stack.Screen name="Write" component={WirteScreen} />
    </Stack.Navigator>
  );
}
