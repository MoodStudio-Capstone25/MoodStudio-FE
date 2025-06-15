import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Layout from "../layouts/Layout";
import CustomHeader from "../components/CustomHeader";
import { Fonts } from "../styles/Fonts";
import CustomButton from "../components/common/CustomButton";

const Create3DShapeScreen = () => {
  return (
    <Layout>
      <CustomHeader title="3D 요소 모양 설정" />
      <Text>3D 요소 선택지</Text>
      <CustomButton buttonText="다음" buttonLayoutProps={{ marginTop: 32 }} />
    </Layout>
  );
};

export default Create3DShapeScreen;
