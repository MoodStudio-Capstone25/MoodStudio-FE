import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Fonts } from '../../styles/Fonts';

const SettingInfoItem = ({ label, value }) => {
    return (
        <View style={styles.container}>
            <Text style={Fonts.subtitle2}>계정 정보</Text>
            <Text style={[Fonts.body3, { marginTop: 4, color: '#888' }]}>{value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 12,
        marginHorizontal: 16
    },
});

export default SettingInfoItem;
