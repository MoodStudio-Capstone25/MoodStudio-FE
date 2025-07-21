import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import { SearchHeader } from "../components/common/topbar/Header";
import ContentList from "../components/search/ContentList";
import { contentListDummy } from "../mock/contentListDummy";

const ContentsSearchScreen = () => {
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  // 검색결과가 없습니다. 추가 필요

  return (
    <View>
      <SearchHeader
        inputText={inputText}
        setInputText={setInputText}
        setSearchQuery={setSearchQuery}
      />
      <View style={{ marginTop: 8 }}>
        <ContentList listDummy={contentListDummy} searchQuery={searchQuery} />
      </View>
    </View>
  );
};

export default ContentsSearchScreen;

const styles = StyleSheet.create({});
