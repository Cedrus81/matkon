import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../contexts/ThemeContext';

const AddRecipe = ({ onAddRecipe }) => {
    const navigation = useNavigation();
    const { mode, themeColors } = useContext(ThemeContext);

    // Recipe state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [prepTime, setPrepTime] = useState('');
    const [cookTime, setCookTime] = useState('');
    const [servings, setServings] = useState('');
    const [image, setImage] = useState('');

    // Ingredients state
    const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);

    // Steps state
    const [steps, setSteps] = useState(['']);

    // Tags state
    const [selectedTags, setSelectedTags] = useState([]);

    const availableTags = [
        'Italian', 'Pasta', 'Main Course', 'Vegetarian', 'Gluten-Free',
        'Dessert', 'Cookies', 'Chicken', 'Grilled', 'Breakfast', 'Lunch',
        'Dinner', 'Appetizer', 'Healthy', 'Quick & Easy'
    ];

    // Add/Remove ingredient functions
    const addIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: '' }]);
    };

    const removeIngredient = (index) => {
        if (ingredients.length > 1) {
            const newIngredients = ingredients.filter((_, i) => i !== index);
            setIngredients(newIngredients);
        }
    };

    const updateIngredient = (index, field, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index][field] = value;
        setIngredients(newIngredients);
    };

    // Add/Remove step functions
    const addStep = () => {
        setSteps([...steps, '']);
    };

    const removeStep = (index) => {
        if (steps.length > 1) {
            const newSteps = steps.filter((_, i) => i !== index);
            setSteps(newSteps);
        }
    };

    const updateStep = (index, value) => {
        const newSteps = [...steps];
        newSteps[index] = value;
        setSteps(newSteps);
    };

    // Tag management
    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    // Form validation and submission
    const validateForm = () => {
        if (!title.trim()) return 'Title is required';
        if (!description.trim()) return 'Description is required';
        if (!prepTime.trim()) return 'Prep time is required';
        if (!cookTime.trim()) return 'Cook time is required';
        if (!servings.trim()) return 'Servings is required';

        const validIngredients = ingredients.filter(ing => ing.name.trim() && ing.quantity.trim());
        if (validIngredients.length === 0) return 'At least one ingredient is required';

        const validSteps = steps.filter(step => step.trim());
        if (validSteps.length === 0) return 'At least one step is required';

        return null;
    };

    const handleSubmit = () => {
        const error = validateForm();
        if (error) {
            Alert.alert('Validation Error', error);
            return;
        }

        const newRecipe = {
            id: Date.now(), // Simple ID generation
            title: title.trim(),
            description: description.trim(),
            ingredients: ingredients.filter(ing => ing.name.trim() && ing.quantity.trim()),
            steps: steps.filter(step => step.trim()),
            prepTime: prepTime.trim(),
            cookTime: cookTime.trim(),
            servings: parseInt(servings, 10) || 1,
            tags: selectedTags,
            image: image.trim() || 'https://via.placeholder.com/400x200',
            comments: []
        };

        // Call the parent function to add recipe
        if (onAddRecipe) {
            onAddRecipe(newRecipe);
        }

        Alert.alert('Success', 'Recipe added successfully!', [
            { text: 'OK', onPress: () => navigation.goBack() }
        ]);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: themeColors[mode].background }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={[styles.header, { color: themeColors[mode].text }]}>
                    Add New Recipe
                </Text>

                {/* Basic Information */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: themeColors[mode].primary }]}>
                        Basic Information
                    </Text>

                    <Text style={[styles.label, { color: themeColors[mode].text }]}>Title *</Text>
                    <TextInput
                        style={[styles.input, {
                            borderColor: themeColors[mode].border,
                            backgroundColor: themeColors[mode].card,
                            color: themeColors[mode].text
                        }]}
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Enter recipe title..."
                        placeholderTextColor={themeColors[mode].text + '80'}
                    />

                    <Text style={[styles.label, { color: themeColors[mode].text }]}>Description *</Text>
                    <TextInput
                        style={[styles.textArea, {
                            borderColor: themeColors[mode].border,
                            backgroundColor: themeColors[mode].card,
                            color: themeColors[mode].text
                        }]}
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Describe your recipe..."
                        placeholderTextColor={themeColors[mode].text + '80'}
                        multiline
                        numberOfLines={3}
                    />

                    <Text style={[styles.label, { color: themeColors[mode].text }]}>Image URL</Text>
                    <TextInput
                        style={[styles.input, {
                            borderColor: themeColors[mode].border,
                            backgroundColor: themeColors[mode].card,
                            color: themeColors[mode].text
                        }]}
                        value={image}
                        onChangeText={setImage}
                        placeholder="https://example.com/image.jpg"
                        placeholderTextColor={themeColors[mode].text + '80'}
                    />

                    <View style={styles.row}>
                        <View style={styles.halfWidth}>
                            <Text style={[styles.label, { color: themeColors[mode].text }]}>Prep Time *</Text>
                            <TextInput
                                style={[styles.input, {
                                    borderColor: themeColors[mode].border,
                                    backgroundColor: themeColors[mode].card,
                                    color: themeColors[mode].text
                                }]}
                                value={prepTime}
                                onChangeText={setPrepTime}
                                placeholder="15 min"
                                placeholderTextColor={themeColors[mode].text + '80'}
                            />
                        </View>

                        <View style={styles.halfWidth}>
                            <Text style={[styles.label, { color: themeColors[mode].text }]}>Cook Time *</Text>
                            <TextInput
                                style={[styles.input, {
                                    borderColor: themeColors[mode].border,
                                    backgroundColor: themeColors[mode].card,
                                    color: themeColors[mode].text
                                }]}
                                value={cookTime}
                                onChangeText={setCookTime}
                                placeholder="30 min"
                                placeholderTextColor={themeColors[mode].text + '80'}
                            />
                        </View>
                    </View>

                    <Text style={[styles.label, { color: themeColors[mode].text }]}>Servings *</Text>
                    <TextInput
                        style={[styles.input, {
                            borderColor: themeColors[mode].border,
                            backgroundColor: themeColors[mode].card,
                            color: themeColors[mode].text
                        }]}
                        value={servings}
                        onChangeText={setServings}
                        placeholder="4"
                        placeholderTextColor={themeColors[mode].text + '80'}
                        keyboardType="numeric"
                    />
                </View>

                {/* Ingredients */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: themeColors[mode].primary }]}>
                        Ingredients
                    </Text>

                    {ingredients.map((ingredient, index) => (
                        <View key={index} style={styles.ingredientRow}>
                            <View style={styles.ingredientInputs}>
                                <TextInput
                                    style={[styles.ingredientName, {
                                        borderColor: themeColors[mode].border,
                                        backgroundColor: themeColors[mode].card,
                                        color: themeColors[mode].text
                                    }]}
                                    value={ingredient.name}
                                    onChangeText={(value) => updateIngredient(index, 'name', value)}
                                    placeholder="Ingredient name"
                                    placeholderTextColor={themeColors[mode].text + '80'}
                                />
                                <TextInput
                                    style={[styles.ingredientQuantity, {
                                        borderColor: themeColors[mode].border,
                                        backgroundColor: themeColors[mode].card,
                                        color: themeColors[mode].text
                                    }]}
                                    value={ingredient.quantity}
                                    onChangeText={(value) => updateIngredient(index, 'quantity', value)}
                                    placeholder="Quantity"
                                    placeholderTextColor={themeColors[mode].text + '80'}
                                />
                            </View>
                            {ingredients.length > 1 && (
                                <TouchableOpacity
                                    style={[styles.removeButton, { backgroundColor: themeColors[mode].error || '#FF6B6B' }]}
                                    onPress={() => removeIngredient(index)}
                                >
                                    <Text style={styles.removeButtonText}>−</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}

                    <TouchableOpacity
                        style={[styles.addButton, { backgroundColor: themeColors[mode].primary }]}
                        onPress={addIngredient}
                    >
                        <Text style={[styles.addButtonText, { color: themeColors[mode].background }]}>
                            + Add Ingredient
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Steps */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: themeColors[mode].primary }]}>
                        Instructions
                    </Text>

                    {steps.map((step, index) => (
                        <View key={index} style={styles.stepRow}>
                            <Text style={[styles.stepNumber, { color: themeColors[mode].primary }]}>
                                {index + 1}.
                            </Text>
                            <TextInput
                                style={[styles.stepInput, {
                                    borderColor: themeColors[mode].border,
                                    backgroundColor: themeColors[mode].card,
                                    color: themeColors[mode].text
                                }]}
                                value={step}
                                onChangeText={(value) => updateStep(index, value)}
                                placeholder="Enter step instructions..."
                                placeholderTextColor={themeColors[mode].text + '80'}
                                multiline
                            />
                            {steps.length > 1 && (
                                <TouchableOpacity
                                    style={[styles.removeButton, { backgroundColor: themeColors[mode].error || '#FF6B6B' }]}
                                    onPress={() => removeStep(index)}
                                >
                                    <Text style={styles.removeButtonText}>−</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}

                    <TouchableOpacity
                        style={[styles.addButton, { backgroundColor: themeColors[mode].primary }]}
                        onPress={addStep}
                    >
                        <Text style={[styles.addButtonText, { color: themeColors[mode].background }]}>
                            + Add Step
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Tags */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: themeColors[mode].primary }]}>
                        Tags
                    </Text>

                    <View style={styles.tagsContainer}>
                        {availableTags.map((tag) => (
                            <TouchableOpacity
                                key={tag}
                                style={[
                                    styles.tag,
                                    {
                                        backgroundColor: selectedTags.includes(tag)
                                            ? themeColors[mode].primary
                                            : themeColors[mode].card,
                                        borderColor: themeColors[mode].border,
                                    }
                                ]}
                                onPress={() => toggleTag(tag)}
                            >
                                <Text style={[
                                    styles.tagText,
                                    {
                                        color: selectedTags.includes(tag)
                                            ? themeColors[mode].background
                                            : themeColors[mode].text
                                    }
                                ]}>
                                    {tag}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                    style={[styles.submitButton, { backgroundColor: themeColors[mode].primary }]}
                    onPress={handleSubmit}
                >
                    <Text style={[styles.submitButtonText, { color: themeColors[mode].background }]}>
                        Add Recipe
                    </Text>
                </TouchableOpacity>

                {/* Cancel Button */}
                <TouchableOpacity
                    style={[styles.cancelButton, { borderColor: themeColors[mode].border }]}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={[styles.cancelButtonText, { color: themeColors[mode].text }]}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        marginTop: 12,
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 8,
    },
    textArea: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 8,
        height: 80,
        textAlignVertical: 'top',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfWidth: {
        width: '48%',
    },
    ingredientRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    ingredientInputs: {
        flex: 1,
        flexDirection: 'row',
    },
    ingredientName: {
        flex: 2,
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        fontSize: 14,
        marginRight: 8,
    },
    ingredientQuantity: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        fontSize: 14,
    },
    stepRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    stepNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 12,
        marginRight: 8,
        minWidth: 25,
    },
    stepInput: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        fontSize: 14,
        minHeight: 50,
        textAlignVertical: 'top',
    },
    removeButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    removeButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    addButton: {
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    addButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        margin: 4,
    },
    tagText: {
        fontSize: 14,
        fontWeight: '500',
    },
    submitButton: {
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cancelButton: {
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 1,
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: '500',
    },
});

export default AddRecipe;