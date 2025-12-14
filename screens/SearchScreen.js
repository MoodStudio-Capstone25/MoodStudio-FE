import { Text, View } from "react-native";
import React, { useState } from "react";
import Layout from "../layouts/Layout";
import { SearchHeader } from "../components/common/topbar/Header";
import RecentSearchChipList from "../components/list/RecentSearchChipList";
import ReviewList from "../components/list/ReviewList";
import { listDummy } from "../mock/listDummy";
import { useRecordsQuery } from "../hooks/useRecordsQuery";
import { useRecentSearchesQuery } from "../hooks/search/useRecentSearchesQuery";
import { useAddRecentSearchMutation } from "../hooks/search/useRecentSearchesMutation";

const SearchScreen = () => {
  const { data: recentSearches = [] } = useRecentSearchesQuery();
  const { mutate: addRecent } = useAddRecentSearchMutation();

  const { data: records, isLoading, isError, error } = useRecordsQuery();
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // 실제 리스트 데이터가 없으면 listDummy 사용
  const listData = records && Array.isArray(records) ? records : listDummy;

  const onSearch = () => {
    const q = inputText.trim();
    if (!q) return;
    setSearchQuery(q);
    addRecent(q);
  };

  // 검색결과가 없습니다. 추가 필요
  return (
    <Layout>
      <SearchHeader
        inputText={inputText}
        setInputText={setInputText}
        setSearchQuery={setSearchQuery}
        onSearch={onSearch}
      />
      <View style={{ marginTop: 8 }}>
        {searchQuery?.trim() !== "" ? (
          <ReviewList listData={listData} searchQuery={searchQuery} />
        ) : (
          <RecentSearchChipList
            recentSearchTextList={recentSearches}
            setInputText={setInputText}
            setSearchQuery={(q) => {
              setSearchQuery(q);
              addRecent(q);
            }} // 칩 눌러도 최신화
          />
        )}
      </View>
    </Layout>
  );
};

export default SearchScreen;
