import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import EditPanelActions from "./EditPanelActions";
import Slider from "@react-native-community/slider";

const VerticalSlider = ({ value, onChange, min, max }) => (
  <View style={styles.sliderWrapper}>
    <Slider
      style={styles.slider}
      minimumValue={min}
      maximumValue={max}
      value={value}
      onValueChange={onChange}
      minimumTrackTintColor="#fff"
      maximumTrackTintColor="#fff"
      thumbTintColor="#fff"
      thumbStyle={styles.thumb}
      trackStyle={styles.track}
    />
  </View>
);

const PositionControlPanel = ({ value, onChange }) => {
  const updown = value?.updown ?? 50;
  const leftright = value?.leftright ?? 50;
  const frontback = value?.frontback ?? 50;

  const setUpdown = (v) => onChange((prev) => ({ ...prev, updown: v }));
  const setLeftright = (v) => onChange((prev) => ({ ...prev, leftright: v }));
  const setFrontback = (v) => onChange((prev) => ({ ...prev, frontback: v }));

  const handlePlus = (setter, cur, max) => setter(Math.min(cur + 1, max));
  const handleMinus = (setter, cur, min) => setter(Math.max(cur - 1, min));

  return (
    <View style={styles.container}>
      <EditPanelActions />
      <View style={styles.row}>
        <View style={styles.slidersSection}>
          <View style={styles.sliderCol}>
            <Text style={styles.sliderLabel}>상하</Text>
            <TouchableOpacity
              style={styles.plusMinusButton}
              onPress={() => handlePlus(setUpdown, updown, 100)}
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
                  thumbStyle={styles.thumb}
                  trackStyle={styles.track}
                />
                <View style={styles.sliderOverlay} pointerEvents="none" />
              </View>
            </View>
            <TouchableOpacity
              style={styles.plusMinusButton}
              onPress={() => handleMinus(setUpdown, updown, 0)}
            >
              <Text style={styles.plusMinusText}>-</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sliderCol}>
            <Text style={styles.sliderLabel}>좌우</Text>
            <TouchableOpacity
              style={styles.plusMinusButton}
              onPress={() => handlePlus(setLeftright, leftright, 100)}
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
                  thumbStyle={styles.thumb}
                  trackStyle={styles.track}
                />
                <View style={styles.sliderOverlay} pointerEvents="none" />
              </View>
            </View>
            <TouchableOpacity
              style={styles.plusMinusButton}
              onPress={() => handleMinus(setLeftright, leftright, 0)}
            >
              <Text style={styles.plusMinusText}>-</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sliderCol}>
            <Text style={styles.sliderLabel}>앞뒤</Text>
            <TouchableOpacity
              style={styles.plusMinusButton}
              onPress={() => handlePlus(setFrontback, frontback, 100)}
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
                  thumbStyle={styles.thumb}
                  trackStyle={styles.track}
                />
                <View style={styles.sliderOverlay} pointerEvents="none" />
              </View>
            </View>
            <TouchableOpacity
              style={styles.plusMinusButton}
              onPress={() => handleMinus(setFrontback, frontback, 0)}
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
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 0,
    flex: 1,
  },
  slidersSection: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    flex: 1.2,
    gap: 18,
    marginRight: 18,
  },
  sliderCol: {
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  sliderLabel: {
    fontSize: 13,
    color: "#000000",
    marginBottom: 3,
    fontWeight: "500",
  },
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
    color: "#000000",
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
  slider: {
    width: 90,
    height: 32,
  },
  sliderOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  previewBox: {
    width: 150,
    height: 160,
    backgroundColor: "transparent",
    borderRadius: 10,
    marginLeft: 0,
    alignSelf: "flex-start",
    overflow: "hidden",
  },
  headsetImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default PositionControlPanel;
