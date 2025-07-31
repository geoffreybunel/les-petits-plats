import { recipes } from '../../data/recipes.js';
import { selectedIngredients, selectedAppliances, selectedUstensils } from "../components/tags.js";
import { updateUI } from "./ui.js";

// * Filter Search
export function getFilteredRecipesBySearchBar(searchValue) {
    searchValue = searchValue.toLowerCase();
    const filteredRecipes = [];
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
            // for (let k = 0; k <= ing.length - searchValue.length; k++) {
            //     let match = true;
            //     for (let l = 0; l < searchValue.length; l++) {
            //         if (ing[k + l] !== searchValue[l]) {
            //             match = false;
            //             break;
            //         }
            //     }
            //     if (match) {
            //         foundIngredients = true;
            //         break;
            //     }
            
            // }
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

    let finalRecipes;

    if (selectedTags.length > 0) {
        finalRecipes = [];

        for (let i = 0; i < filteredRecipes.length; i++) {
            let foundIngredients = [];
            for (let j = 0; j < filteredRecipes[i].ingredients.length; j++) {
                const ing = filteredRecipes[i].ingredients[j].ingredient.toLowerCase();
                foundIngredients.push(ing);
            }

            const applianceName = filteredRecipes[i].appliance.toLowerCase();

            let foundUstensils = [];
            for (let k = 0; k < filteredRecipes[i].ustensils.length; k++) {
                const ust = filteredRecipes[i].ustensils[k].toLowerCase();
                foundUstensils.push(ust);
            }

            let hasAllTags = true;
            for (let l = 0; l < selectedTags.length; l++) {
                const tag = selectedTags[l].toLowerCase();
                if (
                    !foundIngredients.includes(tag) &&
                    !applianceName.includes(tag) &&
                    !foundUstensils.includes(tag)
                ) {
                    hasAllTags = false;
                    break;
                }
            }

            if (hasAllTags) {
                finalRecipes.push(filteredRecipes[i]);
            }
        }
    } else {
        finalRecipes = filteredRecipes;
    };
    
    // console.log("🔎 Appel de filterAllRecipes avec :", searchValue);

    updateUI(finalRecipes, searchValue);
}