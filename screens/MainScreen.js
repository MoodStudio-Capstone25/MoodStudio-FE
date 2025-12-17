import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as SecureStore from "expo-secure-store";
import { Canvas } from "@react-three/fiber/native";
import { OrbitControls, useGLTF } from "@react-three/drei/native";
import { Bounds } from "@react-three/drei/native";
import Layout from "../layouts/Layout";
import HeaderIcons from "../components/main/HeaderIcons";
import { useCreateCabinetMutation } from "../hooks/useCabinetMutations";
import { useRecordElementsQuery } from "../hooks/useElementQueries";
import { SHAPE_MODELS } from "../constants/threeDModels";
import ItemModel from "../components/three/ItemModel";

// 각도 도->라디안 변환
const degToRad = (deg) => (Number(deg) * Math.PI) / 180;

// 캐비넷
function CabinetModel({ color }) {
  const { scene } = useGLTF(require("../assets/objects/cabinet.glb"));
  scene.traverse((obj) => {
    if (obj.isMesh && obj.material && obj.material.color) {
      obj.material.color.set(color);
    }
  });
  return <primitive object={scene} scale={1.5} position={[0, 0, 0]} />;
}

// 3D 요소들
function CabinetContents({ items = [] }) {
  return (
    <group>
      {items
        .filter((it) => it?.shape && SHAPE_MODELS[it.shape])
        .map((it) => (
          <ItemModel
            key={it.id}
            shape={it.shape}
            position={it.position ?? [0, 0, 0]}
            scale={it.scale ?? 1}
            rotation={it.rotation}
          />
        ))}
    </group>
  );
}

const CABINET_ID_KEY = "cabinet_id";
const CABINET_COLOR_KEY = "cabinet_color";

const MainScreen = ({ navigation, route }) => {
  const { data, isLoading, isError, error } = useRecordElementsQuery();
  const elements = data?.elements ?? [];

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

  // 서버 elements -> three 렌더용 items로 변환
  const items = useMemo(() => {
    return (elements ?? [])
      .filter((el) => el?.shape && SHAPE_MODELS[el.shape])
      .map((el) => ({
        id: el.id,
        shape: el.shape,
        position: [
          Number(el.position_x ?? el.position?.x ?? 0),
          Number(el.position_y ?? el.position?.y ?? 0),
          Number(el.position_z ?? el.position?.z ?? 0),
        ],
        scale: Number(el.size ?? 1),
        rotation: [
          degToRad(el.angle_x ?? el.angle?.x ?? 0),
          degToRad(el.angle_y ?? el.angle?.y ?? 0),
          degToRad(el.angle_z ?? el.angle?.z ?? 0),
        ],
        color: el.color,
        category: el.category,
      }));
  }, [elements]);

  return (
    <Layout>
      <HeaderIcons navigation={navigation} cabinetId={cabinetId} cabinetColor={cabinetColor} />

      <View style={{ padding: 16 }}>
        <Text>Cabinet ID: {cabinetId ?? "-"}</Text>
        <Text>색상: {cabinetColor}</Text>
        {isLoading && <Text>불러오는 중...</Text>}
        {isError && <Text>요소 로드 실패: {error?.message ?? "unknown"}</Text>}
        <Text>요소 개수: {items.length}</Text>
      </View>

      <View style={styles.container}>
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }} style={{ backgroundColor: "white" }}>
          <ambientLight intensity={1.0} />
          <directionalLight position={[5, 5, 5]} intensity={2.5} />
          <Bounds fit clip observe margin={1.0}>
            <CabinetModel color={cabinetColor} />
            <CabinetContents items={items} />
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
