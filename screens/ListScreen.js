import { Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Layout from "../layouts/Layout";

import MainHeader from "../components/common/topbar/MainHeader";
import CategoryChipList from "../components/list/CategoryChipList";
import ReviewList from "../components/list/ReviewList";
import SortSelector from "../components/list/SortSelector";

const ListScreen = () => {
  const navigation = useNavigation();

  return (
    <Layout>
      {/* 상단바 */}
      <MainHeader navigation={navigation} />
      {/* 카테고리 칩 */}
      <CategoryChipList />
      {/* 정렬 */}
      <SortSelector />
      {/* 감상 글 리스트 */}
      <ReviewList />
    </Layout>
  );
};

export default ListScreen;
