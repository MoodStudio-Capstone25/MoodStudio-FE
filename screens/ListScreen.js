import { Text, View } from "react-native";
import React from "react";
import Layout from "../layouts/Layout";

import { ListHeader } from "../components/common/topbar/Header";
import CategoryChipList from "../components/list/CategoryChipList";
import ReviewList from "../components/list/ReviewList";
import SortSelector from "../components/list/SortSelector";
import { listDummy } from "../mock/listDummy";

const ListScreen = () => {
  return (
    <Layout>
      {/* 상단바 */}
      <ListHeader />
      {/* 카테고리 칩 */}
      <CategoryChipList />
      {/* 정렬 */}
      <SortSelector />
      {/* 감상 글 리스트 */}
      <ReviewList listDummy={listDummy} />
    </Layout>
  );
};

export default ListScreen;
