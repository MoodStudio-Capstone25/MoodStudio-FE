import axios from "axios";
import { BACKEND_API_URL } from "@env";
import * as SecureStore from "expo-secure-store";

import { Animated, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Layout from "../layouts/Layout";

import { ListHeader } from "../components/common/topbar/Header";
import CategoryChipList from "../components/list/CategoryChipList";
import ReviewList from "../components/list/ReviewList";
import SortSelector from "../components/list/SortSelector";
import { listDummy } from "../mock/listDummy";

const fetchRecords = async (token) => {
  try {
    const response = await axios.get(`${BACKEND_API_URL}/records/`, {
      headers: {
        Authorization: `Bearer ${token}`, // Bearer 토큰
      },
    });

    // 응답 예시: [{ id, template, category, user, image_urls, title, api_thumbnail, rating, date, content_title, creator, cast, story, scenes, thoughts, location, companions, created_at, updated_at }, ...]
    return response.data;
  } catch (error) {
    console.log("GET /records/ 에러:", error.response?.data || error.message);
    throw error;
  }
};

const ListScreen = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const loadRecords = async () => {
      try {
        setLoading(true);
        setError(null);

        // 토큰 가져오기
        const token = await SecureStore.getItemAsync("access");

        if (!token) {
          setError("로그인이 필요합니다.");
          setLoading(false);
          return;
        }

        const data = await fetchRecords(token);

        console.log("data >>>", data);

        setRecords(data);
      } catch (err) {
        setError("목록을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadRecords();
  }, []);

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
