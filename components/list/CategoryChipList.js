import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Fonts } from "../../styles/Fonts";
import { useCategoryFilterStore } from "../../stores/useCategoryFilterStore";

const CategoryChip = ({ item, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.chipContainer,
        isSelected ? { backgroundColor: "#E7C9FF" } : { backgroundColor: "#FFF" },
      ]}
      onPress={onPress}
    >
      <Text style={isSelected ? Fonts.caption : Fonts.body3}>{item.label}</Text>
      <Text
        style={[
          isSelected
            ? [Fonts.overline1, { color: "#333" }]
            : [Fonts.overline2, { color: "#7E7E7E" }],
          { marginLeft: 2 },
        ]}
      >
        {item.count}
      </Text>
    </TouchableOpacity>
  );
};

const CategoryChipList = ({ categoryList = [] }) => {
  const { selectedCategoryIds, toggleCategory } = useCategoryFilterStore();

  return (
    <ScrollView
      style={styles.listContainer}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ overflow: "visible", flexGrow: 0, alignItems: "center" }}
      overScrollMode="never"
    >
      {categoryList.map((item) => {
        const isSelected = selectedCategoryIds.includes(item.id);
        return (
          <CategoryChip
            key={item.id}
            item={item}
            isSelected={isSelected}
            onPress={() => toggleCategory(item.id)}
          />
        );
      })}
    </ScrollView>
  );
};

export default CategoryChipList;

const styles = StyleSheet.create({
  listContainer: {
    zIndex: 9,

    marginTop: 12,
    marginHorizontal: 24,
    height: 42,

    // ScrollView가 세로로 늘어나지 않게
    flexGrow: 0,
    flexShrink: 0,

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
