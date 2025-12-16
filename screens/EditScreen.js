import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import BottomSheet from '../components/create/BottomSheet';
import AlertModal from '../components/common/AlertModal';
import UnifiedTemplate from '../components/create/template-option/UnifiedTemplate';
import { useRecordDetailQuery } from '../hooks/useRecordDetailQuery';
import { usePatchRecordMutation } from '../hooks/detail/usePatchRecordMutation';
import { useUploadRecordImagesMutation } from '../hooks/useUploadRecordImagesMutation';

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

const EditScreen = ({ route, navigation }) => {
    const { id } = route.params || {};
    const recordId = String(id);

    // hook
    const patchMutation = usePatchRecordMutation();
    const uploadMutation = useUploadRecordImagesMutation();
    const { data, refetch } = useRecordDetailQuery(recordId);

    // 선택된 템플릿
    const [selectedTemplate, setSelectedTemplate] = useState("basic");
    const [isSheetVisible, setIsSheetVisible] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [pendingTemplate, setPendingTemplate] = useState(null);

    const [draft, setDraft] = useState({
        content_title: "",
        title: "",
        creator: "",
        cast: "",
        companions: "",
        date: "",
        location: "",
        rating: 0,
        story: "",
        scenes: "",
        thoughts: "",
    });

    const [images, setImages] = useState([]); // 이미지 데이터

    // 문자열 uri 배열”로 정규화
    const pickUri = (x) => {
        if (!x) return null;
        if (typeof x === "string") return x.trim() || null;

        // 서버가 객체로 줄 때 가능한 키들 대응
        if (typeof x === "object") {
            const s = (x.uri || x.url || x.image_url || x.image || x.path || "").trim?.() ?? "";
            return s || null;
        }
        return null;
    };

    const toText = (v) =>
        Array.isArray(v)
            ? v.map((x) => String(x ?? "").trim()).filter(Boolean).join(", ")
            : String(v ?? "").trim();

    useEffect(() => {
        if (!data) return;

        setDraft({
            content_title: data.content_title ?? "",
            title: data.title ?? "",
            creator: toText(data.creator),
            cast: toText(data.cast),
            companions: data.companions ?? "",
            date: data.date ?? "",
            location: data.location ?? "",
            rating: data.rating ?? 0,
            story: data.story ?? "",
            scenes: data.scenes ?? "",
            thoughts: data.thoughts ?? "",
        });

        const normalized = (data.image_urls ?? [])
            .map(pickUri)
            .filter(Boolean);

        setImages(normalized);

        if (data.template) setSelectedTemplate(data.template); // 서버에 template 값이 있다면 그걸 우선 사용
    }, [data]);

    const toArray = (text) =>
        String(text ?? "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);

    const sameArray = (a, b) => {
        const A = (a ?? []).map(String).map((s) => s.trim()).filter(Boolean);
        const B = (b ?? []).map(String).map((s) => s.trim()).filter(Boolean);
        return JSON.stringify(A) === JSON.stringify(B);
    };

    const diffImages = (original = [], current = []) => {
        const o = original.filter(Boolean);
        const c = current.filter(Boolean);

        const added = c.filter((x) => !o.includes(x));
        const removed = o.filter((x) => !c.includes(x));

        return { added, removed };
    };

    const isLocalUri = (uri) =>
        typeof uri === "string" &&
        (uri.startsWith("file://") || uri.startsWith("content://"));

    const handleSubmit = async () => {
        if (!data) return;

        const payload = {};

        // 텍스트 diff
        if (draft.content_title !== (data.content_title ?? ""))
            payload.content_title = draft.content_title;

        if (draft.title !== (data.title ?? ""))
            payload.title = draft.title;

        if (!sameArray(toArray(draft.creator), toArray(data.creator)))
            payload.creator = toArray(draft.creator);

        if (!sameArray(toArray(draft.cast), toArray(data.cast)))
            payload.cast = toArray(draft.cast);

        if (draft.rating !== (data.rating ?? 0))
            payload.rating = draft.rating;

        if (draft.companions !== (data.companions ?? ""))
            payload.companions = draft.companions;

        if (draft.date !== (data.date ?? ""))
            payload.date = draft.date;

        if (draft.location !== (data.location ?? ""))
            payload.location = draft.location;

        if (draft.story !== (data.story ?? ""))
            payload.story = draft.story;

        if (draft.scenes !== (data.scenes ?? ""))
            payload.scenes = draft.scenes;

        if (draft.thoughts !== (data.thoughts ?? ""))
            payload.thoughts = draft.thoughts;

        // 템플릿 diff
        if (selectedTemplate !== data.template)
            payload.template = selectedTemplate;

        // 이미지 diff
        const originalImages = (data.image_urls ?? []).map(pickUri).filter(Boolean);
        const { added } = diffImages(originalImages, images);
        const addedLocal = added.filter(isLocalUri);

        const hasTextChanges = Object.keys(payload).length > 0;
        const hasImageUpload = addedLocal.length > 0;

        if (!hasTextChanges && !hasImageUpload) {
            navigation.goBack();
            return;
        }

        try {
            if (hasTextChanges) {
                await patchMutation.mutateAsync({ id: recordId, payload });
            }

            if (hasImageUpload) {
                await uploadMutation.mutateAsync({ recordId, images: addedLocal });
                await refetch();
            }

            navigation.goBack();
        } catch (e) {
            Alert.alert("수정 실패", "다시 시도해주세요.");
        }
    };

    return (
        <View>
            <View style={{ paddingTop: 12 }}>
                <CustomHeader
                    title={templateOptions.find(t => t.template === selectedTemplate)?.label}
                    // onBackPress={handleBackPress}
                    showDropDown={true}
                    onPressDropDown={() => setIsSheetVisible(true)}
                />
                <TouchableOpacity style={styles.finishButton} onPress={handleSubmit}>
                    <Text>완료</Text>
                </TouchableOpacity>
            </View>

            {/* 템플릿 */}
            <UnifiedTemplate
                templateKey={selectedTemplate} // "basic" | "content" | "culture"
                config={data.category}
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
