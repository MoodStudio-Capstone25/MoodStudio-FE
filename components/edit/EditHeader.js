import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const EditHeader = ({ onCancel, onDone, onAdd }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={onCancel}>
          <Text style={styles.textButton}>취소</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDone}>
          <Text style={styles.textButton}>수정 완료</Text>
        </TouchableOpacity>
      </View>
      {onAdd && (
        <View style={styles.addButtonWrapper}>
          <TouchableOpacity style={styles.addButton} onPress={onAdd}>
            <Text style={styles.addButtonText}>3D 요소 추가하기</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    paddingTop: 16,
    paddingHorizontal: 18,
    backgroundColor: "transparent",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  textButton: {
    fontSize: 18,
    color: "#222",
    fontWeight: "500",
  },
  addButtonWrapper: {
    alignItems: "center",
  },
  addButton: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 22,
    backgroundColor: "#fff",
    paddingHorizontal: 22,
    paddingVertical: 7,
    marginTop: 2,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 16,
    color: "#222",
    fontWeight: "500",
    lineHeight: 22,
    textAlignVertical: "center",
    padding: 0,
    margin: 0,
  },
});

export default EditHeader;
