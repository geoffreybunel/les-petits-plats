import { recipesSection, displayRecipes } from "../components/recipeCard.js";
import { updateTagsLists } from "./tags.js";
import { selectedIngredients, selectedAppliances, selectedUstensils } from "../components/tags.js";

export function updateUI(filteredRecipes) {
    // Create new sets for items available in recipes displayed
    const availableIngredients = new Set();
    const availableAppliances = new Set();
    const availableUstensils = new Set();

    // Add each available items separetaly in new sets 
    filteredRecipes.forEach(recipe => {
        recipe.ingredients.forEach(i => {
            availableIngredients.add(i.ingredient.charAt(0).toUpperCase() + i.ingredient.slice(1));
        });
        
        availableAppliances.add(recipe.appliance.charAt(0).toUpperCase() + recipe.appliance.slice(1));

        recipe.ustensils.forEach(u => {
            availableUstensils.add(u.charAt(0).toUpperCase() + u.slice(1));
        });
    });

    // Delete already displayed tags from new sets
    selectedIngredients.forEach(tag => availableIngredients.delete(tag));
    selectedAppliances.forEach(tag => availableAppliances.delete(tag));
    selectedUstensils.forEach(tag => availableUstensils.delete(tag));

    // Set() to Array and sort.
    const availableIngredientsArray = Array.from(availableIngredients).sort();
    const availableAppliancesArray = Array.from(availableAppliances).sort();
    const availableUstensilsArray = Array.from(availableUstensils).sort();

    const totalRecipesSection = document.getElementById("total-recipes");
    totalRecipesSection.innerHTML = `${filteredRecipes.length} recettes`;

    recipesSection.innerHTML = "";
    updateTagsLists(availableIngredientsArray, availableAppliancesArray, availableUstensilsArray);
    displayRecipes(filteredRecipes);
}