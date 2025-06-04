import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Ionic from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { Fonts } from '../styles/Fonts';

const CustomHeader = ({ title, onBackPress }) => {
    const navigation = useNavigation();

    const handleBack = () => {
        if (onBackPress) {
            onBackPress();
        } else {
            navigation.goBack();
        }
    };

    return (
        <View style={styles.headerStyle} >
            <TouchableOpacity onPress={handleBack} style={styles.backButtonStyle}>
                <Ionic name="arrow-back" style={styles.arrowButtonStyle} />
            </TouchableOpacity>
            <Text style={[styles.headerTitleStyle,Fonts.h2]}>{title}</Text>
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
    headerTitleStyle: {
        position: "absolute"
    }
})

export default CustomHeader