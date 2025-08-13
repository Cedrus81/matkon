import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import data from '../data.json';
import { StyleSheet, Image } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import Accordion from '../cmps/Accordion';
import { formatIngredients } from '../services/utils';

// Update your component's return statement:
const RecipePage = () => {
    const recipe = data[0];
    const { mode, themeColors } = useContext(ThemeContext);
    return (
        <SafeAreaView style={[styles.mainContainer, { backgroundColor: themeColors[mode].background }]}>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={[styles.header, { color: themeColors[mode].text }]}>
                        {recipe.title}
                    </Text>
                    <Text style={[styles.description, { color: themeColors[mode].text }]}>
                        {recipe.description}
                    </Text>
                    <Text style={[styles.info, { color: themeColors[mode].text }]}>
                        Prep time: {recipe.prepTime}
                    </Text>
                    <Text style={[styles.info, { color: themeColors[mode].text }]}>
                        Cook time: {recipe.cookTime}
                    </Text>
                    <Text style={[styles.info, { color: themeColors[mode].text }]}>
                        Servings: {recipe.servings}
                    </Text>
                </View>
                <Image
                    source={{ uri: recipe.image }}
                    style={styles.image}
                    resizeMode='cover'
                />
            </View>
            <Accordion list={formatIngredients(recipe.ingredients)} listTitle="Ingredients" />
            <Accordion list={recipe.steps} listTitle="Instructions" />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 20,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    description: {
        fontSize: 16,
        marginBottom: 8,
        color: '#555',
    },
    info: {
        fontSize: 14,
        marginBottom: 4,
        color: '#777',
    },
    image: {
        width: 160,
        height: 160,
        borderRadius: 12,
        marginLeft: 20,
    },
});
export default RecipePage