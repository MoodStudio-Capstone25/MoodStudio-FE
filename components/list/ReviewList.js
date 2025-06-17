import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Fonts } from "../../styles/Fonts";
import ReviewCard from "./ReviewCard";

const ReviewList = ({ listDummy }) => {
  const [reviewDataList, setReviewDataList] = useState([]);
  // 이미지 데이터 형식 수정 예정

  useEffect(() => {
    setReviewDataList(listDummy);
  }, []);

  return (
    <ScrollView style={styles.container}>
      {reviewDataList.map((reviewData) => (
        <ReviewCard key={reviewData.id} {...reviewData} />
      ))}
    </ScrollView>
  );
};

export default ReviewList;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingHorizontal: 24,
  },
});
