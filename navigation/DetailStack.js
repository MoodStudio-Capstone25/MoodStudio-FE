import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CreateScreen from "../screens/CreateScreen";
import WirteScreen from "../screens/WirteScreen";
import EditScreen from "../screens/EditScreen";

const Stack = createStackNavigator();

export default function DetailStack() {
  return (
    <Stack.Navigator initialRouteName="Create">
      <Stack.Screen
        name="Create"
        component={CreateScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Write"
        component={WirteScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Edit"
        component={EditScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
