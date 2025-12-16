import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Ionic from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { Fonts } from '../styles/Fonts';
import BackIcon from '../assets/icons/back.svg';

const CustomHeader = ({
    title,
    onBackPress,
    showDropDown = false,
    onPressDropDown,
    // 우측 액션 버튼
    showAction = false,
    actionLabel = "완료",
    onPressAction,
}) => {
    const navigation = useNavigation();

    const handleBack = () => {
        if (onBackPress) onBackPress();
        else navigation.goBack();
    };


    return (
        <View style={styles.headerStyle}>
            <TouchableOpacity onPress={handleBack} style={styles.backButtonStyle}>
                <BackIcon />
            </TouchableOpacity>

            <View style={styles.titleContainer}>
                <Text style={[styles.headerTitleStyle, Fonts.h2]}>{title}</Text>
                {showDropDown && (
                    <TouchableOpacity onPress={onPressDropDown} hitSlop={{ top: 10, bottom: 10, left: 120, right: 10 }} style={styles.iconWrapper}>
                        <Ionic name="chevron-down-outline" size={24} color="#333" />
                    </TouchableOpacity>
                )}
            </View>

            {showAction && (
                <TouchableOpacity onPress={onPressAction} style={styles.actionButton}>
                    <Text style={[Fonts.body3]}>
                        {actionLabel}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    headerStyle: {
        paddingVertical: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
    },
    backButtonStyle: {
        position: "absolute",
        left: 16,
        padding: 2
    },
    arrowButtonStyle: {
        fontSize: 32,
        color: '#E7C9FF'
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
    },
    headerTitleStyle: {
        textAlign: 'center',
    },
    iconWrapper: {},

    // 우측 버튼
    actionButton: {
        position: "absolute",
        right: 16,
        paddingVertical: 6,
        paddingHorizontal: 10,
    },
})

export default CustomHeader