import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import MainStack from "./MainStack";
import ListStack from "./ListStack";
import CreateStack from "./CreateStack";
import SettingsStack from "./SettingsStack";

const Tab = createBottomTabNavigator();

const CustomTabIcon = ({ name, focused }) => {
  return (
    <View
      style={{
        width: 70,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {focused && (
        <View
          style={{
            position: "absolute",
            width: 81,
            height: 42,
            borderRadius: 50,
            backgroundColor: "#FF9187",
            marginBottom: 2,
            borderWidth: 1.5,
            borderColor: "#000000",
            top: 0.1,
          }}
        />
      )}
      <Ionicons name={name} size={34} color={focused ? "#000" : "#fff"} />
    </View>
  );
};

export default function MainTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator initialRouteName="MainStack" screenOptions={getScreenOptions(insets)}>
      <Tab.Screen
        name="MainStack"
        component={MainStack}
        options={{
          tabBarIcon: ({ focused }) => <CustomTabIcon name="cube" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="CreateStack"
        component={CreateStack}
        options={{
          tabBarIcon: () => <CustomTabIcon name="add-circle" />,
        }}
      />
      <Tab.Screen
        name="ListStack"
        component={ListStack}
        options={{
          tabBarIcon: ({ focused }) => <CustomTabIcon name="list" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

const getScreenOptions = (insets) => ({
  headerShown: false,
  tabBarShowLabel: false,
  tabBarLabelPosition: "beside-icon",
  tabBarInactiveTintColor: "#FFFFFF",
  justifyContent: "center",
  alignItems: "center",
  tabBarStyle: {
    backgroundColor: "#C881FF",
    height: 62 + insets.bottom,
    width: 329,
    alignSelf: "center",
    borderTopWidth: 1.5,
    borderTopColor: "#000000",
    borderRadius: 30,
    bottom: 30 + insets.bottom,
    borderWidth: 1.5,
    borderColor: "#000000",
    paddingBottom: insets.bottom,
    zIndex: 1000,
    elevation: 5,
  },
  tabBarLabelStyle: {
    height: 10,
  },
});
