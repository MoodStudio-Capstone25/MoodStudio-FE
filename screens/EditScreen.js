import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { detailDummy } from '../mock/detailDummy'; // 더미 데이터 경로 맞게 수정
import CustomHeader from '../components/CustomHeader';
import BottomSheet from '../components/create/BottomSheet';
import AlertModal from '../components/common/AlertModal';
import UnifiedTemplate from '../components/create/template-option/UnifiedTemplate';

const templateOptions = [
    { template: "basic", label: "기본 템플릿", description: "사진, 제목, 내용" },
    {
        template: "content",
        label: "콘텐츠 템플릿",
        description: "사진, 제목, 평점, 지은이/감독, 경험 기간, 줄거리/개요, 기억에 남는 장면, 감상",
    },
    {
        template: "culture",
        label: "문화 템플릿",
        description:
            "사진, 제목, 평점, 작가/연출자, 출연진, 장소, 방문일, 함께한 사람, 줄거리/내용 요약, 기억에 남는 장면, 감상",
    },
];

const EditScreen = ({ route }) => {
    const { id } = route.params; // ← navigation 시 id만 넘긴다고 가정

    // 더미 데이터 중 해당 id 찾기
    const matchedItem = detailDummy.find(item => item.id === id);
    const data = matchedItem?.data || {};

    // 선택된 템플릿
    const [selectedTemplate, setSelectedTemplate] = useState(matchedItem.template);
    const [isSheetVisible, setIsSheetVisible] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [pendingTemplate, setPendingTemplate] = useState(null);


    const [draft, setDraft] = useState({
        content_title: data.content_title || '',
        title: data.title || '',
        creator: data.creator || '',
        date: data.date || '',
        rating: data.rating || 0,
        story: data.story || '',
        scenes: data.scenes || '',
        thoughts: data.thoughts || '',
    });

    // 이미지 데이터
    const [images, setImages] = useState(data.image_urls || []);

    return (
        <View>
            <View style={{ paddingTop: 12 }}>
                <CustomHeader
                    title={templateOptions.find(t => t.template === selectedTemplate)?.label}
                    // onBackPress={handleBackPress}
                    showDropDown={true}
                    onPressDropDown={() => setIsSheetVisible(true)}
                />
                <TouchableOpacity style={styles.finishButton}>
                    <Text>완료</Text>
                </TouchableOpacity>
            </View>

            {/* 템플릿 */}
            <UnifiedTemplate
                templateKey={selectedTemplate.template} // "basic" | "content" | "culture"
                config={matchedItem.category}
                draft={draft}
                setDraft={setDraft}
                images={images}
                setImages={setImages}
            />

            {/* 템플릿 설정 바텀 시트 */}
            <BottomSheet
                isVisible={isSheetVisible}
                onClose={() => setIsSheetVisible(false)}
                data={templateOptions}
                selectedKey={selectedTemplate}
                onSelect={(item) => {
                    setIsSheetVisible(false);

                    // 변경하려는 템플릿이 현재와 다르면 경고창 띄움
                    if (item.template !== selectedTemplate) {
                        setPendingTemplate(item.template);      // 변경하려는 템플릿 저장
                        setModalVisible(true);                  // 경고창 띄우기
                    }
                }}
            />

            {/* 경고창 모달 */}
            <AlertModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                message={"템플릿을 변경하면 \n작성 중인 일부 내용이 삭제될 수 있습니다."}
                message2={"정말 변경하시겠습니까?"}
                confirmMsg="변경하기"
                onConfirm={() => {
                    setSelectedTemplate(pendingTemplate);   // 템플릿 진짜로 바꾸기
                    setPendingTemplate(null);               // 초기화
                    setModalVisible(false);                 // 모달 닫기
                }}
                onCancel={() => {
                    setModalVisible(false);                 // 모달 닫기
                    setPendingTemplate(null);               // 초기화
                }}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    finishButton: {
        position: "absolute",
        top: 25,
        right: 16,
        padding: 6,
        backgroundColor: "transparent",
        zIndex: 10,
    },
});

export default EditScreen;
