import React from "react";
import { ScrollView, useWindowDimensions, View } from "react-native";
import ImagePicker from "./form/ImagePicker";
import WriteField from "./form/WriteField";

/** 템플릿별 섹션 순서 정의 */
const TEMPLATE_LAYOUT = {
  basic: ["images", "content_title", "title", "thoughts"],
  content: [
    "images",
    "content_title",
    "title",
    "rating",
    "creator",
    "date",
    "story",
    "scenes",
    "thoughts",
  ],
  culture: [
    "images",
    "content_title",
    "title",
    "rating",
    "creator",
    "cast",
    "location",
    "date",
    "companions",
    "story",
    "scenes",
    "thoughts",
  ],
};

export default function UnifiedTemplate({
  templateKey = "basic",
  config = {},
  draft,
  setDraft,
  images,
  setImages,
}) {
  const { height } = useWindowDimensions();

  const {
    creatorLabel = "출연진",
    setenceLabel = "감명 깊은 장면",
    castLabel = "출연진",
    peroidLabel = "방문일",
  } = config;

  const onChange = (key) => (value) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  /** 각 섹션 렌더러 */
  const SECTION_RENDERERS = {
    images: () => (
      <>
        <ImagePicker images={images} setImages={setImages} />
        <View style={{ height: 20 }} />
      </>
    ),

    content_title: () => (
      <WriteField
        frontContent="이 콘텐츠 기록에 어떤 "
        sectionName="제목"
        nextContent="을 붙여볼까요?"
        subContent="기록 제목 (예: 올해 최고의 책)"
        contentHeight={height * 0.07}
        value={draft.content_title}
        onChangeText={onChange("content_title")}
      />
    ),

    title: () => (
      <WriteField
        sectionName="제목"
        nextContent="이 무엇인가요?"
        subContent="제목 (예: 타이타닉)"
        contentHeight={height * 0.07}
        isSearch
        value={draft.title}
        onChangeText={onChange("title")}
      />
    ),

    rating: () => (
      <WriteField
        frontContent="이 콘텐츠의 "
        sectionName="평점"
        nextContent="은?"
        contentHeight={height * 0.06}
        isStarRating={true}
        value={draft.rating}
        onChangeText={(value) => setDraft((prev) => ({ ...prev, rating: value }))}
      />
    ),

    creator: () => (
      <WriteField
        sectionName={creatorLabel}
        nextContent="는 누구인가요?"
        subContent={creatorLabel}
        contentHeight={height * 0.07}
        value={draft.creator}
        onChangeText={onChange("creator")}
      />
    ),

    cast: () => (
      <WriteField
        sectionName={castLabel}
        nextContent="는 누구인가요?"
        subContent={castLabel}
        contentHeight={height * 0.07}
        value={draft.cast}
        onChangeText={onChange("cast")}
      />
    ),

    location: () => (
      <WriteField
        sectionName="장소"
        nextContent="는 어디인가요?"
        subContent="장소"
        contentHeight={height * 0.07}
        value={draft.location}
        onChangeText={onChange("location")}
      />
    ),

    date: () => (
      <WriteField
        sectionName={peroidLabel}
        nextContent="은 어떻게 되나요?"
        subContent="20XX-XX-XX ~ 20XX-XX-XX"
        contentHeight={height * 0.06}
        value={draft.date}
        onChangeText={onChange("date")}
      />
    ),

    companions: () => (
      <WriteField
        frontContent="함께한 "
        sectionName="사람"
        nextContent="은?"
        subContent="(예: 친구, 부모님)"
        contentHeight={height * 0.06}
        value={draft.companions}
        onChangeText={onChange("companions")}
      />
    ),

    story: () => (
      <WriteField
        sectionName={setenceLabel}
        nextContent="이 있나요?"
        subContent={setenceLabel}
        contentHeight={height * 0.07}
        value={draft.story}
        onChangeText={onChange("story")}
      />
    ),

    scenes: () => (
      <WriteField
        sectionName="줄거리/내용"
        nextContent="을 요약해주세요."
        subContent="줄거리/내용"
        contentHeight={height * 0.15}
        value={draft.scenes}
        onChangeText={onChange("scenes")}
      />
    ),

    thoughts: () => (
      <WriteField
        sectionName="감상"
        nextContent="을 적어주세요."
        subContent="감상"
        contentHeight={height * 0.2}
        value={draft.thoughts}
        onChangeText={onChange("thoughts")}
      />
    ),
  };

  const layout = TEMPLATE_LAYOUT[templateKey] || TEMPLATE_LAYOUT.basic;

  return (
    <ScrollView>
      {layout.map((key) => (
        <View key={key}>{SECTION_RENDERERS[key]?.()}</View>
      ))}
    </ScrollView>
  );
}
