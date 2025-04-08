import React from 'react'
import { Platform, Text, View } from 'react-native'
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <StatusBar barStyle={"default"} />

        <View>
          <Text>LoginScreen</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default LoginScreen