import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Fonts } from "../../styles/Fonts";

const ReviewCard = ({ reviewTitle, reviewContents, reviewImage = null }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("DetailStack")}
    >
      <View style={styles.textWrapper}>
        {reviewTitle && (
          <Text style={[Fonts.subtitle2, styles.title]} numberOfLines={1}>
            {reviewTitle}
          </Text>
        )}
        {reviewContents && (
          <Text
            style={[styles.contents, Fonts.body3]}
            numberOfLines={reviewTitle ? 2 : 3}
          >
            {reviewContents}
          </Text>
        )}
      </View>

      {reviewImage && (
        <View style={[styles.imageWrapper, styles.image]}>
          <Image
            style={styles.image}
            source={require("../../assets/images/login/main-page.png")}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    padding: 16,

    display: "flex",
    flexDirection: "row",
    alignSelf: "stretch",

    alignItems: "center",

    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#FFF",
  },
  textWrapper: {
    display: "flex",
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
  },
  title: {
    marginBottom: 6,
    textAlign: "justify",
  },
  contents: {
    textAlign: "justify",
  },
  imageWrapper: {
    marginLeft: 12,
    overflow: "hidden",
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 8,
  },
});
