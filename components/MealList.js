import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import MealItem from './MealItem';

const MealList = props => {

    const renderItemList = itemData => {
        return (
            <MealItem
                title={itemData.item.title}
                onSelectMeal={() => props.navigation.navigate('MealDetail', { mealId: itemData.item.id })}
                duration={itemData.item.duration}
                complexity={itemData.item.complexity}
                affordability={itemData.item.affordability}
                imageUrl={itemData.item.imageUrl}
            />
        );
    }
    return (
        <View style={styles.screen}>
            <FlatList style={{ width: '100%' }} data={props.listData} renderItem={renderItemList} />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default MealList;