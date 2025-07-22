import { recipes } from '../../data/recipes.js';
import { selectedIngredients, selectedAppliances, selectedUstensils } from "../components/tags.js";
import { updateUI } from "./ui.js";

// * Filter Search
export function getFilteredRecipesBySearchBar(searchValue) {

    return recipes.filter(recipe => {
        const recipesNames = recipe.name.toLowerCase();
        const recipesDescription = recipe.description.toLowerCase();
        const ingredientsNames = recipe.ingredients.map(i => i.ingredient.toLowerCase());
        const applianceName = recipe.appliance.toLowerCase();
        const ustensilsNames = recipe.ustensils.map(u => u.toLowerCase());

        const hasSearchValue = (searchValue.length < 3) || (
            recipesNames.includes(searchValue) ||
            recipesDescription.includes(searchValue) ||
            ingredientsNames.some(ingredient => ingredient.includes(searchValue)) ||
            applianceName.includes(searchValue) ||
            ustensilsNames.some(ustensil => ustensil.includes(searchValue)));
        
        return hasSearchValue;
    });
}

export function filterSearchBar(searchValue) {
    const filteredRecipesBySearchBar = getFilteredRecipesBySearchBar(searchValue);
    updateUI(filteredRecipesBySearchBar, searchValue);

    return filteredRecipesBySearchBar;
}


// * Filter Tags
// export function getFilteredRecipesByTags() {
//     const selectedTags = [...selectedIngredients, ...selectedAppliances, ...selectedUstensils];
    
//     return recipes.filter(recipe => {
//         const ingredientsNames = recipe.ingredients.map(i => i.ingredient.toLowerCase());
//         const applianceName = recipe.appliance.toLowerCase();
//         const ustensilsNames = recipe.ustensils.map(u => u.toLowerCase());

//         // Check if tags are in the ingredients/appliances/ustensils names
//         const hasAllTags = selectedTags.every(tag => 
//             ingredientsNames.includes(tag.toLowerCase()) ||
//             applianceName.includes(tag.toLowerCase()) ||
//             ustensilsNames.includes(tag.toLowerCase())
//         );
        
//         return hasAllTags;
//     });
// }

// * Combine both filters functions
export function filterAllRecipes(searchValue) {
    let filteredRecipes = recipes;

    if (searchValue?.length >= 3) {
        filteredRecipes = getFilteredRecipesBySearchBar(searchValue);
    }

    const selectedTags = [...selectedIngredients, ...selectedAppliances, ...selectedUstensils];

    if (selectedTags.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe => {
            const ingredientsNames = recipe.ingredients.map(i => i.ingredient.toLowerCase());
            const applianceName = recipe.appliance.toLowerCase();
            const ustensilsNames = recipe.ustensils.map(u => u.toLowerCase());
    
            return selectedTags.every(tag => 
                ingredientsNames.includes(tag.toLowerCase()) ||
                applianceName.includes(tag.toLowerCase()) ||
                ustensilsNames.includes(tag.toLowerCase())
            );

        });
    }
    // console.log("🔎 Appel de filterAllRecipes avec :", searchValue);

    updateUI(filteredRecipes, searchValue);
}