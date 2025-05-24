import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import MainScreen from "../screens/MainScreen";
import ListScreen from "../screens/ListScreen";
import CreateScreen from "../screens/CreateScreen";

// const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CustomTabIcon = ({ name, focused }) => {
  return (
    <View
      style={{
        width: 70,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        // paddingTop: 7,
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
            // marginTop: 4,
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

const EmptyScreen = () => <View />;

export default function MainStack() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
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
          // position: "absolute",
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
      }}
    >
      <Tab.Screen
        name="MainTab"
        component={MainScreen}
        options={{
          tabBarIcon: ({ focused }) => <CustomTabIcon name="cube" focused={focused} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MoveToCreate"
        component={EmptyScreen}
        options={{
          tabBarIcon: () => <CustomTabIcon name="add-circle" />,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Detail", { screen: "Create" });
          },
        })}
      />
      <Tab.Screen
        name="ListTab"
        component={ListScreen}
        options={{
          tabBarIcon: ({ focused }) => <CustomTabIcon name="list" focused={focused} />,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
