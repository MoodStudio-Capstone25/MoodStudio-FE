import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Layout from "../layouts/Layout";
import CustomHeader from "../components/CustomHeader";
import { useNavigation, useRoute } from "@react-navigation/native";
import BottomSheet from "../components/create/BottomSheet";
import AlertModal from "../components/common/AlertModal";
import UnifiedTemplate from "../components/create/template-option/UnifiedTemplate";
import { useCreateRecordMutation } from "../hooks/useCreateRecordMutation";
import { useUploadRecordImagesMutation } from "../hooks/useUploadRecordImagesMutation";
import { buildCreateRecordPayload } from "../utils/recordPayload";
import { categoryToServer } from "../utils/categoryToServer";

const templates = [
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

const INITIAL_DRAFT = {
  content_title: "",
  title: "",
  creator: "",
  date: "",
  rating: 0,
  story: "",
  scenes: "",
  thoughts: "",
  companions: "",
  location: "",
  cast: "",
};

const WriteScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { selectedCategoryId } = route.params;

  const [sheetVisible, setSheetVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [pendingTemplate, setPendingTemplate] = useState(null);

  const [draft, setDraft] = useState(INITIAL_DRAFT);
  const [images, setImages] = useState([]);

  //mutation 훅 선언
  const createRecordMutation = useCreateRecordMutation();
  const uploadImagesMutation = useUploadRecordImagesMutation();

  const getCategoriesID = () => {
    switch (selectedCategoryId) {
      case "book":
        return {
          creatorLabel: "저자",
          peroidLabel: "읽은 기간",
          setenceLabel: "감명깊게 읽은 문장",
          castLabel: "등장인물",
        };
      case "movie":
        return {
          creatorLabel: "감독/작가",
          peroidLabel: "감상 기간",
        };
      case "music":
        return {
          creatorLabel: "가수",
          peroidLabel: "감상 기간",
          setenceLabel: "감명 깊은 가사",
        };
      case "documentary":
      case "audio":
        return {
          creatorLabel: "진행자",
          peroidLabel: "감상 기간",
        };
      case "webtoon":
        return {
          creatorLabel: "작가",
          peroidLabel: "감상 기간",
          castLabel: "등장인물",
        };
      case "game":
        return {
          creatorLabel: "게임 회사",
          peroidLabel: "플레이 기간",
        };
      case "art":
        return {
          creatorLabel: "작가/연출자",
          setenceLabel: "기억에 남는 작품",
        };
      case "musical":
        return {
          creatorLabel: "감독",
        };
      case "concert":
        return {
          creatorLabel: "가수",
        };
      case "sport":
        return {
          creatorLabel: "경기 팀",
          castLabel: "선수",
        };
      case "festival":
        return {
          creatorLabel: "개최 회사",
        };
      case "dance":
      case "classic":
        return {
          creatorLabel: "연출자",
        };
      case "cultures":
        return {
          creatorLabel: "개최 회사",
          setenceLabel: "감상 깊은 체험",
        };
      default:
        return {
          peroidLabel: "기간",
          setenceLabel: "감상 깊은 부분",
          creatorLabel: "진행자",
        };
    }
  };

  const categoryConfig = getCategoriesID();

  const openSheet = () => setSheetVisible(true);
  const closeSheet = () => setSheetVisible(false);

  //템플릿 변경 로직
  const hasAnyContent = () => {
    const draftHas = Object.values(draft).some((v) => {
      if (typeof v === "string") return v.trim() !== "";
      if (typeof v === "number") return v !== 0;
      return false;
    });
    const imagesHas = Array.isArray(images) && images.length > 0;
    return draftHas || imagesHas;
  };

  const onSelectTemplate = (item) => {
    if (item.template === selectedTemplate.template) return;

    if (hasAnyContent()) {
      setPendingTemplate(item);
      setModalVisible(true);
    } else {
      setSelectedTemplate(item);
      closeSheet();
    }
  };

  const handleConfirmChange = () => {
    if (pendingTemplate) {
      setSelectedTemplate(pendingTemplate);
      setDraft(INITIAL_DRAFT);
      setImages([]);
      setPendingTemplate(null);
      setModalVisible(false);
      closeSheet();
    }
  };

  // 뒤로가기 로직
  const [backModalVisible, setBackModalVisible] = useState(false);

  const handleBackPress = () => {
    if (hasAnyContent()) {
      setBackModalVisible(true);
    } else {
      navigation.goBack();
    }
  };

  const onSubmit = async () => {
    try {
      // 1) payload 생성
      const payload = buildCreateRecordPayload({
        templateKey: selectedTemplate.template,
        category: categoryToServer(selectedCategoryId),
        draft,
        thumbnailUrl: null,
      });

      // 2) 글 생성
      const created = await createRecordMutation.mutateAsync(payload);

      if (!created?.id) {
        throw new Error("RECORD_ID_MISSING");
      }

      // 3) 이미지 업로드 (있을 때만)
      if (images && images.length > 0) {
        await uploadImagesMutation.mutateAsync({
          recordId: created.id,
          images,
        });
      }

      // 성공 → 다음 화면
      navigation.navigate("Create3DShape", { recordId: created });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <CustomHeader
        title={selectedTemplate.label}
        onBackPress={handleBackPress}
        showDropDown={true}
        onPressDropDown={openSheet}
        showAction={true}
        actionLabel="작성완료"
        onPressAction={onSubmit}
      />

      {/* 템플릿 */}
      <UnifiedTemplate
        templateKey={selectedTemplate.template} // "basic" | "content" | "culture"
        config={categoryConfig}
        draft={draft}
        setDraft={setDraft}
        images={images}
        setImages={setImages}
      />

      <BottomSheet
        isVisible={sheetVisible}
        onClose={closeSheet}
        onSelect={onSelectTemplate}
        data={templates}
        selectedKey={selectedTemplate.template}
      />

      <AlertModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        message={"템플릿을 변경하면 \n작성 중인 일부 내용이 삭제될 수 있습니다."}
        message2={"정말 변경하시겠습니까?"}
        confirmMsg="변경하기"
        onConfirm={handleConfirmChange}
        onCancel={() => {
          setModalVisible(false);
          setPendingTemplate(null);
        }}
      />

      <AlertModal
        modalVisible={backModalVisible}
        setModalVisible={setBackModalVisible}
        message={"작성한 내용이 삭제됩니다.\n정말 삭제하시겠습니까?"}
        confirmMsg="나가기"
        onConfirm={() => {
          setBackModalVisible(false);
          navigation.goBack();
        }}
        onCancel={() => {
          setBackModalVisible(false);
        }}
      />
    </Layout>
  );
};

export default WriteScreen;
