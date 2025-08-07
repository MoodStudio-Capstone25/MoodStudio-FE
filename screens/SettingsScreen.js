import { Text, View } from "react-native";
import React from "react";
import Layout from "../layouts/Layout";
import CustomHeader from "../components/CustomHeader";
import SettingItem from "../components/setting/SettingItem";
import SettingSection from "../components/setting/SettingSection";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
  const navigation = useNavigation();

  return (
    <Layout>
      <CustomHeader title={"설정"} />

      <SettingSection>
        <SettingItem title="계정 설정" onPress={() => navigation.navigate("AccountSettings")} />
      </SettingSection>

      <SettingSection>
        <SettingItem title="튜토리얼 다시 보기" borderUse={true} onPress={() => { }} />
        <SettingItem title="공지사항" borderUse={true} onPress={() => { }} />
        <SettingItem title="약관" onPress={() => { }} />
      </SettingSection>

      <SettingSection>
        <SettingItem title="로그아웃" onPress={() => { }} hasArrow={false} />
      </SettingSection>
      <SettingSection borderColor="red">
        <SettingItem title="탈퇴" variant="danger" onPress={() => { }} hasArrow={false} color="red" />
      </SettingSection>
    </Layout>
  );
};

export default SettingsScreen;
