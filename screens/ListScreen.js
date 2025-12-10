// api
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

// api
const fetchRecords = async () => {
  try {
    const access = await SecureStore.getItemAsync("access");
    const refresh = await SecureStore.getItemAsync("refresh");

    if (!access || !refresh) {
      throw new Error("NO_TOKEN");
    }

    // 1차 요청: 기존 access 토큰으로
    try {
      const response = await axios.get(`${BACKEND_API_URL}/records/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      return response.data;
    } catch (error) {
      const data = error.response?.data;
      const code = data?.code;
      const messages = data?.messages;

      const isExpiredToken =
        code === "token_not_valid" &&
        Array.isArray(messages) &&
        messages.some((m) => m.message === "Token is expired");

      if (!isExpiredToken) {
        console.log("GET /records/ 에러:", data || error.message);
        throw error;
      }

      // 2. 토큰 만료시 새 access 발급 요청
      try {
        const refreshResponse = await axios.post(
          `${BACKEND_API_URL}/users/auth/token/refresh/`,
          { refresh },
          { headers: { "Content-Type": "application/json" } }
        );

        const newAccess = refreshResponse.data?.access;
        const newRefresh = refreshResponse.data?.refresh;

        if (!newAccess) {
          throw new Error("새 access 토큰을 받지 못했습니다.");
        }

        await SecureStore.setItemAsync("access", newAccess);
        if (newRefresh) {
          await SecureStore.setItemAsync("refresh", newRefresh);
        }

        // 3. 2차 요청: 새 access 토큰으로
        const retryResponse = await axios.get(`${BACKEND_API_URL}/records/`, {
          headers: {
            Authorization: `Bearer ${newAccess}`,
          },
        });

        return retryResponse.data;
      } catch (refreshError) {
        console.log("토큰 재발급 실패 >>>", refreshError.response?.data || refreshError.message);
        throw new Error("REFRESH_FAILED");
      }
    }
    // 응답 예시: [{ id, template, category, user, image_urls, title, api_thumbnail, rating, date, content_title, creator, cast, story, scenes, thoughts, location, companions, created_at, updated_at }, ...]
  } catch (error) {
    if (error.message === "NO_TOKEN") {
      throw new Error("NO_TOKEN");
    }
    if (error.message === "REFRESH_FAILED") {
      throw new Error("REFRESH_FAILED");
    }
    console.log("fetchRecords 에러 >>>", error.response?.data || error.message);
    throw error;
  }
};

const ListScreen = () => {
  // api
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

  // api
  useEffect(() => {
    const loadRecords = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchRecords();

        console.log("data >>>", data);
        setRecords(data);
      } catch (err) {
        if (err.message === "NO_TOKEN") {
          setError("로그인이 필요합니다.");
        } else if (err.message === "REFRESH_FAILED") {
          setError("로그인 정보가 만료되었습니다. 다시 로그인해 주세요.");
        } else {
          setError("목록을 불러오는 중 오류가 발생했습니다.");
        }
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
