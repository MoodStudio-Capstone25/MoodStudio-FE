import React from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "./IconButton";
import SettingsIcon from "../../assets/images/mainpage/settings.svg";
import ShareIcon from "../../assets/images/mainpage/share.svg";
import ProfileIcon from "../../assets/images/mainpage/profile.svg";
import CreateIcon from "../../assets/images/mainpage/create.svg";
import Toast from "react-native-toast-message";

const HeaderIcons = ({ navigation, cabinetId = null, cabinetColor = null }) => {
  const handleEditPress = () => {
    if (!cabinetId) {
      console.log("캐비닛이 존재하지 않음");
      return;
    }

    navigation.navigate("Edit3D", {
      cabinetId,
      cabinetColor,
    });
  };

  return (
    <View style={styles.container}>
      <IconButton
        IconComponent={SettingsIcon}
        onPress={() => navigation.navigate("SettingsStack")}
      />
      <View style={styles.spacer} />
      <IconButton
        IconComponent={ShareIcon}
        onPress={() =>
          Toast.show({
            type: "error", // success | error | info
            text1: "현재 준비 중인 기능입니다.",
            // text2: "변경 사항이 반영되었습니다.",
            position: "bottom",
            visibilityTime: 2000, // ms
          })
        }
      />
      <IconButton
        IconComponent={ProfileIcon}
        onPress={() =>
          Toast.show({
            type: "error",
            text1: "현재 준비 중인 기능입니다.",
            position: "bottom",
            visibilityTime: 2000,
          })
        }
      />
      <IconButton
        IconComponent={CreateIcon}
        onPress={() =>
          Toast.show({
            type: "error",
            text1: "현재 준비 중인 기능입니다.",
            position: "bottom",
            visibilityTime: 2000,
          })
        }
      />
      {/* <IconButton IconComponent={CreateIcon} onPress={handleEditPress} /> */}
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
