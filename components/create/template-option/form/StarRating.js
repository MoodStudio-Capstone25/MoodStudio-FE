import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

const StarRating = ({ maxStars = 5, size = 25, onChange }) => {
  const [rating, setRating] = useState(0)

  const handlePress = (index) => {
    const newRating = index + 1
    const updatedRating = rating === newRating ? 0 : newRating
    setRating(updatedRating)
    if (onChange) onChange(updatedRating)
  }

  return (
    <View style={styles.container}>
      {Array.from({ length: maxStars }).map((_, i) => (
        <TouchableOpacity key={i} onPress={() => handlePress(i)}>
          <FontAwesome
            name={i < rating ? 'star' : 'star-o'}
            size={size}
            color={i < rating ? '#FFD700' : '#ccc'}
            style={styles.star}
          />
        </TouchableOpacity>
      ))}
    </View>
  )
}

//styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 12,
    marginLeft: 10
  },
  star: { marginHorizontal: 4 },
})

export default StarRating
