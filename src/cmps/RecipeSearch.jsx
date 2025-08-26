import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
} from 'react-native';
// import { Picker } from '@react-native-picker/picker';
import CustomPicker from './CustomPicker';
import { ThemeContext } from '../contexts/ThemeContext';
const availableTags = ["Italian", "Pasta", "Main Course", "Vegetarian", "Gluten-Free", "Dessert",
    "Cookies", "Chicken", "Grilled"];
const RecipeSearch = ({
    onSearch = () => { },
    onFilterByTag = () => { },
    onSort = () => { },

    // backgroundImage
}) => {
    const [searchText, setSearchText] = useState('');
    const [selectedTag, setSelectedTag] = useState('all');
    const [sortBy, setSortBy] = useState('none');
    const { mode, themeColors } = useContext(ThemeContext);

    const handleSearch = () => {
        onSearch(searchText);
    };

    const handleTagFilter = (tag) => {
        setSelectedTag(tag);
        onFilterByTag(tag);
    };

    const handleSort = (sortOption) => {
        setSortBy(sortOption);
        onSort(sortOption);
    };

    const sortOptions = [
        { label: 'No sorting', value: 'none' },
        { label: 'Servings (Low to High)', value: 'servings-asc' },
        { label: 'Servings (High to Low)', value: 'servings-desc' },
        { label: 'Total Time (Short to Long)', value: 'time-asc' },
        { label: 'Total Time (Long to Short)', value: 'time-desc' },
    ];

    //   onSearch / on filter to be implemented in page
    console.log('rendering search');

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/images/recipe_image_1.jpg')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <View style={[styles.formContainer, { backgroundColor: `${themeColors[mode].card}CC` }]}>

                    <View style={styles.inputGroupContainer} >
                        {/* Search Input */}
                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, { color: themeColors[mode].text }]}>
                                Search Recipes
                            </Text>
                            <TextInput
                                style={[
                                    styles.textInput,
                                    {
                                        borderColor: themeColors[mode].border,
                                        backgroundColor: themeColors[mode].background,
                                        color: themeColors[mode].text,
                                    }
                                ]}
                                placeholder="Name or ingredient..."
                                placeholderTextColor={`${themeColors[mode].text}80`}
                                value={searchText}
                                onChangeText={setSearchText}
                                onSubmitEditing={handleSearch}
                            />
                        </View>
                        {/* Search Button */}
                        <TouchableOpacity
                            style={[styles.searchButton, { backgroundColor: themeColors[mode].primary }]}
                            onPress={handleSearch}
                            activeOpacity={0.8}
                        >
                            <Text style={[styles.searchButtonText, { color: themeColors[mode].background }]}>
                                Search
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.inputGroupContainer, { marginTop: 10 }]}>
                        {/* Tag Filter */}

                        <View style={[styles.inputGroup]}>

                            <CustomPicker
                                selectedValue={selectedTag}
                                onValueChange={handleTagFilter}
                                options={[{ label: 'All Tags', value: 'all' }, ...availableTags.map(tag => ({ label: tag, value: tag }))]}
                                label="Filter by Tag"
                                itemStyle={{ color: themeColors[mode].text }}
                            />
                        </View>

                        {/* Sort Options */}
                        <View style={[styles.inputGroup]}>

                            <CustomPicker
                                selectedValue={sortBy}
                                onValueChange={handleSort}
                                options={sortOptions}
                                label="Sort By"
                                itemStyle={{ color: themeColors[mode].text }}
                            />
                        </View>
                    </View>


                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 250,
        width: '100%',
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        maxWidth: 400,
        padding: 20,
        borderRadius: 16,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    inputGroup: {
        marginBottom: 12,
        flex: 1,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 6,
    },
    textInput: {
        height: 40,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
    },

    picker: {
        height: 50,
    },
    searchButton: {
        height: 44,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
        flex: 0.4,
        alignSelf: 'center'
    },
    searchButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputGroupContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
});

export default RecipeSearch;
