import { Text, View } from "react-native";
import React from "react";
import Layout from "../layouts/Layout";

import MainTopbar from "../components/common/topbar/MainTopbar";
import CategoryChipList from "../components/list/CategoryChipList";
import ReviewList from "../components/list/ReviewList";

const ListScreen = () => {
  return (
    <Layout>
      {/* 상단바 */}
      <MainTopbar />
      {/* 카테고리 칩 */}
      <CategoryChipList />
      {/* 감상 글 리스트 */}
      <ReviewList />
    </Layout>
  );
};

export default ListScreen;
