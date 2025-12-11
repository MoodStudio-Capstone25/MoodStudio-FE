import { Animated, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Layout from "../layouts/Layout";

import { ListHeader } from "../components/common/topbar/Header";
import CategoryChipList from "../components/list/CategoryChipList";
import ReviewList from "../components/list/ReviewList";
import SortSelector from "../components/list/SortSelector";
import { listDummy } from "../mock/listDummy";
import { useRecordsQuery } from "../hooks/useRecordsQuery";

const ListScreen = () => {
  const { data: records, isLoading, isError, error } = useRecordsQuery();

  // 이미지 데이터 형식 수정 필요!!!!!!!!!!!
  // 수정날짜/만든날짜 기능 추가 필요
  const [sortBy, setSortBy] = useState("modifiedAt");
  const [sortDirection, setSortDirection] = useState("desc");
  // descending: 내림차순, ascending: 오름차순
  const sortBarHeight = useRef(new Animated.Value(30)).current;
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = (event) => {
    const currentY = event.nativeEvent.contentOffset.y;

    if (currentY > lastScrollY + 5) {
      // 아래로 스크롤
      Animated.timing(sortBarHeight, {
        toValue: 0, // 숨김
        duration: 150,
        useNativeDriver: false,
      }).start();
    } else if (currentY < lastScrollY - 5) {
      // 위로 스크롤
      Animated.timing(sortBarHeight, {
        toValue: 30, // 나타남
        duration: 150,
        useNativeDriver: false,
      }).start();
    }

    setLastScrollY(currentY);
  };

  // api
  let errorMessage = null;
  if (isError) {
    if (error.message === "NO_TOKEN") {
      errorMessage = "로그인이 필요합니다.";
    } else if (error.message === "REFRESH_FAILED") {
      errorMessage = "로그인 정보가 만료되었습니다. 다시 로그인해 주세요.";
    } else {
      errorMessage = "목록을 불러오는 중 오류가 발생했습니다.";
    }
  }
  // 실제 리스트 데이터가 없으면 listDummy 사용
  const listData = records && Array.isArray(records) ? records : listDummy;

  return (
    <Layout>
      {/* 상단바 */}
      <ListHeader />
      {/* 카테고리 칩 */}
      <CategoryChipList />
      {/* 정렬 */}
      <SortSelector
        sortBarHeight={sortBarHeight}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      {/* 감상 글 리스트 */}
      <ReviewList listDummy={listData} handleScroll={handleScroll} sortDirection={sortDirection} />
    </Layout>
  );
};

export default ListScreen;
