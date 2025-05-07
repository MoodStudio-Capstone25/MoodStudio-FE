import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Layout from '../layouts/Layout'
import CustomHeader from '../components/CustomHeader'
import BasicTemplate from '../components/create/templateOption/BasicTemplate'
import { useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

const WirteScreen = () => {
  const route = useRoute();
  const { selectedCategoryId } = route.params;

  const templates = [
    { category: "basic", label: "기본 템플릿" },
    { category: "content", label: "콘텐츠 템플릿" },
    { category: "culture", label: "문화 템플릿" },
  ];

  const getCategoriesID = (()=>{
    if (selectedCategoryId === "book" || selectedCategoryId === "webtoon" ){
      return '저자'
    } 
    else if (selectedCategoryId === "movie" ){
      return '감독'
    } else if (selectedCategoryId === "music") {
      return '가수'
    } else if (selectedCategoryId === "audio" || selectedCategoryId === "documentary"){
      return '진행자'
    } else {
      return '작성자';
    }
  })

  const styles = StyleSheet.create({
      finsihButton: {
        position: 'absolute',
        top: 12,
        right: 16,
        padding: 6,
        backgroundColor: 'transparent',
        zIndex: 10,
      },
      downButton : {
        position: 'absolute',
        fontSize: 27,
        top: 13,
        right: 115, 
        padding: 6, 
        zIndex: 10,
      }
    })


  const categoriesID = getCategoriesID();

  return (
    <Layout>
      <View>
          <CustomHeader title= "기본 템플릿"/>
          <Ionicons name="chevron-down-outline" style={styles.downButton}/>
          <TouchableOpacity style={styles.finsihButton}>
            <Text>작성완료</Text>
          </TouchableOpacity>
      </View>

      <BasicTemplate 
        changeoption = {categoriesID}
      />
    </Layout>
  )
}

export default WirteScreen