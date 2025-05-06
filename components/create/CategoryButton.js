import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';

const CategoryButton = ({item, isSelected, onPress}) => {
    const getButtonStyle = (isSelected) => ({
        backgroundColor: isSelected ? "#E7C9FF" : "#F0F0F0",
        height: 38,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#000000",
        alignItems: "center",
        justifyContent: "center",
    });

    return (
        <View style={{paddingLeft: 12}}>
            <TouchableOpacity onPress={onPress} style={getButtonStyle(isSelected)} >
                <Text style={{ fontWeight: 'bold', paddingHorizontal: 14}}>{item.label}</Text>
            </TouchableOpacity>
        </View>
    )

}

export default CategoryButton