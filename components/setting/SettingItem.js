import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Fonts } from '../../styles/Fonts';

const SettingItem = ({
    title,
    onPress,
    hasArrow = true,
    borderUse = false,
    color = '#000', // 기본 검정
}) => {
    return (
        <TouchableOpacity
            style={[styles.item, borderUse && styles.withBorder]}
            onPress={onPress}
        >
            <Text style={[Fonts.subtitle2, { color }]}>{title}</Text>
            {hasArrow && <Feather name="chevron-right" size={20} color={color} />}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    withBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#C7C7C7',
    },
});

export default SettingItem;
