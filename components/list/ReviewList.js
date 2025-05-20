import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ReviewCard = () => {
  return (
    <View>
      <Text>ReviewCard</Text>
    </View>
  );
};

const ReviewList = () => {
  return (
    <View style={styles.listContainer}>
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
    </View>
  );
};

export default ReviewList;

const styles = StyleSheet.create({
  listContainer: {
    padding: 24,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
