import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Fonts } from "../../styles/Fonts";
import SortDownIcon from "../../assets/icons/list-sort-down-16.svg";

const SortSelector = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={Fonts.body3}>수정 날짜 순</Text>
      <TouchableOpacity style={styles.sortIconWrapper}>
        <SortDownIcon width={16} height={16} />
      </TouchableOpacity>
    </View>
  );
};

export default SortSelector;

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 12,
    paddingHorizontal: 24,

    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  sortIconWrapper: {
    marginLeft: 12,
    padding: 6,
    height: 18,

    justifyContent: "center",
    alignItems: "center",

    borderLeftWidth: 1,
    borderLeftColor: "#333",
  },
});
