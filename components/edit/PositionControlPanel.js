import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import EditPanelActions from "./EditPanelActions";

const WORLD_RANGE = {
  x: { min: -15, max: 15 },
  y: { min: -15, max: 15 },
  z: { min: -8, max: 8 },
};

const sliderToWorld = (v01, min, max) => min + (v01 / 100) * (max - min);
const worldToSlider = (world, min, max) => ((world - min) / (max - min)) * 100;

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const round1 = (v) => Math.round(v * 10) / 10;

const PositionControlPanel = ({ value, onChange }) => {
  const updown = value?.updown ?? 50;
  const leftright = value?.leftright ?? 50;
  const frontback = value?.frontback ?? 50;

  const setUpdown = (v) => onChange((prev) => ({ ...prev, updown: v }));
  const setLeftright = (v) => onChange((prev) => ({ ...prev, leftright: v }));
  const setFrontback = (v) => onChange((prev) => ({ ...prev, frontback: v }));

  const bumpWorld = ({ axis, dir }) => {
    const stepWorld = 0.1;

    const cfg =
      axis === "x"
        ? { cur: leftright, set: setLeftright, min: WORLD_RANGE.x.min, max: WORLD_RANGE.x.max }
        : axis === "y"
        ? { cur: updown, set: setUpdown, min: WORLD_RANGE.y.min, max: WORLD_RANGE.y.max }
        : { cur: frontback, set: setFrontback, min: WORLD_RANGE.z.min, max: WORLD_RANGE.z.max };

    const curWorld = sliderToWorld(cfg.cur, cfg.min, cfg.max);
    const nextWorld = clamp(round1(curWorld + dir * stepWorld), cfg.min, cfg.max);
    const nextSlider = clamp(worldToSlider(nextWorld, cfg.min, cfg.max), 0, 100);

    cfg.set(nextSlider);
  };

  const renderRow = ({ label, axis, value, setValue }) => (
    <View style={styles.controlRow}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.sliderContainer}>
        <TouchableOpacity
          style={styles.plusMinusButton}
          onPress={() => bumpWorld({ axis, dir: -1 })}
        >
          <Text style={styles.plusMinusText}>-</Text>
        </TouchableOpacity>

        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          value={value}
          onValueChange={setValue}
          minimumTrackTintColor="#fff"
          maximumTrackTintColor="#fff"
          thumbTintColor="#fff"
        />

        <TouchableOpacity
          style={styles.plusMinusButton}
          onPress={() => bumpWorld({ axis, dir: +1 })}
        >
          <Text style={styles.plusMinusText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <EditPanelActions />

      {renderRow({
        label: "상하",
        axis: "y",
        value: updown,
        setValue: setUpdown,
      })}

      {renderRow({
        label: "좌우",
        axis: "x",
        value: leftright,
        setValue: setLeftright,
      })}

      {renderRow({
        label: "앞뒤",
        axis: "z",
        value: frontback,
        setValue: setFrontback,
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  controlRow: {
    marginBottom: 18,
    height: 40,
  },
  label: {
    fontSize: 13,
    color: "#000",
    marginBottom: 2,
    fontWeight: "500",
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 0,
  },
  slider: {
    flex: 1,
    height: 32,
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
    color: "#000",
    fontWeight: "bold",
    marginTop: -2,
  },
});

export default PositionControlPanel;
