import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import EditPanelActions from "./EditPanelActions";
import ConfirmModal from "../common/ConfirmModal";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const BASE_WIDTH = 392;

const scale = (size) => (SCREEN_WIDTH / BASE_WIDTH) * size;

const normalize = (size) => Math.round(scale(size) * 0.83);

const ElementDeletePanel = ({ onDelete }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = () => {
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
        activeOpacity={0.85}
      >
        <Text style={styles.deleteButtonText}>선택한 3D 요소 삭제하기</Text>
      </TouchableOpacity>
      <View>
        <ConfirmModal
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          onConfirm={handleDelete}
          message="정말로 삭제하시겠습니까?"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textBox: {
    marginTop: scale(18),
    marginBottom: scale(20),
    paddingHorizontal: scale(6),
    width: "100%",
  },
  infoText: {
    color: "#000000",
    fontSize: normalize(15),
    textAlign: "center",
    lineHeight: normalize(24),
    fontWeight: "500",
  },
  deleteButton: {
    width: "100%",
    paddingVertical: scale(14),
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EE0000",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: scale(8),
  },
  deleteButtonText: {
    color: "#EE0000",
    fontSize: normalize(18),
    fontWeight: "600",
    lineHeight: normalize(22),
  },
});

export default ElementDeletePanel;
