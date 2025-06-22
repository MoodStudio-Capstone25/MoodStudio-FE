import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import EditPanelActions from "./EditPanelActions";

const elements = [
  {
    id: "book",
    label: "책",
    icon: require("../../assets/images/edit/book.png"),
  },
  {
    id: "audio",
    label: "오디오",
    icon: require("../../assets/images/edit/audio.png"),
  },
  {
    id: "music",
    label: "음악",
    icon: require("../../assets/images/edit/music.png"),
  },
  {
    id: "game",
    label: "게임",
    icon: require("../../assets/images/edit/game.png"),
  },
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
              <Image
                source={element.icon}
                style={styles.iconImage}
                resizeMode="contain"
              />
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
    overflow: "hidden",
  },
  iconImage: {
    width: 64,
    height: 64,
  },
  elementLabel: {
    fontSize: 15,
    color: "#000000",
    fontWeight: "500",
  },
});

export default ElementChangePanel;
