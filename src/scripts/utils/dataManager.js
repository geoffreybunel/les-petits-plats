import { recipes } from '../../data/recipes.js';

export function getAllRecipes() {
    return recipes;
}

export function getAllIngredients() {
    const ingredientsSet = new Set();

    recipes.forEach(recipe => {
        recipe.ingredients.forEach(item => {
            ingredientsSet.add(item.ingredient.charAt(0).toUpperCase() + item.ingredient.slice(1))
        })
    })
    return Array.from(ingredientsSet);
}

export function getAllAppliance() {
    const applianceSet = new Set();

    recipes.forEach(recipe => {
        applianceSet.add(recipe.appliance.charAt(0).toUpperCase() + recipe.appliance.slice(1))
    })
    return Array.from(applianceSet);
}

export function getAllUstensils() {
    const ustensilsSet = new Set();

    recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            ustensilsSet.add(ustensil.charAt(0).toUpperCase() + ustensil.slice(1))
        })
    })

    return Array.from(ustensilsSet);
}