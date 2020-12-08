import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MEALS } from '../data/dummy-data';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import MealItem from '../components/MealItem';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/actions/meal';


const MealDetailScreen = props => {
    const mealId = props.navigation.getParam('mealId');
    const selectedMeal = MEALS.find(meal => meal.id == mealId);
    const dispatch = useDispatch();
    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId));
    }, [dispatch, mealId])

    useEffect(() => {
        props.navigation.setParams({toggleFav: toggleFavoriteHandler});
    }, [toggleFavoriteHandler])
    return (
        <ScrollView>
            <View>
                <MealItem
                    title={selectedMeal.title}
                    duration={selectedMeal.duration}
                    complexity={selectedMeal.complexity}
                    affordability={selectedMeal.affordability}
                    imageUrl={selectedMeal.imageUrl}
                />
                <Text style={styles.textStyle}>Ingredients</Text>
                {selectedMeal.ingredients.map(ingredient => (
                    <View style={styles.mealStyle} key={ingredient}>
                        <Text>{ingredient}</Text>
                    </View>

                ))}
                <Text style={styles.textStyle}>Steps</Text>
                {
                    selectedMeal.steps.map(step => (
                        <View style={styles.mealStyle} key={step}>
                            <Text>{step}</Text>
                        </View>
                    ))
                }
            </View>
        </ScrollView>
    );
}


MealDetailScreen.navigationOptions = navigationData => {
    const mealId = navigationData.navigation.getParam('mealId');
    const selectedMeal = MEALS.find(meal => meal.id === mealId);
    const toggleFavorite = navigationData.navigation.getParam('toggleFav');
    return {
        headerTitle: selectedMeal.title,
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Favorite" iconName='ios-star' onPress={toggleFavorite} />
            </HeaderButtons>
        )
    }
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        textAlign: 'center',
        marginVertical: 10,
        fontFamily: 'open-sans-bold',
        fontSize: 22
    },
    mealStyle: {
        borderWidth: 1,
        padding: 20,
        marginVertical: 5,
        width: '80%',
        margin: '10%'

    }
});

export default MealDetailScreen;