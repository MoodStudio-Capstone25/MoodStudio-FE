import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Fonts } from "../../styles/Fonts";
import DeleteIcon from "../../assets/icons/icon-close-16.svg";

const DeleteIconButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.iconButton} onPress={onPress}>
      <DeleteIcon width={16} height={16} />
    </TouchableOpacity>
  );
};

const RecentSearchChip = ({ recentSearchText, onDelete, onPress }) => {
  return (
    <TouchableOpacity style={styles.chipContainer} onPress={onPress}>
      <Text numberOfLines={1} style={[Fonts.body3, { maxWidth: 192, color: "#585858" }]}>
        {recentSearchText}
      </Text>
      <DeleteIconButton onPress={onDelete} />
    </TouchableOpacity>
  );
};

const RecentSearchChipList = ({ setInputText, setSearchQuery }) => {
  const [recentSearchTextList, setRecentSearchTextList] = useState([
    "뭐 검색하려고 했지",
    "내용입",
    "우리의 삶을",
    "예측할 수 없는",
    "사실적",
    "글이 너무 길면 말 줄임표 처리하기 글이 너무 길면 말 줄임표 처리하기",
  ]);
  // 변수값 초기 세팅 수정 예정(api 연결할 때)

  return (
    <View style={styles.recentSearchContainer}>
      <Text style={[Fonts.body3, { color: "#888888" }]}>최근 검색어</Text>
      {recentSearchTextList.length === 0 ? (
        <Text style={[Fonts.body2, styles.noRecentSearchText]}>최근 검색 내역이 없습니다.</Text>
      ) : (
        <View style={styles.listContainer}>
          {recentSearchTextList.map((text, index) => (
            <RecentSearchChip
              key={index}
              recentSearchText={text}
              onDelete={() => {
                setRecentSearchTextList((prev) => prev.filter((_, i) => i !== index));
              }}
              onPress={() => {
                setSearchQuery(text);
                setInputText(text);
              }}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default RecentSearchChipList;

const styles = StyleSheet.create({
  recentSearchContainer: {
    marginTop: 16,
    paddingHorizontal: 24,
  },
  listContainer: {
    marginTop: 8,

    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chipContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    height: 30,

    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#9A9A9A",
  },
  iconButton: {
    marginLeft: 4,
    marginRight: -8,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  noRecentSearchText: {
    marginTop: 40,
    textAlign: "center",
    color: "#888888",
  },
});
