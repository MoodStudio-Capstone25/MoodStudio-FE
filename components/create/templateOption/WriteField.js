import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'

const WriteField = ({sectionName, nextContent, contentHeight}) => {
    const styles = StyleSheet.create({
        textbox: {
            flexDirection: 'row',
            width: 365,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            paddingHorizontal: 2,
            paddingVertical: 6,
            alignSelf: 'center'
        },
        texthightlight: {
            fontSize: 14,
            color: '#D97B73'
        },
        textbasic: {
            fontSize: 14
        },
        writebox: {
            height: 40,
            width: 365,
            paddingTop: 10,
            fontSize: 15,
            textAlignVertical: 'top',
            alignSelf: 'center',
        }
    })

    return (
        <View>
            
            <View style={styles.textbox}>
                <Text style={styles.texthightlight}>{sectionName}</Text>
                <Text style={styles.textbasic}>{nextContent}</Text>
            </View>
            <View>
                <TextInput 
                    style={[styles.writebox, { height: contentHeight }]}
                    placeholder= {sectionName}
                    multiline={true}
                />
            </View>
        </View>
    )
}

export default WriteField