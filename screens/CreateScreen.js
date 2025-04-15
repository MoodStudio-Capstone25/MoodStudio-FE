import { Button, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Layout from "../layouts/Layout";
import Ionic from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";


const CreateScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { category: "cotent", id: "book", label: "책", width: 50 },
    { category: "cotent", id: "movie", label: "영화/드라마", width: 105 },
    { category: "cotent", id: "webtoon", label: "웹툰/웹소설/만화", width: 139 },
    { category: "cotent", id: "music", label: "음악", width: 60 },
    { category: "cotent", id: "audio", label: "팟캐스트/오디오", width: 131 },
    { category: "cotent", id: "game", label: "게임", width: 60 },
    { category: "cotent", id: "documentary", label: "강의/다큐멘터리", width: 131 },
    { category: "cotent", id: "etc", label: "기타 콘텐츠", width: 102 },

    { category: "culture", id: "art", label: "전시/아트 페어", width: 121 },
    { category: "culture", id: "musical", label: "연극/뮤지컬", width: 103 },
    { category: "culture", id: "concert", label: "콘서트/음악 페스티벌", width: 163 },
    { category: "culture", id: "sport", label: "스포츠 경기", width: 102 },
    { category: "culture", id: "festival", label: "축제", width: 56 },
    { category: "culture", id: "dance", label: "무용/발레", width: 89 },
    { category: "culture", id: "classic", label: "클래식/국악 공연", width: 135 },
    { category: "culture", id: "cultures", label: "체험형 문화활동", width: 130 },
    { category: "culture", id: "etc culture", label: "기타 문화", width: 88 },

    { category: "basic", id: "etc category", label: "기타 카테고리", width: 116 },
  ];

  const getButtonStyle = (isSelected) => ({
    backgroundColor: isSelected ? "#E7C9FF" : "#F0F0F0",
    height: 38,
    paddingVertical: 8,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#000000",
    alignItems: "center",
  });

  const renderCategoryRow = (rowItems) => (
    <View style={{ flexDirection: 'row', marginBottom: 12 }}>
      {rowItems.map((item) => {
        const isSelected = selectedCategory === item.id;
        return (
          <View key={item.id} style={{ paddingRight: 12, width: item.width }}>
            <TouchableOpacity
              onPress={
                () => {setSelectedCategory(item.id)
                console.log("선택된 카테고리:", item.category);
              }}
              style={getButtonStyle(isSelected)}> 
              <Text style={{fontWeight:'bold'}}>{item.label}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );

  return (
    <Layout>
      <View>
        <View style={{paddingLeft: 18, paddingTop: 28, flexDirection: "row"}} >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionic name="arrow-back"
              style={{ fontSize:32, color: '#E7C9FF'}} />
          </TouchableOpacity>
          <Text style={{paddingLeft: 90, fontSize: 20, fontWeight: "bold"}}>
            카테고리 설정
          </Text>
        </View>
        
        <View style={{paddingTop: 46}}>
          <View style={{width:136, height: 19, top: 46, left: 16, backgroundColor: '#FFE5E2', position: 'absolute'}}></View>
          <Text style={{fontSize: 18, fontWeight: "bold", position: 'absolute', top: 36, left: 22}}>콘텐츠 카테고리</Text>
        </View>

        {/* 카테고리 버튼들 */}
        <View style={{ paddingLeft: 14, paddingTop: 26 }}>
          {renderCategoryRow(categories.slice(0, 3))}
          {renderCategoryRow(categories.slice(3, 6))}
          {renderCategoryRow(categories.slice(6, 8))}
        </View>

        <View>
          <View style={{width:121, height: 19, top: 26, left: 16, backgroundColor: '#FFE5E2', position: 'absolute'}}></View>
          <Text style={{fontSize: 18, fontWeight: "bold", position: 'absolute', top: 16, left: 22}}>문화 카테고리</Text>
        </View>

        <View style={{paddingLeft: 14, paddingTop: 56}}>
          {renderCategoryRow(categories.slice(8, 10))}
          {renderCategoryRow(categories.slice(10, 12))}
          {renderCategoryRow(categories.slice(12, 15))}
          {renderCategoryRow(categories.slice(15, 17))}
        </View>

        <View>
          <View style={{width:211, height: 19, top: 26,left: 16, backgroundColor: '#FFE5E2', position: 'absolute'}}></View>
          <Text style={{fontSize: 18, fontWeight: "bold", position: 'absolute', top: 16, left: 22}}>적절한 카테고리가 없나요?</Text>
        </View>

        <View style={{paddingLeft: 14, paddingTop: 56}}>
          {renderCategoryRow(categories.slice(17, 18))}
        </View>

        <Button 
          title="선택 완료"
          color="#C881FF"
        />
      </View>
    </Layout>
  );
};

export default CreateScreen;
