import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Fonts } from "../../styles/Fonts";
import ReviewCard from "./ReviewCard";

const ReviewList = ({ listDummy, handleScroll = null, sortDirection, searchQuery = "" }) => {
  const [reviewDataList, setReviewDataList] = useState([]);
  // 이미지 데이터 형식 수정 예정

  useEffect(() => {
    const sortedList = [...listDummy].sort((a, b) =>
      sortDirection === "asc"
        ? new Date(a.modifiedAt) - new Date(b.modifiedAt)
        : new Date(b.modifiedAt) - new Date(a.modifiedAt)
    );
    setReviewDataList(sortedList);
  }, [sortDirection]);

  useEffect(() => {
    if (searchQuery) {
      setReviewDataList(
        listDummy.filter((item) =>
          item.reviewContents.toLowerCase().includes(searchQuery?.trim().toLowerCase())
        )
      );
    }
  }, [searchQuery]);

  return (
    <ScrollView style={styles.container} onScroll={handleScroll} scrollEventThrottle={16}>
      {reviewDataList.map((reviewData) => (
        <ReviewCard key={reviewData.id} {...reviewData} />
      ))}
    </ScrollView>
  );
};

export default ReviewList;

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    paddingHorizontal: 24,
  },
});
