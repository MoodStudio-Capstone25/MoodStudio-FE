import { Text, View } from "react-native";
import React, { useState } from "react";
import Layout from "../layouts/Layout";
import { SearchHeader } from "../components/common/topbar/Header";
import RecentSearchChipList from "../components/list/RecentSearchChipList";
import ReviewList from "../components/list/ReviewList";

const SearchScreen = () => {
  const [inputText, setInputText] = useState("");

  return (
    <Layout>
      <SearchHeader inputText={inputText} setInputText={setInputText} />
      <View style={{ marginTop: 8 }}>
        <RecentSearchChipList />
        {/* <ReviewList /> */}
      </View>
    </Layout>
  );
};

export default SearchScreen;
