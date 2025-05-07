import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

const Layout = ({ children, fullBackgroundCSS }) => {
  return (
    <SafeAreaProvider>
      <View style={[styles.fullBackground, fullBackgroundCSS]}>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar barStyle={"default"} />
          {children}
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
};

export default Layout;

// style
const styles = StyleSheet.create({
  fullBackground: {
    flex: 1,
    backgroundColor: "#fff",
  },
  safeArea: {
    flex: 1,
  },
});
