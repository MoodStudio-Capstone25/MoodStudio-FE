import { View, Text } from "react-native";
import React, { useState } from "react";
import CustomHeader from "../components/CustomHeader";
import Layout from "../layouts/Layout";
import SettingInfoItem from "../components/setting/SettingInfoItem";
import SettingToggleItem from "../components/setting/SettingToggleItem";
import { useQueryClient } from "@tanstack/react-query";

const AccountSettingsScreen = () => {
  const [hideInfo, setHideInfo] = useState(false);

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["me"]);

  return (
    <Layout>
      <CustomHeader title={"계정 설정"} />
      <SettingInfoItem label="계정 정보" value={user?.email ?? "계정 정보가 없습니다."} />
      {/* <SettingToggleItem value={hideInfo} onValueChange={setHideInfo} /> */}
    </Layout>
  );
};

export default AccountSettingsScreen;
