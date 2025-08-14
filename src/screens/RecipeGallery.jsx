import { View, Button, Text } from 'react-native'
import { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import RecipeSearch from '../cmps/RecipeSearch';
import RecipeList from '../cmps/RecipeList.jsx';
import { ThemeContext } from '../contexts/ThemeContext';
import demoData from '../data.json'
const RecipeGallery = () => {
    const navigation = useNavigation();
    const { mode, themeColors } = useContext(ThemeContext);
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState({ tags: [], text: '', sortBy: 'none' });
    useEffect(() => {
        setRecipes(demoData)
    }, [])
    console.log('rendering gallery');
    // useEffect(() => {
    //     // Filter and format recipes based on searchQuery
    //     const filtered = recipes.filter(recipe => {
    //         // Apply filtering logic here
    //         // Check text filter (ignore if empty)
    //         if (searchQuery.text && !recipe.title.toLowerCase().includes(searchQuery.text.toLowerCase())) {
    //             return false;
    //         }

    //         // Check tags filter (ignore if empty array)
    //         if (searchQuery.tags.length > 0 && !searchQuery.tags.every(tag => recipe.tags.includes(tag))) {
    //             return false;
    //         }

    //         return true;
    //     });
    //     if (searchQuery.sortBy !== 'none') {
    //         filtered.sort((a, b) => {
    //             switch (searchQuery.sortBy) {
    //                 case 'servings-asc':
    //                     return a.servings - b.servings;
    //                 case 'servings-desc':
    //                     return b.servings - a.servings;
    //                 case 'time-asc':
    //                     return a.totalTime - b.totalTime;
    //                 case 'time-desc':
    //                     return b.totalTime - a.totalTime;
    //                 default:
    //                     return 0;
    //             }
    //         });
    //     }
    //     setRecipes(filtered);
    // }, [recipes, searchQuery, setRecipes]);
    return (
        <View style={[{
            backgroundColor: themeColors[mode].background
        }]}>
            <RecipeSearch />

            <Button
                title="Choose a random recipe"
                onPress={() =>
                    navigation.navigate('Recipe')
                }
            />
            <RecipeList recipeList={recipes} />
        </View>
    )
}


export default RecipeGallery