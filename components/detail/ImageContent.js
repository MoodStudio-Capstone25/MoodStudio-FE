import React, { useState } from 'react';
import { View, Image, Dimensions, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import ImageViewing from 'react-native-image-viewing';

const { width } = Dimensions.get('window');

const ImageContent = (props) => {
  const images = props.imgUrls ?? [];

  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View>
      <Swiper
        style={{ height: 210 }}
        loop
        dotColor="#FFFFFF"
        dotStyle={{ borderWidth: 1 }}
        activeDotColor="#000000"
      >
        {images.map((img, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setCurrentIndex(index);
              setVisible(true);
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Image
                source={{ uri: img }}
                style={{
                  width: width - 40,
                  height: 210,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: '#333',
                }}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>
        ))}
      </Swiper>

      <ImageViewing
        images={images.map((img) => ({ uri: img }))}
        imageIndex={currentIndex}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      />
    </View>
  );
};

export default ImageContent;
