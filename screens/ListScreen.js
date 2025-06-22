import { Animated, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import Layout from "../layouts/Layout";

import { ListHeader } from "../components/common/topbar/Header";
import CategoryChipList from "../components/list/CategoryChipList";
import ReviewList from "../components/list/ReviewList";
import SortSelector from "../components/list/SortSelector";
import { listDummy } from "../mock/listDummy";

const ListScreen = () => {
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
      <ReviewList listDummy={listDummy} handleScroll={handleScroll} sortDirection={sortDirection} />
    </Layout>
  );
};

export default ListScreen;
