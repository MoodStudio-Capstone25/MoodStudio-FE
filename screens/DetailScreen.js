import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Layout from "../layouts/Layout";
import CustomHeader from "../components/CustomHeader";
import { Fonts } from "../styles/Fonts";
import DetailContentCard from "../components/detail/DetailContentCard";

const DetailScreen = () => {
  return (
    <Layout>
      <View>
        <CustomHeader />
        <TouchableOpacity style={[styles.editButton, Fonts.body3]}>
          <Text>편집하기</Text>
        </TouchableOpacity>
      </View>
      <DetailContentCard />
      {/* <DetailBasicCard /> */}
    </Layout>
  );
};

const styles = StyleSheet.create({
  editButton: {
    position: "absolute",
    top: 12,
    right: 16,
    padding: 6,
    backgroundColor: "transparent",
    zIndex: 10,
  },
});

export default DetailScreen;
