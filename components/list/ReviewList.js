import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Fonts } from "../../styles/Fonts";
import ReviewCard from "./ReviewCard";

const ReviewList = () => {
  const [reviewDataList, setReviewDataList] = useState([
    {
      id: 0,
      reviewImage: true,
      reviewTitle: "제목입니다.",
      reviewContents:
        "내용입니다내용입니다내용입니다내용입니다. 내용입니다내용입니다.내용입니다내용입니다.",
    },
    {
      id: 1,
      reviewImage: null,
      reviewTitle: "현식을 비추는 거울",
      reviewContents:
        "우리의 삶을 사실적으로 담아내어 공감을 자아내고 깊은 생각을 하게 만든다. 우리의 삶을 사실적으로 담아내 어 공 감을 자아내고 깊은 생각을 하게 만든다.",
    },
    {
      id: 2,
      reviewImage: true,
      reviewTitle: "",
      reviewContents:
        "예측할 수 없는 전개와 충격적인 결말이 긴장감을 극대화했다. 예측할 수 없는 전개와 충격적인 결말이 긴장감을 극대화했다. 예측할 수 없는 전개와 충격적인 결말이 긴장감을 극대화했다.",
    },
    {
      id: 3,
      reviewImage: true,
      reviewTitle: "",
      reviewContents:
        "내용입니다내용입니다내용입니다내용입니다. 내용입니다내용입니다.내용입니다내용입니다.",
    },
  ]);
  // 변수값 초기 세팅 수정 예정(api 연결할 때), 이미지 데이터 형식 수정 예정

  return (
    <View style={styles.container}>
      {reviewDataList.map((reviewData) => (
        <ReviewCard key={reviewData.id} {...reviewData} />
      ))}
    </View>
  );
};

export default ReviewList;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingHorizontal: 24,
  },
});
