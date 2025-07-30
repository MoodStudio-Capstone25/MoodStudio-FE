import { ScrollView, useWindowDimensions, View } from 'react-native'
import WriteField from './form/WriteField'
import ImagePicker from './form/ImagePicker'

const CultureTemplate = ({ config, draft, setDraft, images = [], setImages = () => { } }) => {

    const { height } = useWindowDimensions();
    const {
        creatorLabel = '출연진',
        setenceLabel = '감명 깊은 장면',
        castLabel = '출연진',
        peroidLabel = '방문일',
    } = config

    return (
        <ScrollView>
            <ImagePicker images={images} setImages={setImages} />

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
                nextContent='는 누구인가요?'
                subContent={creatorLabel}
                contentHeight={height * 0.07}
                value={draft.creator}
                onChangeText={(text) => setDraft(prev => ({ ...prev, creator: text }))}
            />

            <WriteField
                sectionName={castLabel}
                nextContent='는 누구인가요?'
                subContent={castLabel}
                contentHeight={height * 0.07}
                value={draft.cast}
                onChangeText={(text) => setDraft(prev => ({ ...prev, cast: text }))}
            />

            <WriteField
                sectionName='장소'
                nextContent='는 어디인가요?'
                subContent='장소'
                contentHeight={height * 0.07}
                value={draft.location}
                onChangeText={(text) => setDraft(prev => ({ ...prev, location: text }))}
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
                frontContent='함께한 '
                sectionName='사람'
                nextContent='은?'
                subContent='(예: 친구, 부모님)'
                contentHeight={height * 0.06}
                value={draft.companions}
                onChangeText={(text) => setDraft(prev => ({ ...prev, companions: text }))}
            />

            <WriteField
                sectionName={setenceLabel}
                nextContent='이 있나요?'
                subContent={setenceLabel}
                contentHeight={height * 0.07}
                value={draft.story}
                onChangeText={(text) => setDraft(prev => ({ ...prev, story: text }))}
            />

            <WriteField
                sectionName='줄거리/내용'
                nextContent='을 요약해주세요.'
                subContent='줄거리/내용'
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

export default CultureTemplate