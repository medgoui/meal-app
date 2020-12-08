import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, Switch } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';

const SwitchLabel = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.textSwitchStyle}>{props.label}</Text>
            <Switch
                trackColor={{ true: Colors.primaryColor }}
                thumbColor={Colors.primaryColor}
                onValueChange={props.onChange}
                value={props.state}
            />
        </View>
    );
}


const FiltersScreen = props => {
    const [isGluten, setIsGluten] = useState(false);
    const [isLactose, setIsLactose] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegeterian, setIsVegeterian] = useState(false);

    const { navigation } = props;

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGluten,
            lactoseFree: isLactose,
            vegan: isVegan,
            vegeterian: isVegeterian
        };
        console.log(appliedFilters);
    }, [isGluten, isLactose, isVegan, isVegeterian]);

    useEffect(() => {
        props.navigation.setParams({save: saveFilters});
    }, [saveFilters]);


    return (
        <View style={styles.screen}>
            <Text style={styles.textStyle}>Availables Filters / Restrictions</Text>
            <SwitchLabel
                onChange={newValue => setIsGluten(newValue)}
                label="Gluten-Free"
                state={isGluten}
            />
            <SwitchLabel
                onChange={newValue => setIsLactose(newValue)}
                label="Lactose-Free"
                state={isLactose}
            />
            <SwitchLabel
                onChange={newValue => setIsVegan(newValue)}
                label="Vegan"
                state={isVegan}
            />
            <SwitchLabel
                onChange={newValue => setIsVegeterian(newValue)}
                label="Vegeterian"
                state={isVegeterian}
            />
        </View>
    );
}

FiltersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Filter Meal!',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Menu" iconName="ios-menu" onPress={() => navData.navigation.toggleDrawer()} />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title="Save" 
                    iconName="ios-save" 
                    onPress={navData.navigation.getParam('save')}
                    />
            </HeaderButtons>
        ),
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.accentColor
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 22,
        fontFamily: 'open-sans-bold',
        margin: 20,
        textAlign: 'center'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 15
    },
    textSwitchStyle: {
        fontSize: 16,
        fontFamily: 'open-sans'
    }
});

export default FiltersScreen;