import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

// 이미지
const ImageContent = () => {
    return (
        <View>
            <TouchableOpacity>
                <Image
                    source={require("../../assets/images/login/main-page.png")}
                    style={styles.image}
                    resizeMode="cover"
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 180,
        borderRadius: 12,
        marginBottom: 12,
    },
})

export default ImageContent