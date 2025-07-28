import { recipes } from '../../data/recipes.js';
import { selectedIngredients, selectedAppliances, selectedUstensils } from "../components/tags.js";
import { updateUI } from "./ui.js";

// * Filter Search
export function getFilteredRecipesBySearchBar(searchValue) {

    let filteredRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
        const recipesNames = recipes[i].name.toLowerCase();

        const recipesDescription = recipes[i].description.toLowerCase();

        let foundIngredients = false;
        for (let j = 0; j < recipes[i].ingredients.length; j++) {
            const ing = recipes[i].ingredients[j].ingredient.toLowerCase();
            if (ing.includes(searchValue)) {
                foundIngredients = true;
                break;
            }
        }

        const applianceName = recipes[i].appliance.toLowerCase();

        let foundUstensils = false;
        for (let k = 0; k < recipes[i].ustensils.length; k++) {
            const ust = recipes[i].ustensils[k].toLowerCase();
            if (ust.includes(searchValue)) {
                foundUstensils = true;
                break;
            }   
        }

        const hasSearchValue = (searchValue.length < 3) || (
            recipesNames.includes(searchValue) ||
            recipesDescription.includes(searchValue) ||
            foundIngredients ||
            applianceName.includes(searchValue) ||
            foundUstensils);
        
        if (hasSearchValue) {
            filteredRecipes.push(recipes[i]);
        }
    }

    return filteredRecipes;
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