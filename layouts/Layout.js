import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

const Layout = ({ children, fullBackgroundCSS }) => {
  return (
    <View style={[styles.fullBackground, fullBackgroundCSS]}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle={"default"} />
        {children}
      </SafeAreaView>
    </View>
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
