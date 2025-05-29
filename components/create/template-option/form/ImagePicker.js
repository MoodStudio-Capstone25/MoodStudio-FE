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
        { text: '앨범', onPress: pickImage },
      ],
      { cancelable: true }
    )
  }

  const removeImage = (index) => {
    setUris(prev => prev.filter((_, i) => i !== index));
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Ionicons name="add-outline" style={styles.icon} />
      </TouchableOpacity>

      <ScrollView
        horizontal
        contentContainerStyle={styles.previewContainer}
        showsHorizontalScrollIndicator={false}
      >
        {uris.map((uri, idx) => (
          <View key={idx} style={styles.imageWrapper}>
            <Image source={{ uri }} style={styles.image} />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeImage(idx)}
            >
              <Ionicons name="close-circle" size={20} color="#333" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

//styles
const styles = StyleSheet.create({
  button: {
    width: 96,
    height: 96,
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 20,
    marginLeft: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 32,
    color: '#333333',
  },
  previewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'relative',
    marginLeft: 10,
  },
  image: {
    width: 96,
    height: 96,
    borderRadius: 20,
  },
  removeButton: {
    position: 'absolute',
    right: -1,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
})

export default ImagePicker
