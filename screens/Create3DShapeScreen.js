import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Layout from "../layouts/Layout";
import CustomHeader from "../components/CustomHeader";
import CustomButton from "../components/common/CustomButton";
import ThreeDShapeList from "../components/create/3d-shape/ThreeDShapeList";
import SectionTitle from "../components/create/common/SectionTitle";

const Create3DShapeScreen = () => {
  const [selectedShape, setSelectedShape] = useState(null);
  const navigation = useNavigation();

  return (
    <Layout>
      <CustomHeader title="3D 요소 모양 설정" />

      <View style={styles.threeDLayout}>
        <SectionTitle titleText="캐비넷에 배치할 3D 요소를 선택하세요" highlightColor="#F2E1FF" />
        <ThreeDShapeList selectedShape={selectedShape} setSelectedShape={setSelectedShape} />
      </View>

      <CustomButton
        buttonText="다음"
        buttonLayoutProps={{ marginTop: 32 }}
        onPress={() => {
          console.log("Navigate to Create3D triggered");
          navigation.navigate("MainTabs", {
            screen: "MainStack",
            params: { screen: "Create3D", params: { itemShape: selectedShape } },
          });
        }}
      />
    </Layout>
  );
};

export default Create3DShapeScreen;

const styles = StyleSheet.create({
  threeDLayout: {
    marginHorizontal: 16,
  },
});
