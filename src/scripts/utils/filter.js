import { recipes } from '../../data/recipes.js';
import { selectedIngredients, selectedAppliances, selectedUstensils } from "../components/tags.js";

export function getFilteredRecipes(searchValue = "") {
    const selectedTags = [...selectedIngredients, ...selectedAppliances, ...selectedUstensils];
    
    return recipes.filter(recipe => {
        const recipesNames = recipe.name.toLowerCase();
        const recipesDescription = recipe.description.toLowerCase();
        const ingredientsNames = recipe.ingredients.map(i => i.ingredient.toLowerCase());
        const applianceName = recipe.appliance.toLowerCase();
        const ustensilsNames = recipe.ustensils.map(u => u.toLowerCase());

        // Check if tags are in the ingredients/appliances/ustensils names
        const hasAllTags = selectedTags.every(tag => 
            ingredientsNames.includes(tag.toLowerCase()) ||
            applianceName.includes(tag.toLowerCase()) ||
            ustensilsNames.includes(tag.toLowerCase())
        );

        const hasSearchValue = (searchValue.length < 3) || (
            recipesNames.includes(searchValue) ||
            recipesDescription.includes(searchValue) ||
            ingredientsNames.some(ingredient => ingredient.includes(searchValue)) ||
            applianceName.includes(searchValue) ||
            ustensilsNames.some(ustensil => ustensil.includes(searchValue)));
        
        return hasAllTags && hasSearchValue;
    });
    
}