import { View, Text, ScrollView } from 'react-native'
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
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Text style={[styles.header, { color: themeColors[mode].text }]}>
                            {recipe.title} { }
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
                <View style={styles.commentsSection}>
                    <Text style={[styles.commentsHeader, { color: themeColors[mode].primary }]}>
                        Comments
                    </Text>
                    {recipe.comments.length > 0 ? (
                        recipe.comments.map((comment, idx) => (
                            <View key={idx} style={styles.commentItem}>
                                <Text style={[styles.commentAuthor, { color: themeColors[mode].accent }]}>
                                    {comment.author} <Text style={styles.commentDate}>({comment.date})</Text>
                                </Text>
                                <Text style={[styles.commentContent, { color: themeColors[mode].text }]}>
                                    {comment.content}
                                </Text>
                            </View>
                        ))
                    ) : (
                        <Text style={[styles.noComments, { color: themeColors[mode].text }]}>
                            No comments yet.
                        </Text>
                    )}
                </View>
            </ScrollView>
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
    },
    description: {
        fontSize: 16,
        marginBottom: 8,
    },
    info: {
        fontSize: 14,
        marginBottom: 4,
    },
    image: {
        width: 160,
        height: 160,
        borderRadius: 12,
        marginLeft: 20,
    },
    commentsSection: {
        marginTop: 24,
        paddingHorizontal: 20,
        paddingBottom: 24,
        backgroundColor: 'transparent',
    },
    commentsHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    commentItem: {
        marginBottom: 16,
        padding: 12,
        borderRadius: 8,
    },
    commentAuthor: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    commentDate: {
        fontWeight: 'normal',
        fontSize: 14,
    },
    commentContent: {
        fontSize: 15,
        marginTop: 4,
    },
    noComments: {
        fontStyle: 'italic',
    },
});
export default RecipePage