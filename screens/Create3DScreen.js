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
import { SHAPE_MODELS } from "../constants/threeDModels";
import ItemModel from "../components/three/ItemModel";
import { useCreateElementMutation } from "../hooks/useElementQueries";

const SLOT_POS = {
  TOP_LEFT: [-0.7, 1.3, 0.0],
  TOP_CENTER: [0.0, 1.3, 0.0],
  TOP_RIGHT: [0.7, 1.3, 0.0],

  MID_LEFT: [-0.7, 0.8, 0.0],
  MID_CENTER: [-4, -4, -5],
  // //(문 기준) 가로, 높이-2(-4~1.2) ,세로
  // MID_CENTER: [-9, -2, -5],
  MID_RIGHT: [0.7, 0.8, 0.0],

  BOT_LEFT: [-0.7, 0.3, 0.0],
  BOT_CENTER: [0.0, 0.3, 0.0],
  BOT_RIGHT: [0.7, 0.3, 0.0],
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

function CabinetContents({ items = [] }) {
  return (
    <group>
      {items
        .filter((it) => it?.shape && SHAPE_MODELS[it.shape]) // 유효한 것만
        .map((it) => (
          <ItemModel
            key={it.id}
            shape={it.shape}
            position={SLOT_POS[it.slot] ?? [0, -1, 0]}
            scale={1}
          />
        ))}
    </group>
  );
}

const Create3DScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const itemShape = route?.params?.itemShape; // 캐비넷 key값
  const { cabinetId, cabinetColor } = route.params || {};
  const recordId = route?.params?.recordId.id; // api용 게시글 id
  const { mutate: createElement } = useCreateElementMutation();

  const [currentCabinetColor, setCurrentCabinetColor] = useState(cabinetColor || "#ffffff");
  const [activeTab, setActiveTab] = useState(0);
  const [filteredTabs] = useState(defaultTabs);

  const items =
    itemShape && SHAPE_MODELS[itemShape]
      ? [{ id: "temp-1", shape: itemShape, slot: "MID_CENTER" }]
      : [];

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleDone = () => {
    // 1) 보낼 대상이 없으면 그냥 이동
    if (!recordId || !itemShape) {
      navigation.navigate("MainTabs", {
        screen: "MainStack",
        params: { screen: "Main", params: { updatedColor: currentCabinetColor } },
      });
      return;
    }

    // 2) 현재는 MID_CENTER 고정이므로 해당 좌표 사용
    const [x, y, z] = SLOT_POS["MID_CENTER"] ?? [0, 0, 0];

    // 3) 요청 바디: record, shape, position만 “실사용”
    //    나머지는 임시 하드코딩
    const body = {
      record: recordId,
      shape: itemShape,
      color: "red",
      angle_x: 10,
      angle_y: 20,
      angle_z: 30,
      position_x: x,
      position_y: y,
      position_z: z,
      size: 5,
    };

    createElement(body, {
      onSuccess: () => {
        navigation.navigate("MainTabs", {
          screen: "MainStack",
          params: { screen: "Main", params: { updatedColor: currentCabinetColor } },
        });
      },
      onError: (err) => {
        console.log("create element error >>>", err?.response?.data || err?.message);
        // 실패해도 화면 이동은 하게 할지/막을지는 정책에 따라 선택
        navigation.navigate("MainTabs", {
          screen: "MainStack",
          params: { screen: "Main", params: { updatedColor: currentCabinetColor } },
        });
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

        <EditControlTabs activeTab={activeTab} onTabChange={setActiveTab} tabs={filteredTabs} />

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
