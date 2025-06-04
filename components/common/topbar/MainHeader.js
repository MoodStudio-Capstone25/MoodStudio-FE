import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import SettingsIcon from "../../../assets/icons/topbar-settings.svg";
import SearchIcon from "../../../assets/icons/topbar-search.svg";

const IconButton = ({ IconComponent, onPress, iconProps }) => {
  return (
    <TouchableOpacity style={styles.iconButton} onPress={onPress}>
      <IconComponent width={24} height={24} {...iconProps} />
    </TouchableOpacity>
  );
};

const SearchBar = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.searchBarContainer} onPress={onPress}>
      <SearchIcon width={24} height={24} />
    </TouchableOpacity>
  );
};

const MainHeader = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <IconButton IconComponent={SettingsIcon} />
      <SearchBar onPress={() => navigation.navigate("Search")} />
    </View>
  );
};

export default MainHeader;

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

    backgroundColor: "#E7C9FF",
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
});
