import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as SecureStore from "expo-secure-store";
import { Canvas } from "@react-three/fiber/native";
import { OrbitControls, useGLTF } from "@react-three/drei/native";
import { Bounds } from "@react-three/drei/native";
import Layout from "../layouts/Layout";
import HeaderIcons from "../components/main/HeaderIcons";
import { useCreateCabinetMutation } from "../hooks/useCabinetMutations";
import { useRecordElementsQuery } from "../hooks/useElementQueries";

function CabinetModel({ color }) {
  const { scene } = useGLTF(require("../assets/objects/cabinet.glb"));
  scene.traverse((obj) => {
    if (obj.isMesh && obj.material && obj.material.color) {
      obj.material.color.set(color);
    }
  });
  return <primitive object={scene} scale={1.5} position={[0, 0, 0]} />;
}

const CABINET_ID_KEY = "cabinet_id";
const CABINET_COLOR_KEY = "cabinet_color";

const MainScreen = ({ navigation, route }) => {
  const { data: elements, isLoading, isError, error } = useRecordElementsQuery();

  const [cabinetId, setCabinetId] = useState(null);
  const [cabinetColor, setCabinetColor] = useState("#C8B5E7");

  const { mutate: createCabinet } = useCreateCabinetMutation();

  useEffect(() => {
    const initCabinet = async () => {
      const storedId = await SecureStore.getItemAsync(CABINET_ID_KEY);
      const storedColor = await SecureStore.getItemAsync(CABINET_COLOR_KEY);

      if (storedId) {
        setCabinetId(Number(storedId));
        if (storedColor) setCabinetColor(storedColor);
        return;
      }

      // 로컬에 없으면 한 번만 생성
      createCabinet(
        { color: "gray", position_y: 100 },
        {
          onSuccess: async (cabinet) => {
            setCabinetId(cabinet.id);
            setCabinetColor(cabinet.color || "#C8B5E7");

            await SecureStore.setItemAsync(CABINET_ID_KEY, String(cabinet.id));
            await SecureStore.setItemAsync(CABINET_COLOR_KEY, cabinet.color || "#C8B5E7");
          },
        }
      );
    };

    initCabinet();
  }, [createCabinet]);

  useEffect(() => {
    const syncUpdatedColor = async () => {
      const updatedColor = route?.params?.updatedColor;
      if (updatedColor) {
        setCabinetColor(updatedColor);
        await SecureStore.setItemAsync(CABINET_COLOR_KEY, updatedColor);
      }
    };
    syncUpdatedColor();
  }, [route?.params?.updatedColor]);

  return (
    <Layout>
      <HeaderIcons navigation={navigation} cabinetId={cabinetId} cabinetColor={cabinetColor} />

      <View style={{ padding: 16 }}>
        <Text>Cabinet ID: {cabinetId ?? "-"}</Text>
        <Text>색상: {cabinetColor}</Text>
      </View>

      <View style={styles.container}>
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }} style={{ backgroundColor: "white" }}>
          <ambientLight intensity={1.0} />
          <directionalLight position={[5, 5, 5]} intensity={2.5} />
          <Bounds fit clip observe margin={1.0}>
            <CabinetModel color={cabinetColor} />
          </Bounds>
          <OrbitControls
            enableZoom
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
  container: { flex: 1 },
});

export default MainScreen;
