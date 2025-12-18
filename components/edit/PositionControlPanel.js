import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import EditPanelActions from "./EditPanelActions";
import Slider from "@react-native-community/slider";

const WORLD_RANGE = {
  x: { min: -15, max: 15 },
  y: { min: -15, max: 15 },
  z: { min: -8, max: 8 },
};

// 0~100(slider) -> world
const sliderToWorld = (v01, min, max) => min + (v01 / 100) * (max - min);

// world -> 0~100(slider)
const worldToSlider = (world, min, max) => ((world - min) / (max - min)) * 100;

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const round1 = (v) => Math.round(v * 10) / 10; // 소수 첫째 자리

const PositionControlPanel = ({ value, onChange }) => {
  const updown = value?.updown ?? 50;
  const leftright = value?.leftright ?? 50;
  const frontback = value?.frontback ?? 50;

  const setUpdown = (v) => onChange((prev) => ({ ...prev, updown: v }));
  const setLeftright = (v) => onChange((prev) => ({ ...prev, leftright: v }));
  const setFrontback = (v) => onChange((prev) => ({ ...prev, frontback: v }));

  // 버튼 클릭 시: "월드 0.1" 단위로 이동
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

    // 슬라이더 값은 float이어도 Slider가 문제 없이 받습니다.
    cfg.set(nextSlider);
  };

  return (
    <View style={styles.container}>
      <EditPanelActions />

      <View style={styles.row}>
        <View style={styles.slidersSection}>
          {/* 상하(y) */}
          <View style={styles.sliderCol}>
            <Text style={styles.sliderLabel}>상하</Text>
            <TouchableOpacity
              style={styles.plusMinusButton}
              onPress={() => bumpWorld({ axis: "y", dir: +1 })}
            >
              <Text style={styles.plusMinusText}>+</Text>
            </TouchableOpacity>

            <View style={styles.verticalSliderBox}>
              <View style={styles.verticalSlider}>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={100}
                  value={updown}
                  onValueChange={setUpdown}
                  minimumTrackTintColor="#fff"
                  maximumTrackTintColor="#fff"
                  thumbTintColor="#fff"
                />
                <View style={styles.sliderOverlay} pointerEvents="none" />
              </View>
            </View>

            <TouchableOpacity
              style={styles.plusMinusButton}
              onPress={() => bumpWorld({ axis: "y", dir: -1 })}
            >
              <Text style={styles.plusMinusText}>-</Text>
            </TouchableOpacity>
          </View>

          {/* 좌우(x) */}
          <View style={styles.sliderCol}>
            <Text style={styles.sliderLabel}>좌우</Text>
            <TouchableOpacity
              style={styles.plusMinusButton}
              onPress={() => bumpWorld({ axis: "x", dir: +1 })}
            >
              <Text style={styles.plusMinusText}>+</Text>
            </TouchableOpacity>

            <View style={styles.verticalSliderBox}>
              <View style={styles.verticalSlider}>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={100}
                  value={leftright}
                  onValueChange={setLeftright}
                  minimumTrackTintColor="#fff"
                  maximumTrackTintColor="#fff"
                  thumbTintColor="#fff"
                />
                <View style={styles.sliderOverlay} pointerEvents="none" />
              </View>
            </View>

            <TouchableOpacity
              style={styles.plusMinusButton}
              onPress={() => bumpWorld({ axis: "x", dir: -1 })}
            >
              <Text style={styles.plusMinusText}>-</Text>
            </TouchableOpacity>
          </View>

          {/* 앞뒤(z) */}
          <View style={styles.sliderCol}>
            <Text style={styles.sliderLabel}>앞뒤</Text>
            <TouchableOpacity
              style={styles.plusMinusButton}
              onPress={() => bumpWorld({ axis: "z", dir: +1 })}
            >
              <Text style={styles.plusMinusText}>+</Text>
            </TouchableOpacity>

            <View style={styles.verticalSliderBox}>
              <View style={styles.verticalSlider}>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={100}
                  value={frontback}
                  onValueChange={setFrontback}
                  minimumTrackTintColor="#fff"
                  maximumTrackTintColor="#fff"
                  thumbTintColor="#fff"
                />
                <View style={styles.sliderOverlay} pointerEvents="none" />
              </View>
            </View>

            <TouchableOpacity
              style={styles.plusMinusButton}
              onPress={() => bumpWorld({ axis: "z", dir: -1 })}
            >
              <Text style={styles.plusMinusText}>-</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.previewBox}>
          <Image
            source={require("../../assets/images/edit/music.png")}
            style={styles.headsetImage}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  row: { flexDirection: "row", alignItems: "flex-start", flex: 1 },
  slidersSection: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    flex: 1.2,
    gap: 18,
    marginRight: 18,
  },
  sliderCol: { alignItems: "center", justifyContent: "flex-start", flex: 1 },
  sliderLabel: { fontSize: 13, color: "#000", marginBottom: 3, fontWeight: "500" },
  plusMinusButton: {
    width: 30,
    height: 30,
    borderRadius: 16,
    backgroundColor: "#AA6ED9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#000",
  },
  plusMinusText: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: -2,
  },
  verticalSliderBox: {
    height: 100,
    width: 32,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: -15,
    backgroundColor: "transparent",
    borderColor: "#000",
    overflow: "hidden",
  },
  verticalSlider: {
    transform: [{ rotate: "-90deg" }],
    width: 90,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  slider: { width: 90, height: 32 },
  sliderOverlay: { ...StyleSheet.absoluteFillObject },
  previewBox: {
    width: 150,
    height: 160,
    backgroundColor: "transparent",
    borderRadius: 10,
    alignSelf: "flex-start",
    overflow: "hidden",
  },
  headsetImage: { width: "100%", height: "100%", resizeMode: "contain" },
});

export default PositionControlPanel;
