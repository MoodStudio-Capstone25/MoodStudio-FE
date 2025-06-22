import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

export const defaultTabs = [
  { id: "size", label: "크기 조절" },
  { id: "angle", label: "각도 조절" },
  { id: "color", label: "색" },
  { id: "change", label: "3D 요소 변경" },
  { id: "delete", label: "3D 요소 삭제" },
];

const EditControlTabs = ({ activeTab, onTabChange, tabs = defaultTabs }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.tabContainer}
      contentContainerStyle={styles.tabContent}
    >
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tab, activeTab === tab.id && styles.activeTab]}
          onPress={() => onTabChange(tab.id)}
        >
          <Text style={[styles.tabText, activeTab === tab.id]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    maxHeight: 50,
  },
  tabContent: {
    paddingHorizontal: 16,
    gap: 10,
  },
  tab: {
    height: 33,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 0,
    borderWidth: 1,
    borderColor: "#000000",
    marginRight: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#E7C9FF",
    borderColor: "#000000",
  },
  tabText: {
    fontSize: 14,
    lineHeight: 19,
    color: "#000000",
    fontWeight: "500",
    textAlignVertical: "center",
    includeFontPadding: false,
    padding: 0,
    margin: 0,
  },
});

export default EditControlTabs;
