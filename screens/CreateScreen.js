import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useState } from "react";
import Layout from "../layouts/Layout";
import CategoryCard from "../components/create/CategoryCard";
import CustomHeader from "../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import { Fonts } from "../styles/Fonts";

const CreateScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { height: SCREEN_HEIGHT } = useWindowDimensions();

  const categories = [
    { id: "book", label: "책" },
    { id: "movie", label: "영화/드라마" },
    { id: "webtoon", label: "웹툰/웹소설/만화" },
    { id: "music", label: "음악" },
    { id: "audio", label: "팟캐스트/오디오" },
    { id: "game", label: "게임" },
    { id: "documentary", label: "강의/다큐멘터리" },
    { id: "etc content", label: "기타 콘텐츠" },

    { id: "art", label: "전시/아트 페어" },
    { id: "musical", label: "연극/뮤지컬" },
    { id: "concert", label: "콘서트/음악 페스티벌" },
    { id: "sport", label: "스포츠 경기" },
    { id: "festival", label: "축제" },
    { id: "dance", label: "무용/발레" },
    { id: "classic", label: "클래식/국악 공연" },
    { id: "cultures", label: "체험형 문화활동" },
    { id: "etc culture", label: "기타 문화" },

    { id: "etc", label: "기타 카테고리" },
  ];

  const contentRows = [categories.slice(0, 3), categories.slice(3, 6), categories.slice(6, 8)];

  const cultureRows = [
    categories.slice(8, 10),
    categories.slice(10, 12),
    categories.slice(12, 15),
    categories.slice(15, 17),
  ];

  const otherRows = [categories.slice(17, 18)];

  return (
    <Layout>
      <CustomHeader title="카테고리 설정" />

      <ScrollView>
        <CategoryCard
          CategoryTitle="콘텐츠 카테고리"
          categories={contentRows}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <CategoryCard
          CategoryTitle="문화 카테고리"
          categories={cultureRows}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <CategoryCard
          CategoryTitle="적절한 카테고리가 없나요?"
          categories={otherRows}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <View style={{ paddingTop: 18 }}>
          <TouchableOpacity
            style={[styles.button, {
              backgroundColor: selectedCategory ? "#C881FF" : "#D9D9D9",
              borderColor: selectedCategory ? "black" : "gray",
              marginBottom: SCREEN_HEIGHT * 0.04,
            }]}
            onPress={() => {
              if (selectedCategory) {
                navigation.navigate("CreateStack", {
                  screen: "Write",
                  params: { selectedCategoryId: selectedCategory },
                });
              }
            }}
            disabled={!selectedCategory}
          >
            <Text style={[Fonts.subtitle1, styles.buttontitle, {
              color: selectedCategory ? "#FFFFFF" : "gray",
            }]}>선택 완료</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Layout>
  );
};

//styels
const styles = StyleSheet.create({
  button: {
    width: 343,
    height: 52,
    borderRadius: 60,
    borderWidth: 1.5,
    alignSelf: "center",
  },
  buttontitle: {
    alignSelf: "center",
    paddingTop: 14,
  },
});

export default CreateScreen;
