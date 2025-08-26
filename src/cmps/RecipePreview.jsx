import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../contexts/ThemeContext';

export const RecipePreview = ({ recipe }) => {
    const navigation = useNavigation();
    const { mode, themeColors } = React.useContext(ThemeContext);

    const totalTime = `${recipe.prepTime} + ${recipe.cookTime}`;

    return (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: themeColors[mode].card }]}
            onPress={() => navigation.navigate('Recipe', { recipeId: recipe.id })}
            activeOpacity={0.9}
        >
            <Image
                source={typeof recipe.image === 'string' ?
                    { uri: recipe.image } :
                    require('../assets/images/recipe_image_1.jpg')}
                style={styles.image}
                resizeMode="cover"
            />

            <View style={styles.content}>
                <Text style={[styles.title, { color: themeColors[mode].text }]}>
                    {recipe.title}
                </Text>

                <View style={styles.categoryRow}>
                    {recipe.tags && recipe.tags.length > 0 && (
                        <Text style={[styles.category, { color: themeColors[mode].accent }]}>
                            {recipe.tags[0]}
                        </Text>
                    )}
                    <Text style={[styles.date, { color: themeColors[mode].text + '99' }]}>
                        {totalTime} total
                    </Text>
                </View>

                <View style={styles.statsRow}>
                    <View style={styles.stat}>
                        <Text style={[styles.icon, { color: themeColors[mode].accent }]}>⏱️</Text>
                        <Text style={[styles.statText, { color: themeColors[mode].text }]}>
                            {recipe.prepTime}
                        </Text>
                    </View>

                    <View style={styles.stat}>
                        <Text style={[styles.icon, { color: themeColors[mode].accent }]}>🍽️</Text>
                        <Text style={[styles.statText, { color: themeColors[mode].text }]}>
                            {recipe.servings} servings
                        </Text>
                    </View>

                    <View style={styles.stat}>
                        <Text style={[styles.icon, { color: themeColors[mode].accent }]}>💬</Text>
                        <Text style={[styles.statText, { color: themeColors[mode].text }]}>
                            {recipe.comments ? recipe.comments.length : 0}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 20,
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 200,
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    categoryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    category: {
        fontSize: 14,
        fontWeight: '500',
    },
    date: {
        fontSize: 14,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 4,
    },
    stat: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    icon: {
        fontSize: 14,
        marginRight: 4,
    },
    statText: {
        fontSize: 13,
        marginLeft: 4,
    },
});

export default RecipePreview;