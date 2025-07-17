import { applianceList, ingredientsList, ustensilsList } from "../components/listsDropdown.js";
import { displayTags } from "../components/tags.js";
import { getFilteredRecipes } from "./filter.js";
import { updateUI } from "./ui.js";

export function filterTags() {
    const filteredRecipes = getFilteredRecipes()
    updateUI(filteredRecipes);
}

export function updateTagsLists(availableIngredients, availableAppliances, availableUstensils) {
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