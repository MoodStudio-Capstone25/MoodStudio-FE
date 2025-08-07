// components/settings/SettingSection.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

const SettingSection = ({ children, borderColor = '#000' }) => {
    return <View style={[styles.section, { borderColor }]}>{children}</View>;
};

const styles = StyleSheet.create({
    section: {
        marginVertical: 10,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginHorizontal: 16,
        borderWidth: 1,
    },
});

export default SettingSection;
