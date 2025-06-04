import { Text, View } from "react-native";
import React, { useState } from "react";
import Layout from "../layouts/Layout";
import { SearchHeader } from "../components/common/topbar/Header";

const SearchScreen = () => {
  const [inputText, setInputText] = useState("");

  return (
    <Layout>
      <SearchHeader inputText={inputText} setInputText={setInputText} />
      <Text>SearchScreen</Text>
    </Layout>
  );
};

export default SearchScreen;
