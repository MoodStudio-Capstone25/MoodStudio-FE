import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import EditPanelActions from "./EditPanelActions";

const AngleControlPanel = () => {
  const [objectSize, setObjectSize] = useState(50);
  const [sceneSize, setSceneSize] = useState(180);

  const handlePlus = (setter, value, max) => setter(Math.min(value + 1, max));
  const handleMinus = (setter, value, min) => setter(Math.max(value - 1, min));

  return (
    <View style={styles.container}>
      <EditPanelActions />
      <View style={styles.controlRow}>
        <Text style={styles.label}>왼쪽/오른쪽 회전</Text>
        <View style={styles.sliderContainer}>
          <TouchableOpacity
            style={styles.plusMinusButton}
            onPress={() => handleMinus(setObjectSize, objectSize, 0)}
          >
            <Text style={styles.plusMinusText}>-</Text>
          </TouchableOpacity>
          <Slider
            style={styles.slider}
            minimumValue={-180}
            maximumValue={180}
            value={objectSize}
            onValueChange={setObjectSize}
            minimumTrackTintColor="#fff"
            maximumTrackTintColor="#fff"
            thumbTintColor="#fff"
          />
          <TouchableOpacity
            style={styles.plusMinusButton}
            onPress={() => handlePlus(setObjectSize, objectSize, 100)}
          >
            <Text style={styles.plusMinusText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.valueLabel}>{objectSize}°</Text>
      </View>

      <View style={styles.controlRow}>
        <Text style={styles.label}>시계/반시계 회전</Text>
        <View style={styles.sliderContainer}>
          <TouchableOpacity
            style={styles.plusMinusButton}
            onPress={() => handleMinus(setSceneSize, sceneSize, 0)}
          >
            <Text style={styles.plusMinusText}>-</Text>
          </TouchableOpacity>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={360}
            value={sceneSize}
            onValueChange={setSceneSize}
            minimumTrackTintColor="#fff"
            maximumTrackTintColor="#fff"
            thumbTintColor="#fff"
          />
          <TouchableOpacity
            style={styles.plusMinusButton}
            onPress={() => handlePlus(setSceneSize, sceneSize, 360)}
          >
            <Text style={styles.plusMinusText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.valueLabel}>{Math.round(sceneSize)}°</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  controlRow: {
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    color: "#000000",
    marginBottom: 6,
    fontWeight: "500",
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 0,
  },
  plusMinusButton: {
    width: 30,
    height: 30,
    borderRadius: 16,
    backgroundColor: "#AA6ED9",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
  },
  plusMinusText: {
    fontSize: 20,
    color: "#000000",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: -2,
  },
  slider: {
    flex: 1,
    height: 32,
    marginHorizontal: 6,
  },
  valueLabel: {
    fontSize: 14,
    color: "#333",
    minWidth: 40,
    textAlign: "center",
  },
});

export default AngleControlPanel;
