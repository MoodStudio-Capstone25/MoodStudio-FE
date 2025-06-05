import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ConfirmModal = ({ visible, onCancel, onConfirm, message }) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onCancel}
  >
    <View style={styles.overlay}>
      <View style={styles.modalBox}>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.divider} />
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
            <Text style={styles.cancelText}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteBtn} onPress={onConfirm}>
            <Text style={styles.deleteText}>삭제하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(128,128,128,0.6)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalBox: {
    width: "90%",
    marginBottom: 300,
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingTop: 36,
    paddingBottom: 18,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#222",
    overflow: "hidden",
  },
  message: {
    fontSize: 17,
    color: "#000000",
    textAlign: "center",
    marginBottom: 50,
    marginTop: 30,
    fontWeight: "500",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#d1d1d1",
    marginBottom: 0,
  },
  buttonRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 28,
    paddingTop: 10,
  },
  cancelBtn: {
    flex: 1,
    alignItems: "flex-start",
  },
  deleteBtn: {
    flex: 1,
    alignItems: "flex-end",
  },
  cancelText: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "500",
  },
  deleteText: {
    fontSize: 16,
    color: "#EE0000",
    fontWeight: "700",
  },
});

export default ConfirmModal;
