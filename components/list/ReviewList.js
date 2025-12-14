import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Fonts } from "../../styles/Fonts";
import ReviewCard from "./ReviewCard";

const ReviewList = ({ listData, handleScroll = null, sortDirection, searchQuery = "" }) => {
  const [reviewDataList, setReviewDataList] = useState([]);
  // 이미지 데이터 형식 수정 예정

  useEffect(() => {
    const normalizedQuery = typeof searchQuery === "string" ? searchQuery.trim().toLowerCase() : "";

    let baseList = [...listData].sort((a, b) =>
      sortDirection === "asc"
        ? new Date(a.modifiedAt) - new Date(b.modifiedAt)
        : new Date(b.modifiedAt) - new Date(a.modifiedAt)
    );

    if (normalizedQuery.length > 0) {
      baseList = baseList.filter((item) => {
        const contents = (item.reviewContents ?? "").toLowerCase();
        return contents.includes(normalizedQuery);
      });
    }

    setReviewDataList(baseList);
  }, [listData, sortDirection, searchQuery]);

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
