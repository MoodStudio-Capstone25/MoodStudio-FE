import { Text, View } from "react-native";
import React, { useState } from "react";
import Layout from "../layouts/Layout";
import { SearchHeader } from "../components/common/topbar/Header";
import RecentSearchChipList from "../components/list/RecentSearchChipList";
import ReviewList from "../components/list/ReviewList";
import { listDummy } from "../mock/listDummy";

const SearchScreen = () => {
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  // 검색결과가 없습니다. 추가 필요

  return (
    <Layout>
      <SearchHeader
        inputText={inputText}
        setInputText={setInputText}
        setSearchQuery={setSearchQuery}
      />
      <View style={{ marginTop: 8 }}>
        {searchQuery?.trim() !== "" ? (
          <ReviewList listDummy={listDummy} searchQuery={searchQuery} />
        ) : (
          <RecentSearchChipList setInputText={setInputText} setSearchQuery={setSearchQuery} />
        )}
      </View>
    </Layout>
  );
};

export default SearchScreen;
