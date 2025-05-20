import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Fonts } from "../../styles/Fonts";

const ReviewCard = ({ reviewTitle, reviewContents, reviewImage = null }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardTextWrapper}>
        {reviewTitle && (
          <Text style={[styles.cardTitle, Fonts.subtitle2]} numberOfLines={1}>
            {reviewTitle}
          </Text>
        )}
        {reviewContents && (
          <Text
            style={[styles.cardContents, Fonts.body3]}
            numberOfLines={reviewTitle ? 2 : 3}
          >
            {reviewContents}
          </Text>
        )}
      </View>

      {reviewImage && (
        <View style={[styles.cardImageWrapper, styles.cardImage]}>
          <Image
            style={styles.cardImage}
            source={require("../../assets/images/login/main-page.png")}
          />
        </View>
      )}
    </View>
  );
};

const ReviewList = () => {
  return (
    <View style={styles.listContainer}>
      {/* 반복함수로 수정 예정, 이미지 코드 수정 예정 */}
      <ReviewCard
        reviewTitle="제목입니다."
        reviewContents="내용입니다내용입니다내용입니다내용입니다. 내용입니다내용입니다.내용입니다내용입니다."
        reviewImage={true}
      />
      <ReviewCard
        reviewTitle="현식을 비추는 거울"
        reviewContents="우리의 삶을 사실적으로 담아내어 공감을 자아내고 깊은 생각을 하게 만든다. 우리의 삶을 사실적으로 담아내 어 공 감을 자아내고 깊은 생각을 하게 만든다."
        reviewImage={null}
      />
      <ReviewCard
        reviewTitle=""
        reviewContents="예측할 수 없는 전개와 충격적인 결말이 긴장감을 극대화했다. 예측할 수 없는 전개와 충격적인 결말이 긴장감을 극대화했다. 예측할 수 없는 전개와 충격적인 결말이 긴장감을 극대화했다."
        reviewImage={true}
      />
      <ReviewCard
        reviewContents="내용입니다내용입니다내용입니다내용입니다. 내용입니다내용입니다.내용입니다내용입니다."
        reviewImage={true}
      />
    </View>
  );
};

export default ReviewList;

const styles = StyleSheet.create({
  listContainer: {
    marginHorizontal: 24,
  },
  cardContainer: {
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
  cardTextWrapper: {
    display: "flex",
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
  },
  cardTitle: {
    marginBottom: 6,
    textAlign: "justify",
  },
  cardContents: {
    textAlign: "justify",
  },
  cardImageWrapper: {
    marginLeft: 12,
    overflow: "hidden",
  },
  cardImage: {
    width: 56,
    height: 56,
    borderRadius: 8,
  },
});
