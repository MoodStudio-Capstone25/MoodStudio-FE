import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SwitchToggle from 'react-native-switch-toggle';
import { Fonts } from '../../styles/Fonts';

const SettingToggleItem = ({ value, onValueChange }) => {
    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <Text style={Fonts.subtitle2}>공개/비공개 설정</Text>

                <SwitchToggle
                    switchOn={value}
                    onPress={() => onValueChange(!value)}
                    containerStyle={styles.toggleContainer}
                    circleStyle={styles.toggleCircle}
                    backgroundColorOn="#F2E1FF" // 연보라
                    backgroundColorOff="#FFF"
                    circleColorOn="#C881FF"     // 진보라
                    circleColorOff="#DEDEDE"
                />
            </View>

            <Text style={[Fonts.overline2, styles.subtext]}>
                둘러보기 페이지에서 다른 사용자가 당신의 캐비넷을 볼 수 있습니다.{"\n"}
                캐비넷 이미지만 보이며, 작성한 내용은 보이지 않습니다.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginHorizontal: 16,
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#000',
    },
    topRow: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 8,
    },
    toggleContainer: {
        width: 48,
        height: 28,
        borderRadius: 25,
        borderWidth: 1,
        padding: 3,
    },
    toggleCircle: {
        width: 20,
        height: 20,
        borderRadius: 11,
        borderWidth: 1,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 1,
    },
    subtext: {
        color: '#888',
        lineHeight: 18,
    },
});

export default SettingToggleItem;
