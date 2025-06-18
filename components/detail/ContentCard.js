import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Fonts } from '../../styles/Fonts'

const ContentCard = ({ contents }) => {
    return (
        <View>
            <View style={styles.horizontalLine} />
            <Text style={[styles.description, Fonts.body2]}>
                {contents}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    description: { 
        fontSize: 14, 
        color: "#333", 
        lineHeight: 20,
        marginBottom: 20
    },
  horizontalLine: {
    borderBottomColor: '#888',
    borderBottomWidth: 1,
    width: 37,
    alignSelf: 'center',
    marginBottom: 20,
  },

})

export default ContentCard