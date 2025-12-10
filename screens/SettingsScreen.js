import { Text, View, Alert } from "react-native";
import React from "react";
import * as SecureStore from "expo-secure-store";
import Layout from "../layouts/Layout";
import CustomHeader from "../components/CustomHeader";
import SettingItem from "../components/setting/SettingItem";
import SettingSection from "../components/setting/SettingSection";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("access");
      await SecureStore.deleteItemAsync("refresh");

      Alert.alert("로그아웃", "정상적으로 로그아웃되었습니다.");

      navigation.replace("AuthGate");
    } catch (e) {
      console.error("LOGOUT ERROR >>>", e);
      Alert.alert("오류", "로그아웃 중 문제가 발생했습니다.");
    }
  };

  return (
    <Layout>
      <CustomHeader title={"설정"} />

      <SettingSection>
        <SettingItem title="계정 설정" onPress={() => navigation.navigate("AccountSettings")} />
      </SettingSection>

      <SettingSection>
        <SettingItem title="튜토리얼 다시 보기" borderUse={true} onPress={() => {}} />
        <SettingItem title="공지사항" borderUse={true} onPress={() => {}} />
        <SettingItem title="약관" onPress={() => {}} />
      </SettingSection>

      <SettingSection>
        <SettingItem title="로그아웃" onPress={handleLogout} hasArrow={false} />
      </SettingSection>
      <SettingSection borderColor="red">
        <SettingItem
          title="탈퇴"
          variant="danger"
          onPress={handleLogout}
          hasArrow={false}
          color="red"
        />
      </SettingSection>
    </Layout>
  );
};

export default SettingsScreen;
