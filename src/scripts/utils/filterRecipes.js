import { recipes } from "../../data/recipes.js";
import { displayRecipes, recipesSection } from "../components/recipeCard.js";
import { selectedIngredients, selectedAppliances, selectedUstensils } from "../components/tags.js";

export function recipesFilter() {
    const selectedTags = [...selectedIngredients, ...selectedAppliances, ...selectedUstensils];
    // .filter go through all the recipes and ...
    const filteredRecipes = recipes.filter(recipe => {
        const ingredientsNames = recipe.ingredients.map(i => i.ingredient.toLowerCase());
        const applianceName = recipe.appliance.toLowerCase();
        const ustensilsNames = recipe.ustensils.map(u => u.toLowerCase());

        // Check if tags are in the ingredients/appliances/ustensils names
        const hasAllTags = selectedTags.every(tag => 
            ingredientsNames.includes(tag.toLowerCase()) ||
            applianceName.includes(tag.toLowerCase()) ||
            ustensilsNames.includes(tag.toLowerCase())
        );

        return hasAllTags;
    });

    // Reset the recipes section
    recipesSection.innerHTML = "";
    // Display the filtered recipes
    displayRecipes(filteredRecipes);
}