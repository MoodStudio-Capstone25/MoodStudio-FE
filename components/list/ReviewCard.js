import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Fonts } from "../../styles/Fonts";

const ReviewCard = ({ id, content_title, scenes, story, thoughts, image_urls = [] }) => {
  const navigation = useNavigation();
  const first = Array.isArray(image_urls) ? image_urls[0] : null;

  const mergedContents = [scenes, story, thoughts]
    .filter((v) => typeof v === "string" && v.trim() !== "")
    .join(" ");

  const imageUrl =
    typeof first === "string"
      ? first.trim()
      : typeof first?.image_url === "string"
      ? first.image_url.trim()
      : null;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("DetailStack", {
          screen: "Detail",
          params: { id },
        })
      }
    >
      <View style={styles.textWrapper}>
        {content_title ? (
          <Text style={[Fonts.subtitle2, styles.title]} numberOfLines={1}>
            {content_title}
          </Text>
        ) : null}

        {mergedContents ? (
          <Text style={[styles.contents, Fonts.body3]} numberOfLines={content_title ? 2 : 3}>
            {mergedContents}
          </Text>
        ) : !content_title ? (
          <Text style={[styles.contents, Fonts.body3]} numberOfLines={3}>
            작성하신 내용이 없습니다.
          </Text>
        ) : null}
      </View>

      {imageUrl && (
        <View style={[styles.imageWrapper, styles.image]}>
          <Image style={styles.image} source={{ uri: imageUrl }} />
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
