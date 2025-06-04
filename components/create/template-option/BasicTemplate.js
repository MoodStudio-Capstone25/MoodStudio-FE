import { useWindowDimensions, View } from 'react-native'
import WriteField from './form/WriteField'
import ImagePicker from './form/ImagePicker'

const BasicTemplate = ({ draft, setDraft }) => {
    const { height } = useWindowDimensions();

    return (
        <View>
            <ImagePicker />

            <View style={{ height: 20 }} />

            <WriteField
                sectionName='제목'
                nextContent='이 무엇인가요?'
                subContent='제목'
                contentHeight={height * 0.06}
                value={draft.title}
                onChangeText={(text) => setDraft(prev => ({ ...prev, title: text }))}
            />
            <WriteField
                sectionName='내용'
                nextContent='을 적어주세요.'
                subContent='내용'
                contentHeight={height * 0.4}
                value={draft.content}
                onChangeText={(text) => setDraft(prev => ({ ...prev, content: text }))}
            />
        </View>
    )
}

export default BasicTemplate