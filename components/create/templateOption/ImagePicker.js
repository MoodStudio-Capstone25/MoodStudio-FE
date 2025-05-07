// components/create/templateOption/ImagePicker.js
import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as ExpoImagePicker from 'expo-image-picker'

const ImagePicker = () => {
  const [uris, setUris] = useState([])

  const pickImage = async () => {
    const { status } = await ExpoImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('권한 거부', '앨범 접근 권한이 필요합니다.')
      return
    }
    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: false,
    })
    if (!result.canceled && result.assets.length > 0) {
      setUris(prev => [...prev, result.assets[0].uri])
    }
  }

  const takePhoto = async () => {
    const { status } = await ExpoImagePicker.requestCameraPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('권한 거부', '카메라 사용 권한이 필요합니다.')
      return
    }
    const result = await ExpoImagePicker.launchCameraAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      quality: 1,
    })
    if (!result.canceled && result.assets.length > 0) {
      setUris(prev => [...prev, result.assets[0].uri])
    }
  }

  const handlePress = () => {
    Alert.alert(
      '사진 선택',
      '카메라로 찍거나 앨범에서 선택하세요.',
      [
        { text: '취소', style: 'cancel' },
        { text: '카메라', onPress: takePhoto },
        { text: '앨범',  onPress: pickImage },
      ],
      { cancelable: true }
    )
  }

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Ionicons name="add-outline" style={styles.icon} />
      </TouchableOpacity>

      <ScrollView
        horizontal
        contentContainerStyle={styles.previewContainer}
        showsHorizontalScrollIndicator={false}
      >
        {uris.map((uri, idx) => (
          <Image
            key={idx}
            source={{ uri }}
            style={styles.button}
          />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 96,
    height: 96,
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 20,
    marginLeft: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 32,
    color: '#333333',
  },
  previewContainer: {
    //paddingLeft: 5,
  },
  preview: {
    width: 96,
    height: 96,
    borderRadius: 20,
    marginRight: 10,
    resizeMode: 'cover',
  },
})

export default ImagePicker
