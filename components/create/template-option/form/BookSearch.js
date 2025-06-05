import { View, StyleSheet, TextInput, useWindowDimensions, TouchableOpacity } from 'react-native'
import { Fonts } from '../../../../styles/Fonts'
import { Ionicons } from '@expo/vector-icons';
import SearchIcon from '../../../../assets/icons/topbar-search.svg';

const BookSearch = ({
    contentHeight,
    value,
    onChangeText,
    subContent
}) => {

    const { width } = useWindowDimensions();

    return (
        <View style={[styles.searchinput, { width: width * 0.93 }]}>
            <TextInput
                style={[Fonts.body2, styles.writebox,
                { height: contentHeight, width: width * 0.85 }]}
                placeholder={subContent}
                placeholderTextColor='#AEAEAE'
                multiline={true}
                value={value}
                onChangeText={onChangeText}
            />
            <TouchableOpacity style={styles.tocuhStyle}>
                <SearchIcon />
            </TouchableOpacity>
        </View>
    )
}

//styles
const styles = StyleSheet.create({
    searchinput: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },
    writebox: {
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

export default BookSearch