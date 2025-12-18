import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

export const defaultTabs = [
  { id: "position", label: "위치 조정" },
  { id: "size", label: "크기 조정" },
  { id: "angle", label: "각도 조정" },
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
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => {
              onTabChange(tab.id);
              if (tab.id !== "position") {
                Toast.show({
                  type: "error",
                  text1: "준비 중인 기능입니다.",
                  text2: "현재는 위치 조정만 사용할 수 있어요.",
                  position: "bottom",
                  visibilityTime: 1500,
                });
              }
            }}
          >
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
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
