import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const SaveStarRating = ({ value = 0, size = 20 }) => {

  //0일 경우에는 렌더링X
  if (value === 0 || value === undefined) {
    return null;
  }

  const numericValue = Number(value);

  const fullStars = Math.floor(numericValue);
  const halfStar = numericValue % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <View style={styles.container}>
      {/* 채워진 별 */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <FontAwesome key={`full-${i}`} name="star" size={size} color="#FFD700" style={styles.star} />
      ))}

      {/* 반 별 (옵션) */}
      {/* {halfStar === 1 && (
        <FontAwesome name="star-half-full" size={size} color="#FFD700" style={styles.star} />
      )} */}

      {/* 빈 별 */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <FontAwesome key={`empty-${i}`} name="star-o" size={size} color="#ccc" style={styles.star} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  star: {
    marginRight: 4,
  },
});

export default SaveStarRating;
