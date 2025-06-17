import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Fonts } from "../../styles/Fonts";

const CategoryChip = ({
  index,
  categoryInfo: { category, count },
  isSelected,
  setSelectedCategory,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.chipContainer,
        isSelected
          ? { backgroundColor: "#E7C9FF" }
          : { backgroundColor: "#FFF" },
      ]}
      onPress={() => {
        if (index === 0) {
          setSelectedCategory([0]);
          return;
        }

        setSelectedCategory((prevSelected) => {
          const isAlreadySelected = prevSelected.includes(index);

          if (isAlreadySelected) {
            const withoutIndex = prevSelected.filter((i) => i !== index);
            return withoutIndex.length === 0 ? [0] : withoutIndex;
          }

          const withoutAll = prevSelected.filter((i) => i !== 0);
          return [...withoutAll, index];
        });
      }}
    >
      <Text style={isSelected ? Fonts.caption : Fonts.body3}>{category}</Text>
      <Text
        style={[
          isSelected
            ? [Fonts.overline1, { color: "#333" }]
            : [Fonts.overline2, { color: "#7E7E7E" }],
          { marginLeft: 2 },
        ]}
      >
        {count}
      </Text>
    </TouchableOpacity>
  );
};

const CategoryChipList = () => {
  const [selectedCategory, setSelectedCategory] = useState([1, 2]);
  const [categoryList, setCategoryList] = useState([
    { category: "전체", count: 26 },
    { category: "영화", count: 16 },
    { category: "책", count: 8 },
    { category: "드라마", count: 6 },
    { category: "뮤지컬", count: 2 },
    { category: "만화", count: 2 },
  ]);
  // 변수값 초기 세팅 수정 예정(api 연결할 때)

  return (
    <ScrollView
      style={styles.listContainer}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ overflow: "visible" }}
      overScrollMode="never"
    >
      {categoryList.map((categoryInfo, index) => (
        <CategoryChip
          key={index}
          index={index}
          categoryInfo={categoryInfo}
          isSelected={selectedCategory.includes(index)}
          setSelectedCategory={setSelectedCategory}
        />
      ))}
    </ScrollView>
  );
};

export default CategoryChipList;

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 12,
    marginHorizontal: 24,
    height: 40,

    overflow: "visible", // 안드로이드
  },
  chipContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
    height: 32,

    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    alignSelf: "flex-start",

    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#000",
  },
});
