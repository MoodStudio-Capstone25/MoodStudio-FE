import React, { useState, Suspense } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Canvas } from "@react-three/fiber/native";
import { OrbitControls, useGLTF } from "@react-three/drei/native";
import { Bounds, useBounds } from "@react-three/drei/native";
import Layout from "../layouts/Layout";
import EditHeader from "../components/edit/EditHeader";
import EditControlPanel from "../components/edit/EditControlPanel";
import EditControlTabs from "../components/edit/EditControlTabs";
import AlertModal from "../components/common/AlertModal";

function CabinetModel() {
  const { scene } = useGLTF(require("../assets/objects/cabinet.glb"));
  return <primitive object={scene} scale={1.5} position={[0, 0, 0]} />;
}

const Edit3DScreen = ({ navigation }) => {
  const handleCancel = () => setModalVisible(true);
  const handleDone = () => {
    console.log("Save");
  };
  const handleAdd = () => {
    navigation.navigate("MainStack", { screen: "Create3D" });
  };
  const [activeTab, setActiveTab] = useState("size");
  const [modalVisible, setModalVisible] = useState(false);

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
            <CabinetModel />
          </Bounds>
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            target={[0, 0.75, 0]}
            minDistance={5}
            maxDistance={15}
          />
        </Canvas>
        <EditControlTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <EditControlPanel activeTab={activeTab} />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Edit3DScreen;
