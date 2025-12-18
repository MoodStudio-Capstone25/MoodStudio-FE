// screens/Create3DScreen.js
import React, { useEffect, useMemo, useState } from "react";
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

const WORLD_RANGE = {
  x: { min: -15, max: 15 },
  y: { min: -15, max: 15 },
  z: { min: -8, max: 8 },
};

// 0~100 슬라이더 값을 월드좌표로 변환
const sliderToWorld = (v01, min, max) => min + (v01 / 100) * (max - min);

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
          <ItemModel key={it.id} shape={it.shape} position={it.position ?? [0, 0, 0]} scale={1} />
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
  const [activeTab, setActiveTab] = useState(defaultTabs[0].id);
  const [filteredTabs] = useState(defaultTabs);

  // MID_CENTER: [-9, -2, -5],
  // //(문 기준) 가로, 높이-2(-4~1.2) ,세로
  const [position, setPosition] = useState({
    x: -9,
    y: 0,
    z: -3,
  });

  // 슬라이더 값(0~100). 50이 “중앙(=오프셋 0)”이 되게 설계
  const [posUI, setPosUI] = useState({
    updown: 50,
    leftright: 50,
    frontback: 50,
  });

  // 슬라이더 변화 -> 실제 월드 좌표 반영
  // 소수 단위
  // const round1 = (v) => Math.round(v * 1000) / 1000;
  // useEffect(() => {
  //   const x = round1(sliderToWorld(posUI.leftright, WORLD_RANGE.x.min, WORLD_RANGE.x.max));
  //   const y = round1(sliderToWorld(posUI.updown, WORLD_RANGE.y.min, WORLD_RANGE.y.max));
  //   const z = round1(sliderToWorld(posUI.frontback, WORLD_RANGE.z.min, WORLD_RANGE.z.max));

  //   setPosition({ x, y, z });
  // }, [posUI]);
  // 정수 단위
  useEffect(() => {
    const x = Math.round(sliderToWorld(posUI.leftright, WORLD_RANGE.x.min, WORLD_RANGE.x.max));
    const y = Math.round(sliderToWorld(posUI.updown, WORLD_RANGE.y.min, WORLD_RANGE.y.max));
    const z = Math.round(sliderToWorld(posUI.frontback, WORLD_RANGE.z.min, WORLD_RANGE.z.max));
    setPosition({ x, y, z });
  }, [posUI]);

  // items 생성 시 slot 대신 “직접 position”을 쓰도록 바꿈
  const items =
    itemShape && SHAPE_MODELS[itemShape]
      ? [
          {
            id: "preview",
            shape: itemShape,
            position: [position.x, position.y, position.z],
          },
        ]
      : [];

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleDone = () => {
    if (!recordId || !itemShape) {
      navigation.navigate("MainTabs", {
        screen: "MainStack",
        params: {
          screen: "Main",
          params: { updatedColor: currentCabinetColor },
        },
      });
      return;
    }

    // 나머지는 임시 하드코딩
    const body = {
      record: recordId,
      shape: itemShape,
      color: "basic",
      angle_x: 0,
      angle_y: 0,
      angle_z: 0,
      position_x: position.x,
      position_y: position.y,
      position_z: position.z,
      size: 1,
    };

    console.log("createElement body >>>", body);

    createElement(body, {
      onSuccess: () => {
        navigation.navigate("MainTabs", {
          screen: "MainStack",
          params: {
            screen: "Main",
            params: { updatedColor: currentCabinetColor },
          },
        });
      },
      onError: (err) => {
        console.log("create element error >>>", err?.response?.data || err?.message);
        // 실패해도 화면 이동은 하게 할지/막을지는 정책에 따라 선택
        navigation.navigate("MainTabs", {
          screen: "MainStack",
          params: {
            screen: "Main",
            params: { updatedColor: currentCabinetColor },
          },
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
          posUI={posUI}
          onChangePosUI={setPosUI}
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
