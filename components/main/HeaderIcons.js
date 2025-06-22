import React from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "./IconButton";
import SettingsIcon from "../../assets/images/mainpage/settings.svg";
import ShareIcon from "../../assets/images/mainpage/share.svg";
import ProfileIcon from "../../assets/images/mainpage/profile.svg";
import CreateIcon from "../../assets/images/mainpage/create.svg";
import Edit3DScreen from "../../screens/Edit3DScreen";

const HeaderIcons = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <IconButton
        IconComponent={SettingsIcon}
        onPress={() => console.log("Settings")}
      />
      <View style={styles.spacer} />
      <IconButton
        IconComponent={ShareIcon}
        onPress={() => console.log("Share")}
      />
      <IconButton
        IconComponent={ProfileIcon}
        onPress={() => console.log("Profile")}
      />
      <IconButton
        IconComponent={CreateIcon}
        onPress={() => navigation.navigate("Edit3D")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 5,
  },
  spacer: {
    flex: 1,
  },
});

export default HeaderIcons;
