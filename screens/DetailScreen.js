import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Layout from "../layouts/Layout";
import CustomHeader from "../components/CustomHeader";
import { Fonts } from "../styles/Fonts";
import DetailContentCard from "../components/detail/DetailContentCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useRecordDetailQuery } from "../hooks/useRecordDetailQuery";

const DetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { id } = route.params || {};
  const recordId = String(id);

  const { data, isLoading, isError, refetch } = useRecordDetailQuery(recordId);

  return (
    <Layout>
      <View>
        <CustomHeader />
        <TouchableOpacity
          style={[styles.editButton, Fonts.body3]}
          onPress={() => navigation.navigate("Edit", { id: recordId })}>
          <Text>편집하기</Text>
        </TouchableOpacity>
      </View>
      <DetailContentCard detail={data} />
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
