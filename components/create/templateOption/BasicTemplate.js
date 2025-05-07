import { View } from 'react-native'
import React from 'react'
import WriteField from './WriteField'
import ImagePicker from './ImagePicker'

const BasicTemplate = ({ changeoption }) => {

    return (
        <View>
            <ImagePicker />

            <View style={{ height: 10 }} />
            <WriteField
                sectionName='제목'
                nextContent='이 무엇인가요?'
                contentHeight={50}
            />
            <WriteField
                sectionName={changeoption}
                nextContent='는 누구인가요?'
                contentHeight={50}
            />
            <WriteField
                sectionName='내용'
                nextContent='을 적어주세요.'
                contentHeight={300}
            />
        </View>
    )
}

export default BasicTemplate