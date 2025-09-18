import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ExpoImagePicker from 'expo-image-picker';

const MAX_IMAGES = 3;

const ImagePicker = ({ images = [], setImages = () => { } }) => {
  const availableSlots = Math.max(0, MAX_IMAGES - images.length);

  const addUris = (uris) => {
    if (!uris?.length) return;
    // 중복 제거 + 남은 슬롯에 맞춰 자르기
    const unique = uris.filter((u) => !images.includes(u));
    const next = unique.slice(0, availableSlots);
    if (next.length === 0) {
      Alert.alert('제한', `이미지는 최대 ${MAX_IMAGES}장까지 첨부할 수 있어요.`);
      return;
    }
    setImages((prev) => [...prev, ...next]);
  };

  const pickImage = async () => {
    if (availableSlots <= 0) {
      Alert.alert('제한', `이미지는 최대 ${MAX_IMAGES}장까지 첨부할 수 있어요.`);
      return;
    }
    const { status } = await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 거부', '앨범 접근 권한이 필요합니다.');
      return;
    }
    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: false,
      // 여러장 선택
      allowsMultipleSelection: true,
      // 남은 슬롯만큼만 선택 가능 (플랫폼별로 미지원일 수도 있으므로, 아래에서 한 번 더 방어)
      selectionLimit: availableSlots,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const uris = result.assets.map((a) => a.uri).filter(Boolean);
      addUris(uris);
    }
  };

  const takePhoto = async () => {
    if (availableSlots <= 0) {
      Alert.alert('제한', `이미지는 최대 ${MAX_IMAGES}장까지 첨부할 수 있어요.`);
      return;
    }
    const { status } = await ExpoImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 거부', '카메라 사용 권한이 필요합니다.');
      return;
    }
    const result = await ExpoImagePicker.launchCameraAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled && result.assets?.length > 0) {
      addUris([result.assets[0].uri]);
    }
  };

  const handlePress = () => {
    if (availableSlots <= 0) {
      Alert.alert('제한', `이미지는 최대 ${MAX_IMAGES}장까지 첨부할 수 있어요.`);
      return;
    }
    Alert.alert(
      '사진 선택',
      `카메라로 찍거나 앨범에서 선택하세요. (남은 슬롯 ${availableSlots}장)`,
      [
        { text: '취소', style: 'cancel' },
        { text: '카메라', onPress: takePhoto },
        { text: '앨범', onPress: pickImage },
      ],
      { cancelable: true }
    );
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity
        style={[styles.button, availableSlots <= 0 && styles.buttonDisabled]}
        onPress={handlePress}
        disabled={availableSlots <= 0}
      >
        <Ionicons name="add-outline" style={styles.icon} />
        <Text style={styles.counter}>{images.length}/{MAX_IMAGES}</Text>
      </TouchableOpacity>

      <View style={{ color: "white", width: 8 }} />

      <ScrollView
        horizontal
        contentContainerStyle={styles.previewContainer}
        showsHorizontalScrollIndicator={false}
      >
        {images.map((uri, idx) => (
          <View key={`${uri}-${idx}`} style={styles.imageWrapper}>
            <Image source={{ uri }} style={styles.image} />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeImage(idx)}
            >
              <Ionicons name="close-circle" size={20} color="#333" />
            </TouchableOpacity>
          </View>
        ))}
        <View style={{ color: "white", width: 10 }} />
      </ScrollView>
    </View>
  );
};

// styles
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
    position: 'relative',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  icon: {
    fontSize: 32,
    color: '#333333',
  },
  counter: {
    position: 'absolute',
    bottom: 6,
    right: 8,
    fontSize: 12,
    color: '#333',
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
});

export default ImagePicker;
