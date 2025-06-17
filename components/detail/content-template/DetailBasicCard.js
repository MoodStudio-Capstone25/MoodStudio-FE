import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { Fonts } from '../../../styles/Fonts';
import ContentCard from '../ContentCard';
import ImageContent from '../ImageContent';

const DetailBasicCard = () => {
 return (
    <ScrollView style={styles.container}>
        <ImageContent />

      {/* 태그 */}
      <View style={styles.tagContainer}>
        {["책"].map((tag, i) => (
          <View key={i} style={[styles.tag, i === 0 && styles.tagPurple, i === 1 && styles.tagOrange]}>
            <Text style={Fonts.body3}>{tag}</Text>
          </View>
        ))}
      </View>

      {/* 제목 및 날짜 */}
      <Text style={[styles.title, Fonts.h2]}>올해 최고의 소설</Text>

      {/* 내용 */}
      <ContentCard contents={"그 나날을, 수십 년을, 평생을 단 한 번도 세상에 맞설 용기를 내보지 않고도 거울 앞에서 자기 모습을 마주할 수 있나?"}/>

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
    marginTop: 4,
  },
  tagPurple: {
    backgroundColor: "#E7C9FF",
  },
  tagOrange: {
    backgroundColor: "#FFD0CB",
  },
  
  title: {marginBottom: 20 },
  subtitle: { marginBottom: 10 },
  date: { marginBottom: 10 },
  stars: { fontSize: 16, marginBottom: 20 },

  contentText: {
    color: '#FFFFFF'
}
  
});

export default DetailBasicCard