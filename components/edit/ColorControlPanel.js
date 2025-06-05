import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import EditPanelActions from "./EditPanelActions";

const objectColors = [
  "#FFE2E2",
  "#FFEEE2",
  "#FFF9E2",
  "#EAFFE2",
  "#E2FFFA",
  "#E2E3FF",
  "#FDE2FF",
];

const cabinetColors = [
  "#FFE2E2",
  "#FFEEE2",
  "#FFF9E2",
  "#EAFFE2",
  "#E2FFFA",
  "#E2E3FF",
  "#FDE2FF",
];

const ColorControlPanel = () => {
  const [selectedObjectColor, setSelectedObjectColor] = useState(
    objectColors[2]
  );
  const [selectedCabinetColor, setCabinetCabinetColor] = useState(
    cabinetColors[1]
  );

  return (
    <View style={styles.container}>
      <EditPanelActions />
      <View style={styles.colorSection}>
        <Text style={styles.sectionTitle}>3D 요소 색</Text>
        <View style={styles.colorGrid}>
          {objectColors.map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.colorCircle,
                { backgroundColor: color },
                selectedObjectColor === color && styles.selectedColor,
              ]}
              onPress={() => setSelectedObjectColor(color)}
            />
          ))}
        </View>
      </View>

      <View style={styles.colorSection}>
        <Text style={styles.sectionTitle}>캐비넷 색</Text>
        <View style={styles.colorGrid}>
          {cabinetColors.map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.colorCircle,
                { backgroundColor: color },
                selectedCabinetColor === color && styles.selectedColor,
              ]}
              onPress={() => setCabinetCabinetColor(color)}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  colorSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 13,
    color: "#000000",
    marginBottom: 12,
    fontWeight: "500",
  },
  colorGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  colorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    // borderWidth: 1,
    // borderColor: "#000000",
  },
  selectedColor: {
    borderColor: "#ffffff",
    borderWidth: 3,
  },
});

export default ColorControlPanel;
