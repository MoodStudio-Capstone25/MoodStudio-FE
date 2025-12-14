import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import SettingsIcon from "../../../assets/icons/topbar-settings.svg";
import SearchIcon from "../../../assets/icons/topbar-search.svg";
import BackIcon from "../../../assets/icons/topbar-back.svg";

const IconButton = ({ IconComponent, onPress, iconStyles }) => {
  return (
    <TouchableOpacity style={[styles.iconButton, { ...iconStyles }]} onPress={onPress}>
      <IconComponent width={24} height={24} />
    </TouchableOpacity>
  );
};

// 목록 화면 - 검색 버튼
const SearchBarButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.searchBarContainer} onPress={onPress}>
      <SearchIcon width={24} height={24} />
    </TouchableOpacity>
  );
};

// 검색 화면 - 검색 입력창
const SearchBarInput = ({ onPress, inputText, setInputText }) => {
  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        autoFocus
        style={styles.searchBarInputStyle}
        placeholder="검색어를 입력하세요"
        value={inputText}
        onChangeText={setInputText}
        returnKeyType="search"
        onSubmitEditing={onPress}
      />
      <TouchableOpacity onPress={onPress}>
        <SearchIcon width={24} height={24} />
      </TouchableOpacity>
    </View>
  );
};

// 목록 화면 - 상단바
const ListHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <IconButton IconComponent={SettingsIcon} iconStyles={{ backgroundColor: "#E7C9FF" }} />
      <SearchBarButton onPress={() => navigation.navigate("Search")} />
    </View>
  );
};

// 검색 화면 - 상단바
const SearchHeader = ({ inputText, setInputText, setSearchQuery, onSearch }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <IconButton IconComponent={BackIcon} onPress={() => navigation.goBack()} />
      <SearchBarInput onPress={onSearch} inputText={inputText} setInputText={setInputText} />
    </View>
  );
};

export { ListHeader, SearchHeader };

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 16,
    paddingHorizontal: 24,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#000",
  },
  searchBarContainer: {
    marginLeft: 16,
    paddingHorizontal: 10,
    height: 40,

    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,

    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#000",
  },
  searchBarInputStyle: {
    flex: 1,
    marginLeft: 2,
    marginRight: 12,
  },
});
