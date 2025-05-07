import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CategoryButton from './CategoryButton';

const CategoryCard = ({ CategoryTitle, categories, selectedCategory, setSelectedCategory }) => {
    const styles = StyleSheet.create({
        categoryTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
            position: 'absolute',
            top: 26,
            left: 22
        }
        ,
        categoryHightlight: {
            width: CategoryTitle.length * 13 + 30,
            height: 19,
            top: 36,
            left: 16,
            backgroundColor: '#FFE5E2',
            position: 'absolute'
        },
    })


    const renderCategoryRow = (rowItems) => (
        <View style={{ flexDirection: 'row', marginBottom: 12 }}>
            {rowItems.map((item) => {
                const isSelected = selectedCategory === item.id;
                return (
                    <CategoryButton
                        item={item}
                        isSelected={isSelected}
                        onPress={() => setSelectedCategory(item.id)}
                    />
                );
            })}
        </View>
    );

    return (
        <View style={{ marginTop: -10 }}>
            <View style={{ paddingTop: 36 }}>
                <View style={styles.categoryHightlight} />
                <Text style={styles.categoryTitleStyle}>{CategoryTitle}</Text>
            </View>

            <View style={{ paddingLeft: 7, paddingTop: 30 }}>
                {categories.map((rowItems, index) => (
                    <React.Fragment key={index}>{renderCategoryRow(rowItems)}</React.Fragment>
                )
                )}
            </View>
        </View>
    )
}

export default CategoryCard