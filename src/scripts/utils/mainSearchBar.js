import { recipes } from "../../data/recipes.js";
import { displayRecipes } from "../components/recipeCard.js";
import { getFilteredRecipes } from "./filter.js";
import { updateUI } from "./ui.js";

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
            filterAllRecipes(searchValue);
        } else {
            displayRecipes(recipes);
        }
    });
}

export function filterAllRecipes(searchValue) {
    const filteredRecipes = getFilteredRecipes(searchValue);
    updateUI(filteredRecipes);
}