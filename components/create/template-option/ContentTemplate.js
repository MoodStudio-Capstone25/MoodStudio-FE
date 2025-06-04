import { ScrollView, useWindowDimensions, View } from 'react-native'
import WriteField from './form/WriteField'
import ImagePicker from './form/ImagePicker'

const ContentTemplate = ({ config, draft, setDraft }) => {
    const { height } = useWindowDimensions();
    const {
        creatorLabel = '출연진',
        setenceLabel = '감명 깊은 장면',
        peroidLabel = '방문일',
    } = config

    return (
        <ScrollView>
            <ImagePicker />

            <View style={{ height: 20 }} />

            <WriteField
                frontContent='이 콘텐츠 기록에 어떤 '
                sectionName='제목'
                nextContent='을 붙여볼까요?'
                subContent='기록 제목 (예: 올해 최고의 책)'
                contentHeight={height * 0.07}
                value={draft.content_title}
                onChangeText={(text) => setDraft(prev => ({ ...prev, content_title: text }))}
            />

            <WriteField
                sectionName='제목'
                nextContent='을 검색해봐요!'
                subContent='제목 (예: 타이타닉)'
                contentHeight={height * 0.07}
                isSearch={true}
                value={draft.title}
                onChangeText={(text) => setDraft(prev => ({ ...prev, title: text }))}
            />

            <WriteField
                sectionName={creatorLabel}
                nextContent='(은/는) 누구인가요?'
                subContent={creatorLabel}
                contentHeight={height * 0.07}
                value={draft.creator}
                onChangeText={(text) => setDraft(prev => ({ ...prev, creator: text }))}
            />
            <WriteField
                sectionName={peroidLabel}
                nextContent='은 어떻게 되나요?'
                subContent='20XX.XX.XX ~ 20XX.XX.XX'
                contentHeight={height * 0.06}
                value={draft.date}
                onChangeText={(text) => setDraft(prev => ({ ...prev, date: text }))}
            />

            <WriteField
                frontContent='이 콘텐츠의 '
                sectionName='평점'
                nextContent='은?'
                contentHeight={height * 0.06}
                isStarRating={true}
                value={draft.rating}
                onChangeText={(value) => setDraft(prev => ({ ...prev, rating: value }))}
            />

            <WriteField
                sectionName={setenceLabel}
                nextContent='(이/가) 있나요?'
                subContent={setenceLabel}
                contentHeight={height * 0.07}
                value={draft.story}
                onChangeText={(text) => setDraft(prev => ({ ...prev, story: text }))}
            />
            <WriteField
                sectionName='내용'
                nextContent='을 요약해주세요.'
                subContent='내용'
                contentHeight={height * 0.15}
                value={draft.scenes}
                onChangeText={(text) => setDraft(prev => ({ ...prev, scenes: text }))}
            />
            <WriteField
                sectionName='감상'
                nextContent='을 적어주세요.'
                subContent='감상'
                contentHeight={height * 0.2}
                value={draft.thoughts}
                onChangeText={(text) => setDraft(prev => ({ ...prev, thoughts: text }))}
            />
        </ScrollView>
    )
}



export default ContentTemplate