import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import EditPanelActions from "./EditPanelActions";

const elements = [
  { id: "book", label: "책" },
  { id: "audio", label: "오디오" },
  { id: "music", label: "음악" },
  { id: "game", label: "게임" },
];

const ElementChangePanel = () => {
  return (
    <View style={styles.container}>
      <EditPanelActions />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.elementsRow}
      >
        {elements.map((element) => (
          <TouchableOpacity
            key={element.id}
            style={styles.elementItem}
            onPress={() => {}}
          >
            <View style={styles.iconContainer}>
              <Text style={styles.icon}></Text>
            </View>
            <Text style={styles.elementLabel}>{element.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  elementsRow: {
    flexDirection: "row",
    gap: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
  },
  elementItem: {
    alignItems: "center",
    padding: 0,
    borderRadius: 12,
    backgroundColor: "transparent",
  },
  iconContainer: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  icon: {
    fontSize: 30,
  },
  elementLabel: {
    fontSize: 15,
    color: "#000000",
    fontWeight: "500",
  },
});

export default ElementChangePanel;
