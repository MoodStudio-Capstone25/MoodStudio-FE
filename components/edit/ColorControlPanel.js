import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import EditPanelActions from "./EditPanelActions";
import { useUpdateCabinetMutation } from "../../hooks/useCabinetMutations";

const objectColors = [
  "#FFE2E2",
  "#FFEEE2",
  "#FFF9E2",
  "#EAFFE2",
  "#E2FFFA",
  "#E2E3FF",
  "#FDE2FF",
  "#ecb7f0ff",
];
const cabinetColors = [
  "#FFE2E2",
  "#FFEEE2",
  "#FFF9E2",
  "#EAFFE2",
  "#E2FFFA",
  "#E2E3FF",
  "#FDE2FF",
  "#ecb7f0",
];

const ColorControlPanel = ({ cabinetId, cabinetColor, onColorChange }) => {
  const [selectedObjectColor, setSelectedObjectColor] = useState(
    objectColors[2]
  );
  const [selectedCabinetColor, setSelectedCabinetColor] = useState(
    cabinetColor || cabinetColors[1]
  );

  const { mutate: updateCabinet } = useUpdateCabinetMutation();

  const handleSelectCabinetColor = (color) => {
    setSelectedCabinetColor(color);

    if (!cabinetId) return;

    updateCabinet(
      {
        pk: cabinetId,
        body: { color },
      },
      {
        onSuccess: (cabinet) => {
          onColorChange?.(cabinet.color || color);
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <EditPanelActions />

      <View style={styles.colorSection}>
        <Text style={styles.sectionTitle}>3D 요소 색</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.colorScroll}
        >
          {objectColors.map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.colorCircle,
                { backgroundColor: color },
                selectedObjectColor === color && styles.selectedColor,
              ]}
              onPress={() => setSelectedObjectColor(color)}
              activeOpacity={0.7}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.colorSection}>
        <Text style={styles.sectionTitle}>캐비넷 색</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.colorScroll}
        >
          {cabinetColors.map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.colorCircle,
                { backgroundColor: color },
                selectedCabinetColor === color && styles.selectedColor,
              ]}
              onPress={() => handleSelectCabinetColor(color)}
              activeOpacity={0.7}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  colorSection: { marginBottom: 25 },
  sectionTitle: {
    fontSize: 13,
    color: "#000000",
    marginBottom: 12,
    fontWeight: "500",
  },
  colorScroll: {
    flexDirection: "row",
    alignItems: "center",
  },
  colorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  selectedColor: {
    borderColor: "#ffffff",
    borderWidth: 3,
  },
});

export default ColorControlPanel;
