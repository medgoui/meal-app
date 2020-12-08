import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CategoryGridTile = props => {

    return (
        <TouchableOpacity
            style={styles.gridStyle}
            onPress={props.onSelect}
        >
            <View style={{...styles.container, backgroundColor: props.color}}>
                <Text style={styles.textStyle} numberOfLines={2} >{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    gridStyle: {
        flex: 1,
        margin: 15,
        height: 150
    },
    container: {
        flex: 1,
        shadowColor: 'black',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 15,
        borderRadius: 10,
        elevation: 3

    },
    textStyle: {
        fontSize: 22,
        fontFamily: 'open-sans-bold',
        textAlign: 'right'
    }
});

export default CategoryGridTile;