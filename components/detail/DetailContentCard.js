import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { Fonts } from '../../styles/Fonts';
import ContentCard from './ContentCard';
import ImageContent from './ImageContent';
import SaveStarRating from './SaveStarRating';
import { detailDummy } from '../../mock/detailDummy';

const DetailContentCard = ({ detail }) => {
  const data = detail;

  return (
    <ScrollView style={styles.container}>
      {!!data?.image_urls && (
        <ImageContent imgUrls={data.image_urls} />
      )}

      {/* category,  */}
      <View style={styles.tagContainer}>
        {data?.category && (
          <View style={[styles.tag, styles.tagPurple]}>
            <Text style={Fonts.body3}>{data.category}</Text>
          </View>
        )}
        {data?.creator?.map((name, i) => (
          <View key={`creator-${i}`} style={[styles.tag, styles.tagOrange]}>
            <Text style={Fonts.body3}>{name}</Text>
          </View>
        ))}
        {data?.cast?.map((name, i) => (
          <View key={`cast-${i}`} style={styles.tag}>
            <Text style={Fonts.body3}>{name}</Text>
          </View>
        ))}
      </View>

      {/* 제목 title */}
      {data?.title && (
        <Text style={[styles.title, Fonts.h2]}>
          {data.title}
        </Text>
      )}
      {/* 제목 content_title */}
      {data?.content_title && (
        <Text style={[styles.subtitle, Fonts.body2]}>{data.content_title}</Text>
      )}
      {/* 날짜 date */}
      {data?.date && (
        <Text style={[styles.date, Fonts.body2]}>{data.date}</Text>
      )}

      {/* 별점 rating */}
      {data?.rating != null && (
        <SaveStarRating value={Number(data.rating)} />
      )}

      {/* 내용 */}
      {data?.story && (
        <ContentCard contents={data.story} />
      )}
      {data?.scenes && (
        <ContentCard contents={data.scenes} />
      )}
      {data?.thoughts && (
        <ContentCard contents={data.thoughts} />
      )}

      {/* 하단 카테고리 */}
      <View style={styles.tagContainer}>
        {data?.location && (
          <View style={[styles.tag, { backgroundColor: '#AA6ED9' }]}>
            <Text style={[Fonts.body3, styles.contentText]}>{data.location}</Text>
          </View>
        )}
        {data?.companions &&
          (
            <View style={[styles.tag, { backgroundColor: '#D97B73' }]}>
              <Text style={[Fonts.body3, styles.contentText]}>{data.companions}</Text>
            </View>
          )}
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