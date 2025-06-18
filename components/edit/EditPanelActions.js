import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import UndoLeftIcon from "../../assets/images/edit/undo-left.svg";
import UndoRightIcon from "../../assets/images/edit/undo-right.svg";
import ReturnIcon from "../../assets/images/edit/return.svg";

const EditPanelActions = ({ onUndo, onRedo, onReset }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconButton} onPress={onUndo}>
        <UndoLeftIcon width={20} height={20} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={onRedo}>
        <UndoRightIcon width={20} height={20} />
      </TouchableOpacity>
      <View style={styles.spacer} />
      <TouchableOpacity style={styles.resetButton} onPress={onReset}>
        <ReturnIcon width={18} height={18} />
        <Text style={styles.resetText}>원상복귀</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 0,
    width: "100%",
  },
  iconButton: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#E7C9FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  spacer: {
    flex: 1,
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#E7C9FF",
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  resetText: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "500",
    marginLeft: 6,
    lineHeight: 18,
  },
});

export default EditPanelActions;
