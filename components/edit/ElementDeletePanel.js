import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import EditPanelActions from "./EditPanelActions";
import ConfirmModal from "../common/ConfirmModal";

const ElementDeletePanel = ({ onDelete }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = () => {
    // 실제 삭제 로직
    setModalVisible(false);
    if (onDelete) onDelete();
  };
  return (
    <View style={styles.container}>
      <EditPanelActions />
      <View style={styles.textBox}>
        <Text style={styles.infoText}>
          선택한 3D 요소의 크기, 각도, 색 등의 설정이 함께 사라집니다.{"\n"}
          해당 기록을 다시 캐비넷 안에 3D 요소로 배치하고 싶다면{"\n"}
          상단의 ‘3D 요소 추가하기’ 버튼을 눌러 추가해주세요.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.deleteButtonText}>선택한 3D 요소 삭제하기</Text>
      </TouchableOpacity>

      <ConfirmModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onConfirm={handleDelete}
        message="정말로 삭제하시겠습니까?"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textBox: {
    marginTop: 25,
    marginBottom: 28,
    paddingHorizontal: 4,
    width: "100%",
  },
  infoText: {
    color: "#000000",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "500",
  },
  deleteButton: {
    width: "100%",
    paddingVertical: 8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#EE0000",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButtonText: {
    color: "#EE0000",
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 21,
  },
});

export default ElementDeletePanel;
