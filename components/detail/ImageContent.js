import React, { useMemo, useState } from "react";
import { View, Image, Dimensions, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import ImageViewing from "react-native-image-viewing";

const { width } = Dimensions.get("window");

const normalizeUrl = (item) => {
  if (!item) return null;

  if (typeof item === "string") {
    const s = item.trim();
    if (!s || s === "null" || s === "undefined") return null;
    return s;
  }

  if (typeof item === "object") {
    const s = String(item.image_url || item.url || item.uri || "").trim();
    if (!s || s === "null" || s === "undefined") return null;
    return s;
  }

  return null;
};

const ImageContent = ({ imgUrls = [] }) => {

  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 데이터 정규화는 실제로 normalizeUrl 사용
  const images = useMemo(() => {
    return (imgUrls ?? [])
      .map(normalizeUrl)
      .filter((v) => typeof v === "string" && v.length > 0);
  }, [imgUrls]);

  // 이미지 없으면 렌더링 안 함
  if (images.length === 0) return null;

  // 1장일 때 Swiper 대신 단일 이미지로도 안정적으로 표시
  const renderImage = (img, index) => (
    <TouchableOpacity
      key={index}
      activeOpacity={0.9}
      onPress={() => {
        setCurrentIndex(index);
        setVisible(true);
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Image
          source={{ uri: img }}
          style={{
            width: width - 40,
            height: 210,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "#333",
          }}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      {images.length === 1 ? (
        renderImage(images[0], 0)
      ) : (
        <Swiper
          style={{ height: 210 }}
          loop
          dotColor="#FFFFFF"
          dotStyle={{ borderWidth: 1 }}
          activeDotColor="#000000"
        >
          {images.map(renderImage)}
        </Swiper>
      )}

      <ImageViewing
        images={images.map((uri) => ({ uri }))}
        imageIndex={currentIndex}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      />
    </View>
  );
};

export default ImageContent;
