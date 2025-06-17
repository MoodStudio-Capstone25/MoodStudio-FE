import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

const StarRating = ({ maxStars = 5, size = 25, value = 0, onChange }) => {

  const handlePress = (index) => {
    const newRating = index + 1
    const updatedRating = value === newRating ? 0 : newRating
    if (onChange) onChange(updatedRating)
  }

  return (
    <View style={styles.container}>
      {Array.from({ length: maxStars }).map((_, i) => (
        <TouchableOpacity key={i} onPress={() => handlePress(i)}>
          <FontAwesome
            name={i < value ? 'star' : 'star-o'}
            size={size}
            color={i < value ? '#FFD700' : '#ccc'}
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
