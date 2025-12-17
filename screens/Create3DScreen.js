// screens/Create3DScreen.js
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Canvas } from "@react-three/fiber/native";
import { OrbitControls, useGLTF } from "@react-three/drei/native";
import { Bounds } from "@react-three/drei/native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Layout from "../layouts/Layout";
import EditHeader from "../components/edit/EditHeader";
import EditControlPanel from "../components/edit/EditControlPanel";
import EditControlTabs from "../components/edit/EditControlTabs";
import { defaultTabs } from "../components/edit/EditControlTabs";

// 지원하는 3D 모델 사전 정의
const SHAPE_MODELS = {
  sports2: require("../assets/objects/sports2.glb"),
  // 실제 파일명에 맞게 추가
};

function CabinetModel({ color }) {
  const { scene } = useGLTF(require("../assets/objects/cabinet.glb"));
  scene.traverse((obj) => {
    if (obj.isMesh && obj.material && obj.material.color) {
      obj.material.color.set(color);
    }
  });
  return <primitive object={scene} scale={1.5} position={[0, 0, 0]} />;
}

function ModelLoader({ shape }) {
  if (!shape || !SHAPE_MODELS[shape]) {
    console.warn(`Model ${shape} not found`);
    return null;
  }

  const { scene } = useGLTF(SHAPE_MODELS[shape]);
  return <primitive object={scene} scale={0.5} position={[0, 1, 0]} />;
}

const Create3DScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const itemShape = route?.params?.itemShape;
  const { cabinetId, cabinetColor } = route.params || {};
  console.log("itemShape >>>", itemShape);

  const [currentCabinetColor, setCurrentCabinetColor] = useState(
    cabinetColor || "#ffffff"
  );
  const [activeTab, setActiveTab] = useState(0);
  const [filteredTabs] = useState(defaultTabs);

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleDone = () => {
    navigation.navigate("MainTabs", {
      screen: "MainStack",
      params: {
        screen: "Main",
        params: { updatedColor: currentCabinetColor },
      },
    });
  };

  return (
    <Layout>
      <View style={styles.container}>
        <EditHeader onCancel={handleCancel} onDone={handleDone} />

        <Canvas camera={{ position: [0, 0, 5], fov: 60 }} style={styles.canvas}>
          <ambientLight intensity={1.0} />
          <directionalLight position={[5, 5, 5]} intensity={2.5} />

          <Bounds fit clip observe margin={1.0}>
            <CabinetModel color={currentCabinetColor} />
            {itemShape && <ModelLoader shape={itemShape} />}
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
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  canvas: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default Create3DScreen;
