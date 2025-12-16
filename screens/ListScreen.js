import { Animated, Text, View } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Layout from "../layouts/Layout";

import { ListHeader } from "../components/common/topbar/Header";
import CategoryChipList from "../components/list/CategoryChipList";
import ReviewList from "../components/list/ReviewList";
import SortSelector from "../components/list/SortSelector";
import { listDummy } from "../mock/listDummy";
import { useRecordsQuery } from "../hooks/useRecordsQuery";
import { useListStore } from "../stores/useListStore";
import { useCategoryFilterStore } from "../stores/useCategoryFilterStore";
import { categories, categoryLabelToId } from "../utils/categories";

const ListScreen = () => {
  const { data: records, isLoading, isError, error } = useRecordsQuery();

  const { selectedCategoryIds } = useCategoryFilterStore();
  const { sortBy, sortDirection, setSortBy, setSortDirection } = useListStore();

  // descending: 내림차순, ascending: 오름차순
  const sortBarHeight = useRef(new Animated.Value(30)).current;
  const toTimestamp = (v) => {
    if (!v) return 0;
    const t = new Date(v).getTime(); // "2025-12-14" 같은 문자열 대응
    return Number.isFinite(t) ? t : 0;
  };

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

  // 실제 리스트 데이터가 없으면 listDummy 사용
  const rawList = records && Array.isArray(records) ? records : listDummy;

  // 카테고리별 개수 계산
  const categoryCounts = useMemo(() => {
    const countsById = {};
    rawList.forEach((r) => {
      const id = categoryLabelToId(r?.category);
      countsById[id] = (countsById[id] ?? 0) + 1;
    });

    const total = rawList.length;

    // count가 1 이상, 큰 순서대로 정렬
    const onlyExisting = categories
      .map((c) => ({ id: c.id, label: c.label, count: countsById[c.id] ?? 0 }))
      .filter((c) => c.count >= 1)
      .sort((a, b) => b.count - a.count);

    // 전체
    return [{ id: "all", label: "전체", count: total }, ...onlyExisting];
  }, [rawList]);

  // 카테고리 필터링
  const filteredList = useMemo(() => {
    if (!selectedCategoryIds || selectedCategoryIds.length === 0) return rawList;
    if (selectedCategoryIds.includes("all")) return rawList;

    const selectedSet = new Set(selectedCategoryIds);
    return rawList.filter((r) => selectedSet.has(categoryLabelToId(r?.category)));
  }, [rawList, selectedCategoryIds]);

  // 정렬 적용
  const sortedList = useMemo(() => {
    const dir = sortDirection === "asc" ? 1 : -1;

    return [...filteredList].sort((a, b) => {
      const ta = toTimestamp(a?.[sortBy]);
      const tb = toTimestamp(b?.[sortBy]);

      // 최신순(desc)이면 tb - ta, 오래된순(asc)이면 ta - tb
      if (ta !== tb) return (ta - tb) * dir;

      // 날짜가 같으면 id로 안정 정렬(선택)
      return ((a?.id ?? 0) - (b?.id ?? 0)) * dir;
    });
  }, [filteredList, sortBy, sortDirection]);

  // api
  if (isError) {
    let errorMessage = "목록을 불러오는 중 오류가 발생했습니다.";
    if (error.message === "NO_TOKEN") {
      errorMessage = "로그인이 필요합니다.";
    } else if (error.message === "REFRESH_FAILED") {
      errorMessage = "로그인 정보가 만료되었습니다. 다시 로그인해 주세요.";
    }
    console.log(errorMessage);
  }

  return (
    <Layout>
      {/* 상단바 */}
      <ListHeader />
      {/* 카테고리 칩 */}
      <CategoryChipList categoryList={categoryCounts} />
      {/* 정렬 */}
      <SortSelector
        sortBarHeight={sortBarHeight}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      {/* 감상 글 리스트 */}
      <ReviewList listData={sortedList} handleScroll={handleScroll} sortDirection={sortDirection} />
    </Layout>
  );
};

export default ListScreen;
