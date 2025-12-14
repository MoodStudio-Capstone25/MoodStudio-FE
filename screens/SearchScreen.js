import { Text, View } from "react-native";
import React, { useState } from "react";
import Layout from "../layouts/Layout";
import { SearchHeader } from "../components/common/topbar/Header";
import RecentSearchChipList from "../components/list/RecentSearchChipList";
import ReviewList from "../components/list/ReviewList";
import { listDummy } from "../mock/listDummy";
import { useRecordsQuery } from "../hooks/useRecordsQuery";

const SearchScreen = () => {
  const { data: records, isLoading, isError, error } = useRecordsQuery();
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  // 검색결과가 없습니다. 추가 필요

  // 실제 리스트 데이터가 없으면 listDummy 사용
  const listData = records && Array.isArray(records) ? records : listDummy;

  return (
    <Layout>
      <SearchHeader
        inputText={inputText}
        setInputText={setInputText}
        setSearchQuery={setSearchQuery}
      />
      <View style={{ marginTop: 8 }}>
        {searchQuery?.trim() !== "" ? (
          <ReviewList listData={listData} searchQuery={searchQuery} />
        ) : (
          <RecentSearchChipList setInputText={setInputText} setSearchQuery={setSearchQuery} />
        )}
      </View>
    </Layout>
  );
};

export default SearchScreen;
