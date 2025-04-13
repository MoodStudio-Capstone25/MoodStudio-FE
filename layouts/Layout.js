import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Layout = ({ children }) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <StatusBar barStyle={"default"} />
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Layout;
