/**
 * Formats the ingredients array from a recipe object
 * into an array of strings for display in the Accordion.
 * Example output: "Spaghetti: 400g"
 * @param {Array} ingredients - Array of ingredient objects
 * @returns {Array} Array of formatted strings
 */
export function formatIngredients(ingredients) {
    if (!Array.isArray(ingredients)) return [];
    return ingredients.map(
        ing => `${ing.name}: ${ing.quantity}`
    )
};