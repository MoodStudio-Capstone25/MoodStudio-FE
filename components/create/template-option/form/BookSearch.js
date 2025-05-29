import { View, StyleSheet, TextInput, useWindowDimensions, TouchableOpacity } from 'react-native'
import { Fonts } from '../../../../styles/Fonts'
import { Ionicons } from '@expo/vector-icons';

const BookSearch = ({
    contentHeight,
    value,
    onChangeText,
    subContent
}) => {

    const { width } = useWindowDimensions();

    //styles
    const styles = StyleSheet.create({
        searchinput: {
            flexDirection: 'row',
            width: width*0.93,
            alignItems: 'center',
            alignSelf: 'center',
        },
        writebox: {
            height: contentHeight,
            width: width * 0.85,
            paddingTop: 10,
            textAlignVertical: 'top',
        },
        tocuhStyle: {
            alignSelf: 'center',   
            padding: 2
        },
        searchIcon: {
            fontSize: 24,
            color: '#333333'
        }
    })

    return (
        <View style={styles.searchinput}>
            <TextInput
                style={[Fonts.body2, styles.writebox]}
                placeholder={subContent}
                placeholderTextColor='#AEAEAE'
                multiline={true}
                value={value}
                onChangeText={onChangeText}
            />
            <TouchableOpacity style ={styles.tocuhStyle}>
                <Ionicons name='search' style={styles.searchIcon} />
            </TouchableOpacity>
        </View>
    )
}


export default BookSearch