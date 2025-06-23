import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { Fonts } from '../../../styles/Fonts';
import ContentCard from '../ContentCard';
import ImageContent from '../ImageContent';
import SaveStarRating from '../SaveStarRating';

const DetailContentCard = () => {

  return (
    <ScrollView style={styles.container}>
      <ImageContent />

      {/* category,  */}
      <View style={styles.tagContainer}>
        {["책", "클레어 키건", "출연진1", "출연진2", "출연진3", "출연진4", "출연진5"].map((tag, i) => (
          <View key={i} style={[styles.tag, i === 0 && styles.tagPurple, i === 1 && styles.tagOrange]}>
            <Text style={Fonts.body3}>{tag}</Text>
          </View>
        ))}
      </View>

      {/* 제목 title */}
      <Text style={[styles.title, Fonts.h2]}>올해 최고의 소설</Text>
      {/* 제목 content_title */}
      <Text style={[styles.subtitle, Fonts.body2]}>이처럼 사소한 것들</Text>
      {/* 날짜 date */}
      <Text style={[styles.date, Fonts.body2]}>2025.02.12 ~ 2025.02.14</Text>

      {/* 별점 rating */}
      <SaveStarRating value={4} />

      <ContentCard contents={"그 나날을, 수십 년을, 평생을 단 한 번도 세상에 맞설 용기를 내보지 않고도 거울 앞에서 자기 모습을 마주할 수 있나?"} />
      <ContentCard contents={"1980년대 아일랜드, 석탄과 목재를 판매하는 상인 빌 펄롱의 이야기이다. 평범한 삶을 살고 있었지만, 수녀원에서 비밀리에 감금되어 강제 노동을 하는 소녀들을 발견하게 된다. 마을 사람들은 이 사실을 알고도 외면하고 있었지만, 펄롱은 내적 갈등 끝에 소녀를 구하기로 결심한다."} />

      {/* 하단 카테고리 */}
      <View style={styles.tagContainer}>
        <View style={[styles.tag, { backgroundColor: '#AA6ED9' }]}>
          <Text style={[Fonts.body3, styles.contentText]}>이태원 블루스퀘어 신한카드홀</Text>
        </View>
        <View style={[styles.tag, { backgroundColor: '#D97B73' }]}>
          <Text style={[Fonts.body3, styles.contentText]}>엄마랑</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white"
  },

  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  tag: {
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 1,
    marginTop: 2,
  },
  tagPurple: {
    backgroundColor: "#E7C9FF",
  },
  tagOrange: {
    backgroundColor: "#FFD0CB",
  },

  title: { marginBottom: 20 },
  subtitle: { marginBottom: 10 },
  date: { marginBottom: 10 },
  stars: { fontSize: 16, marginBottom: 20 },

  contentText: {
    color: '#FFFFFF'
  }

});

export default DetailContentCard