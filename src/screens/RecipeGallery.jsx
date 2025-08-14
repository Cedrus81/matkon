import { View, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import RecipeSearch from '../cmps/RecipeSearch';
const RecipeGallery = () => {
    const navigation = useNavigation();

    return (
        <View>
            <RecipeSearch />
            <Button
                title="Go to Recipe"
                onPress={() =>
                    navigation.navigate('Recipe')
                }
            />
        </View>
    )
}

export default RecipeGallery