import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Fonts } from "../../styles/Fonts";
import ReviewCard from "./ReviewCard";

const ReviewList = ({ listData, handleScroll = null, sortDirection, searchQuery = "" }) => {
  const [reviewDataList, setReviewDataList] = useState([]);

  useEffect(() => {
    const normalizedQuery = typeof searchQuery === "string" ? searchQuery.trim().toLowerCase() : "";

    const dir = sortDirection === "asc" ? "asc" : "desc";

    let baseList = [...listData].sort((a, b) =>
      sortDirection === "asc"
        ? new Date(a.modifiedAt) - new Date(b.modifiedAt)
        : new Date(b.modifiedAt) - new Date(a.modifiedAt)
    );

    if (normalizedQuery.length > 0) {
      baseList = baseList.filter((item) => {
        const haystack = [item.title, item.content_title, item.scenes, item.story, item.thoughts]
          .filter((v) => typeof v === "string" && v.trim() !== "")
          .join(" ")
          .toLowerCase();

        return haystack.includes(normalizedQuery);
      });
    }

    setReviewDataList(baseList);
  }, [listData, sortDirection, searchQuery]);

  const hasQuery = typeof searchQuery === "string" && searchQuery.trim().length > 0;
  const isEmptyResult = hasQuery && reviewDataList.length === 0;

  return (
    <ScrollView style={styles.container} onScroll={handleScroll} scrollEventThrottle={16}>
      {isEmptyResult ? (
        <View style={styles.emptyWrapper}>
          <Text style={[Fonts.body3, styles.emptyText]}>검색 결과가 없습니다.</Text>
          <Text style={[Fonts.body3, styles.emptySubText]}>다른 키워드로 다시 검색해보세요.</Text>
        </View>
      ) : (
        reviewDataList.map((reviewData) => <ReviewCard key={reviewData.id} {...reviewData} />)
      )}
    </ScrollView>
  );
};

export default ReviewList;

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    paddingHorizontal: 24,
  },
  emptyWrapper: {
    paddingTop: 48,
    alignItems: "center",
  },
  emptyText: {
    color: "#B0B0B0",
  },
  emptySubText: {
    marginTop: 6,
    color: "#B0B0B0",
  },
});
