import React, { Suspense } from "react";
import { View, StyleSheet, Text, Button, TouchableOpacity } from "react-native";
import { Canvas } from "@react-three/fiber/native";
import { OrbitControls, useGLTF } from "@react-three/drei/native";
import { Bounds, useBounds } from "@react-three/drei/native";
import Layout from "../layouts/Layout";
import IconButton from "../components/main/IconButton";
import HeaderIcons from "../components/main/HeaderIcons";

function CabinetModel() {
  const { scene } = useGLTF(require("../assets/objects/cabinet2.glb"));
  return <primitive object={scene} scale={1.5} position={[0, 0, 0]} />;
}

const MainScreen = ({ navigation }) => {
  const goToCabinetTest = () => {
    navigation.navigate("CabinetTest");
  };
  return (
    <Layout>
      <HeaderIcons navigation={navigation} />

      {/* 테스트용 버튼 하나 추가 */}
      <TouchableOpacity
        onPress={goToCabinetTest}
        style={{ padding: 12, backgroundColor: "black" }}
      >
        <Text style={{ color: "white" }}>Cabinet API 테스트 이동</Text>
      </TouchableOpacity>

      <View style={styles.container}>
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
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainScreen;
