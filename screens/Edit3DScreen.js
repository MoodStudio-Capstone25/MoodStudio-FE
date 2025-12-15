import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Canvas } from "@react-three/fiber/native";
import { OrbitControls, useGLTF } from "@react-three/drei/native";
import { Bounds } from "@react-three/drei/native";
import Layout from "../layouts/Layout";
import EditHeader from "../components/edit/EditHeader";
import EditControlPanel from "../components/edit/EditControlPanel";
import EditControlTabs from "../components/edit/EditControlTabs";
import AlertModal from "../components/common/AlertModal";

function CabinetModel({ color }) {
  const { scene } = useGLTF(require("../assets/objects/cabinet.glb"));
  scene.traverse((obj) => {
    if (obj.isMesh && obj.material && obj.material.color) {
      obj.material.color.set(color);
    }
  });
  return <primitive object={scene} scale={1.5} position={[0, 0, 0]} />;
}

const Edit3DScreen = ({ navigation, route }) => {
  const { cabinetId, cabinetColor } = route.params || {};
  const [activeTab, setActiveTab] = useState("size");
  const [modalVisible, setModalVisible] = useState(false);
  const [currentColor, setCurrentColor] = useState(cabinetColor || "#C8B5E7");

  const handleCancel = () => setModalVisible(true);

  const handleDone = () => {
    navigation.navigate("MainStack", {
      screen: "Main",
      params: { updatedColor: currentColor },
    });
  };

  const handleAdd = () => {
    navigation.navigate("MainStack", { screen: "Create3D" });
  };

  return (
    <Layout>
      <AlertModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        message="편집을 취소하시겠습니까?"
        confirmMsg="확인"
        onConfirm={() => {
          setModalVisible(false);
          navigation.goBack();
        }}
        onCancel={() => setModalVisible(false)}
      />

      <View style={styles.container}>
        <EditHeader
          onCancel={handleCancel}
          onDone={handleDone}
          onAdd={handleAdd}
        />

        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          style={{ backgroundColor: "white" }}
        >
          <ambientLight intensity={1.0} />
          <directionalLight position={[5, 5, 5]} intensity={2.5} />
          <Bounds fit clip observe margin={1.0}>
            <CabinetModel color={currentColor} />
          </Bounds>
          <OrbitControls
            enableZoom
            enablePan={false}
            target={[0, 0.75, 0]}
            minDistance={5}
            maxDistance={15}
          />
        </Canvas>

        <EditControlTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <EditControlPanel
          activeTab={activeTab}
          cabinetId={cabinetId}
          cabinetColor={currentColor}
          onColorChange={setCurrentColor}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default Edit3DScreen;
