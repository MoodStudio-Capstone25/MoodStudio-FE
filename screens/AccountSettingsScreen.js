import { View, Text } from 'react-native'
import React, { useState } from 'react'
import CustomHeader from '../components/CustomHeader';
import Layout from '../layouts/Layout';
import SettingInfoItem from '../components/setting/SettingInfoItem';
import SettingToggleItem from '../components/setting/SettingToggleItem';

const AccountSettingsScreen = () => {
    const [hideInfo, setHideInfo] = useState(false);

    return (
        <Layout>
            <CustomHeader title={"계정 설정"} />
            <SettingInfoItem label="계정 정보" value="kakao123@naver.com" />
            <SettingToggleItem
                value={hideInfo}
                onValueChange={setHideInfo}
            />
        </Layout>
    )
}

export default AccountSettingsScreen;