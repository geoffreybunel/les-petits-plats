import { recipes } from "../../data/recipes.js";
import { applianceList, ingredientsList, ustensilsList } from "../components/listsDropdown.js";
import { displayRecipes } from "../components/recipeCard.js";
import { selectedIngredients, selectedAppliances, selectedUstensils, displayTags } from "../components/tags.js";

export function recipesFilter() {
    const selectedTags = [...selectedIngredients, ...selectedAppliances, ...selectedUstensils];
    // .filter go through all the recipes and ...
    const filteredRecipes = recipes.filter(recipe => {
        // Recipe's ingredients
        const ingredientsNames = recipe.ingredients.map(i => i.ingredient.toLowerCase());
        // Recipe's appliances
        const applianceName = recipe.appliance.toLowerCase();
        // Recipe's ustensils
        const ustensilsNames = recipe.ustensils.map(u => u.toLowerCase());    

        // Check if tags are in the ingredients/appliances/ustensils names
        const hasAllTags = selectedTags.every(tag => 
            ingredientsNames.includes(tag.toLowerCase()) ||
            applianceName.includes(tag.toLowerCase()) ||
            ustensilsNames.includes(tag.toLowerCase())
        );

        return hasAllTags;
    });

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

    updateFilterLists(availableIngredientsArray, availableAppliancesArray, availableUstensilsArray);
    // Display the filtered recipes
    displayRecipes(filteredRecipes);
}

export function updateFilterLists(availableIngredients, availableAppliances, availableUstensils) {
    ingredientsList.innerHTML = "";
    availableIngredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        li.classList.add('ingredients-item', 'cursor-pointer', 'hover:bg-primary', 'p-2');
        ingredientsList.append(li);
    });

    applianceList.innerHTML = "";
    availableAppliances.forEach(appliance => {
        const li = document.createElement('li');
        li.textContent = appliance;
        li.classList.add('ingredients-item', 'cursor-pointer', 'hover:bg-primary', 'p-2');
        applianceList.append(li);
    });

    ustensilsList.innerHTML = "";
    availableUstensils.forEach(ustensil => {
        const li = document.createElement('li');
        li.textContent = ustensil;
        li.classList.add('ingredients-item', 'cursor-pointer', 'hover:bg-primary', 'p-2');
        ustensilsList.append(li);
    });

    displayTags()
}