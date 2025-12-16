// screens/Create3DScreen.js
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Canvas } from "@react-three/fiber/native";
import { OrbitControls, useGLTF } from "@react-three/drei/native";
import { Bounds } from "@react-three/drei/native";
import Layout from "../layouts/Layout";
import EditHeader from "../components/edit/EditHeader";
import EditControlPanel from "../components/edit/EditControlPanel";
import EditControlTabs, {
  defaultTabs,
} from "../components/edit/EditControlTabs";

function CabinetModel({ color }) {
  const { scene } = useGLTF(require("../assets/objects/cabinet.glb"));
  scene.traverse((obj) => {
    if (obj.isMesh && obj.material && obj.material.color) {
      obj.material.color.set(color);
    }
  });
  return <primitive object={scene} scale={1.5} position={[0, 0, 0]} />;
}

const Create3DScreen = ({ navigation, route }) => {
  // 이전 단계(예: Create3DShapeScreen)에서 전달받을 값
  const { cabinetId, cabinetColor } = route?.params || {};

  const filteredTabs = defaultTabs.filter((tab) => tab.id !== "delete");
  const [activeTab, setActiveTab] = useState(filteredTabs[2]?.id || "color"); // 기본 탭을 색으로 하고 싶다면 조정

  // 이 화면에서 사용하는 현재 캐비넷 색
  const [currentCabinetColor, setCurrentCabinetColor] = useState(
    cabinetColor || "#C8B5E7"
  );

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleDone = () => {
    // 요소 배치까지 끝낸 뒤 메인으로 돌아가면서 최신 캐비넷 색 전달
    navigation.navigate("MainTabs", {
      screen: "MainStack",
      params: {
        screen: "Main", // MainScreen 이름에 맞게
        params: { updatedColor: currentCabinetColor },
      },
    });
  };

  return (
    <Layout>
      <View style={styles.container}>
        <EditHeader onCancel={handleCancel} onDone={handleDone} />

        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          style={{ backgroundColor: "white" }}
        >
          <ambientLight intensity={1.0} />
          <directionalLight position={[5, 5, 5]} intensity={2.5} />
          <Bounds fit clip observe margin={1.0}>
            <CabinetModel color={currentCabinetColor} />
          </Bounds>
          <OrbitControls
            enableZoom
            enablePan={false}
            target={[0, 0.75, 0]}
            minDistance={5}
            maxDistance={15}
          />
        </Canvas>

        <EditControlTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={filteredTabs}
        />

        <EditControlPanel
          activeTab={activeTab}
          cabinetId={cabinetId}
          cabinetColor={currentCabinetColor}
          onColorChange={setCurrentCabinetColor}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default Create3DScreen;
