import { FlatList, StyleSheet } from 'react-native'
import React from 'react'
import RecipePreview from './RecipePreview'
const RecipeList = ({ recipeList }) => {
    return (
        <FlatList
            data={recipeList}
            renderItem={({ item: recipe }) => (
                <RecipePreview recipe={recipe} />
            )}
            keyExtractor={recipe => recipe.id}
            style={styles.container}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
        paddingHorizontal: 32,
    },
});

export default RecipeList