import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Layout from "../layouts/Layout";
import CustomHeader from "../components/CustomHeader";
import BasicTemplate from "../components/create/template-option/BasicTemplate";
import ContentTemplate from "../components/create/template-option/ContentTemplate";
import CultureTemplate from "../components/create/template-option/CultureTemplate";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "../components/create/BottomSheet";
import AlertModal from "../components/common/AlertModal";
import { Fonts } from "../styles/Fonts";

const templates = [
  { template: "basic", label: "기본 템플릿", description: "사진, 제목, 내용" },
  { template: "content", label: "콘텐츠 템플릿", description: "사진, 제목, 평점, 지은이/감독, 경험 기간, 줄거리/개요, 기억에 남는 장면, 감상" },
  { template: "culture", label: "문화 템플릿", description: "사진, 제목, 평점, 작가/연출자, 출연진, 장소, 방문일, 함께한 사람, 줄거리/내용 요약, 기억에 남는 장면, 감상" },
];

const WriteScreen = () => {
  const route = useRoute();
  const { selectedCategoryId } = route.params;

  const [sheetVisible, setSheetVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(() => templates.find(t => t.template === "basic"));
  const [modalVisible, setModalVisible] = useState(false);
  const [pendingTemplate, setPendingTemplate] = useState(null);
  const [draft, setDraft] = useState({ content_title: '', title: '', creator: '', date: '', rating: 0, story: '', scenes: '', thoughts: '', companions: '', location: '', cast: '' });

  const getCategoriesID = () => {
    switch (selectedCategoryId) {
      case "book":
        return {
          creatorLabel: "저자",
          peroidLabel: '읽은 기간',
          setenceLabel: "감명깊게 읽은 문장",
          castLabel: "등장인물"
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
            setenceLabel: "감명 깊은 가사"
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
          castLabel: "등장인물"
        };
      case "game":
        return {
          creatorLabel: "게임 회사",
          peroidLabel: "플레이 기간"
        }
      case "art":
        return {
          creatorLabel: "작가/연출자",
          setenceLabel: "기억에 남는 작품"
        }
      case "musical":
        return {
          creatorLabel: "감독",
        }
      case "concert":
        return {
          creatorLabel: "가수",
        }
      case "sport":
        return {
          creatorLabel: "경기 팀",
          castLabel: "선수"
        }
      case "festival":
        return {
          creatorLabel: "개최 회사"
        }
      case "dance":
      case "classic":
        return {
          creatorLabel: "연출자",
        }
      case "cultures":
        return {
          creatorLabel: "개최 회사",
          setenceLabel: "감상 깊은 체험"
        }
      default:
        return {
          peroidLabel: "기간",
          setenceLabel: "감상 깊은 부분",
          creatorLabel: "진행자"
        };
    }
  };

  const categoryConfig = getCategoriesID();

  const openSheet = () => setSheetVisible(true);
  const closeSheet = () => setSheetVisible(false);

  //템플릿 변경 로직
  const onSelectTemplate = (item) => {
    if (item.template === selectedTemplate.template) return;
    const hasContent = Object.values(draft).some((v) => {
      if (typeof v === 'string') return v.trim() !== "";
      if (typeof v === 'number') return v !== 0;
      return false;
    });
    if (hasContent) {
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
      setDraft({ content_title: '', title: '', creator: '', date: '', rating: 0, story: '', scenes: '', thoughts: '', companions: '', location: '', cast: '' });
      setPendingTemplate(null);
      setModalVisible(false);
      closeSheet();
    }
  };

  // 뒤로가기 로직
  const navigation = useNavigation();
  const [backModalVisible, setBackModalVisible] = useState(false);

  const handleBackPress = () => {
    const hasContent = Object.values(draft).some((v) => {
      if (typeof v === 'string') return v.trim() !== "";
      if (typeof v === 'number') return v !== 0;
      return false;
    });
    if (hasContent) {
      setBackModalVisible(true);
    } else {
      navigation.goBack();
    }
  };

  const calculatedLeftHit = selectedTemplate.label.length * 18;

  return (
    <Layout>
      <View>
        <CustomHeader title={selectedTemplate.label} onBackPress={handleBackPress} />
        <TouchableOpacity
          style={styles.downButton}
          onPress={openSheet}
          hitSlop={{ top: 10, bottom: 10, left: calculatedLeftHit, right: 10 }}
        >
          <Ionicons name="chevron-down-outline" style={{ fontSize: 24 }} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.finishButton, Fonts.body3]}>
          <Text>작성완료</Text>
        </TouchableOpacity>
      </View>

      {selectedTemplate.template === "basic" && <BasicTemplate draft={draft} setDraft={setDraft} />}
      {selectedTemplate.template === "content" && <ContentTemplate config={categoryConfig} draft={draft} setDraft={setDraft} />}
      {selectedTemplate.template === "culture" && <CultureTemplate config={categoryConfig} draft={draft} setDraft={setDraft} />}

      <BottomSheet
        isVisible={sheetVisible}
        onClose={closeSheet}
        onSelect={onSelectTemplate}
        data={templates.map(t => ({
          template: t.template,
          label: t.label,
          description: t.description
        }))}
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

const styles = StyleSheet.create({
  finishButton: {
    position: "absolute",
    top: 12,
    right: 16,
    padding: 6,
    backgroundColor: "transparent",
    zIndex: 10,
  },
  downButton: {
    position: "absolute",
    top: 17,
    right: 120,
    zIndex: 10,
  },
});

export default WriteScreen;
