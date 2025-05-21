import { View, Text, StyleSheet, TextInput, useWindowDimensions } from 'react-native'
import React from 'react'
import { Fonts } from '../../../../styles/Fonts'
import StarRating from './StarRating';
import BookSearch from './BookSearch';

const WriteField = ({
    frontContent,
    sectionName,
    nextContent,
    contentHeight,
    subContent,
    isStarRating = false,
    isSearch = false,
    value,
    onChangeText }) => {

    const { width } = useWindowDimensions();
    //styles
    const styles = StyleSheet.create({
        textbox: {
            flexDirection: 'row',
            width: width * 0.93,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            paddingHorizontal: 2,
            paddingVertical: 6,
            alignSelf: 'center'
        },
        texthightlight: {
            fontSize: 13,
            color: '#D97B73'
        },
        textbasic: {
            fontSize: 14
        },
        writebox: {
            height: contentHeight,
            width: width * 0.93,
            paddingTop: 10,
            textAlignVertical: 'top',
            alignSelf: 'center',

        }
    })

    return (
        <View>

            <View style={styles.textbox}>
                <Text style={[Fonts.body2, { fontSize: 13 }]}>{frontContent}
                    <Text style={[Fonts.body2, styles.texthightlight]}>{sectionName}</Text>
                    {nextContent}</Text>
            </View>
            <View>
                {isStarRating ? (
                    <StarRating />
                ) : isSearch ? (
                    <BookSearch contentHeight={contentHeight} subContent={subContent} value={value} onChangeText={onChangeText} />
                ) : (
                    <TextInput
                        style={[Fonts.body2, styles.writebox]}
                        placeholder={subContent}
                        placeholderTextColor='#AEAEAE'
                        multiline={true}
                        value={value}
                        onChangeText={onChangeText}
                    />
                )}
            </View>
        </View>
    )
}


export default WriteField