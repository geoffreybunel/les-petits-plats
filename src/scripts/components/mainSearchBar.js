import { filterAllRecipes } from "../utils/filter.js";

export function mainSearchBar() {
    const searchBar = document.getElementById("search");
    const eraseBtn = document.getElementById("erase-button");

    eraseBtn.style.display = "none";
    eraseBtn.addEventListener("click", () => {
        searchBar.value = "";
        eraseBtn.style.display = "none";
        filterAllRecipes();
    });

    // Everytime we type in the input ...
    searchBar.addEventListener("input", (event) => {
        const searchValue = event.target.value.toLowerCase();
        // Display delete icon if searchbar's length > 0
        eraseBtn.style.display = searchValue.length > 0 ? "" : "none";

        filterAllRecipes(searchValue);
    });
}