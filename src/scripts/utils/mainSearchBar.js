import { recipes } from "../../data/recipes.js";
import { displayRecipes } from "../components/recipeCard.js";
import { recipesFilter } from "./filterRecipes.js";

export function mainSearchBar() {
    const searchBar = document.getElementById("search");
    const eraseBtn = document.getElementById("erase-button");

    eraseBtn.style.display = "none";

    eraseBtn.addEventListener("click", () => {
        searchBar.value = "";
        eraseBtn.style.display = "none";
    });

    // Everytime we type in the input ...
    searchBar.addEventListener("input", (event) => {
        const searchValue = event.target.value.toLowerCase();
        // Display delete icon if searchbar's length > 0
        eraseBtn.style.display = searchValue.length > 0 ? "" : "none";

        //if input value >= 3 characters.. => filter the recipes
        if (searchValue.length >= 3) {
            mainSearchBarFilter(searchValue);
            console.log(searchValue);
        } else {
            displayRecipes(recipes);
        }
    });
}



export function mainSearchBarFilter(searchValue) {
    const filteredRecipes = recipes.filter(recipe => {
        // Recipe's name
        const recipesNames = recipe.name.toLowerCase();
        // Recipe's description
        const recipesDescription = recipe.description.toLowerCase();
        // Recipe's ingredients
        const ingredientsNames = recipe.ingredients.map(i => i.ingredient.toLowerCase());
        // Recipe's appliances
        const applianceName = recipe.appliance.toLowerCase();
        // Recipe's ustensils
        const ustensilsNames = recipe.ustensils.map(u => u.toLowerCase());

        return (
            recipesNames.includes(searchValue) ||
            recipesDescription.includes(searchValue) ||
            ingredientsNames.some(ingredient => ingredient.includes(searchValue)) ||
            applianceName.includes(searchValue) ||
            ustensilsNames.some(ustensil => ustensil.includes(searchValue))
        );
    });

    displayRecipes(filteredRecipes);
    return filteredRecipes;
}