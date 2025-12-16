import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Fonts } from "../../styles/Fonts";
import SortDownIcon from "../../assets/icons/list-sort-down-16.svg";
import SortUpIcon from "../../assets/icons/list-sort-up-16.svg";

const SortSelector = ({ sortBarHeight, sortDirection, setSortDirection, sortBy, setSortBy }) => {
  // descending: 내림차순, ascending: 오름차순

  return (
    <Animated.View style={[styles.container, { height: sortBarHeight }]}>
      <TouchableOpacity
        style={styles.sortTextWrapper}
        onPress={() => setSortBy(sortBy === "updated_at" ? "created_at" : "updated_at")}
      >
        {sortBy === "updated_at" ? (
          <Text style={Fonts.body3}>수정 날짜 순</Text>
        ) : (
          <Text style={Fonts.body3}>만든 날짜 순</Text>
        )}
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity
        style={styles.sortIconWrapper}
        onPress={() => setSortDirection(sortDirection === "desc" ? "asc" : "desc")}
      >
        {sortDirection === "desc" ? (
          <SortDownIcon width={16} height={16} />
        ) : (
          <SortUpIcon width={16} height={16} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default SortSelector;

const styles = StyleSheet.create({
  container: {
    marginTop: 6,
    paddingHorizontal: 24,

    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#FFF",

    overflow: "hidden",
  },
  sortTextWrapper: {
    padding: 6,
    height: 30,
  },
  divider: {
    width: 6,
    height: 18,

    borderRightWidth: 1,
    borderRightColor: "#333",
  },
  sortIconWrapper: {
    padding: 6,
    height: 18,

    justifyContent: "center",
  },
});
