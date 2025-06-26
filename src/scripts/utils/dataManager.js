import { recipes } from '../../data/recipes.js';

export function getAllRecipes() {
    return recipes;
}

export function getAllIngredients() {
    const ingredientsSet = new Set();

    recipes.forEach(recipe => {
        recipe.ingredients.forEach(item => {
            ingredientsSet.add(item.ingredient.toLowerCase())
        })
    })
    return Array.from(ingredientsSet);
}

export function getAllAppliance() {
    const applianceSet = new Set();

    recipes.forEach(recipe => {
        applianceSet.add(recipe.appliance.toLowerCase())
    })
    return Array.from(applianceSet);
}

export function getAllUstensils() {
    const ustensilsSet = new Set();

    recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            ustensilsSet.add(ustensil.toLowerCase())
        })
    })

    return Array.from(ustensilsSet);
}