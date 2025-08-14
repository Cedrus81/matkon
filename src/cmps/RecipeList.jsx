import { View, Text, FlatList } from 'react-native'
import React from 'react'

const RecipeList = ({ recipeList }) => {
    return (
        <FlatList
            data={recipeList}
            renderItem={({ item: recipe }) => (
                <View>
                    <Text style={{}}>{recipe.title}</Text>
                </View>
            )}
            keyExtractor={recipe => recipe.id}
        />
    )
}

export default RecipeList