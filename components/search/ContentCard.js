import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Fonts } from "../../styles/Fonts";

const ContentCard = ({ contentImage = null, contentTitle, creator, releaseYear }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.container}>
      {typeof contentImage === "string" && contentImage.trim() !== "" && (
        <View style={[styles.imageWrapper, styles.image]}>
          <Image style={styles.image} source={{ uri: contentImage }} />
        </View>
      )}

      <View style={styles.textWrapper}>
        {contentTitle && <Text style={[Fonts.subtitle2, styles.title]}>{contentTitle}</Text>}
        <View style={styles.infoTextWrapper}>
          {creator && <Text style={[Fonts.body3, styles.creator]}>{creator}</Text>}
          {releaseYear && <Text style={[Fonts.overline2, styles.releaseYear]}>{releaseYear}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ContentCard;

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

  imageWrapper: {
    marginRight: 12,
    overflow: "hidden",
  },
  image: {
    width: 49,
    height: 68,
    borderRadius: 4,
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
  infoTextWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  releaseYear: {
    marginLeft: 6,
    color: "#878787",
  },
});
