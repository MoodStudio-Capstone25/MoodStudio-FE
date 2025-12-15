import React from "react";
import { View, StyleSheet } from "react-native";
import SizeControlPanel from "./SizeControlPanel";
import AngleControlPanel from "./AngleControlPanel";
import ColorControlPanel from "./ColorControlPanel";
import ElementChangePanel from "./ElementChangePanel";
import ElementDeletePanel from "./ElementDeletePanel";

const EditControlPanel = ({
  activeTab,
  cabinetId,
  cabinetColor,
  onColorChange,
}) => {
  const renderPanel = () => {
    switch (activeTab) {
      case "size":
        return <SizeControlPanel />;
      case "angle":
        return <AngleControlPanel />;
      case "color":
        return (
          <ColorControlPanel
            cabinetId={cabinetId}
            cabinetColor={cabinetColor}
            onColorChange={onColorChange}
          />
        );
      case "change":
        return <ElementChangePanel />;
      case "delete":
        return <ElementDeletePanel />;
      default:
        return <SizeControlPanel />;
    }
  };

  return <View style={styles.container}>{renderPanel()}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E7C9FF",
    borderRadius: 24,
    borderColor: "#000000",
    borderWidth: 1.5,
    marginHorizontal: 16, // 좌우 여백
    marginBottom: 16, // 하단 여백
    marginTop: 0,
    padding: 15, // 내부 여백
    height: 240,
  },
});

export default EditControlPanel;
