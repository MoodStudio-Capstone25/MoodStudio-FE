import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Ionic from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

const CustomHeader = ({ title }) => {
    const navigation = useNavigation();

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
            fontSize: 20,
            fontWeight: "bold",
            position: "absolute"
        }
    })

    return (
        <View style={styles.headerStyle} >
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonStyle}>
                <Ionic name="arrow-back" style={styles.arrowButtonStyle} />
            </TouchableOpacity>
            <Text style={styles.headerTitleStyle}>{title}</Text>
        </View>
    );
}

export default CustomHeader