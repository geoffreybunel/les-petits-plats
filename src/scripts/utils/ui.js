import { recipesSection, displayRecipes } from "../components/recipeCard.js";
import { applianceList, ingredientsList, ustensilsList } from "../components/listsDropdown.js";
import { selectedIngredients, selectedAppliances, selectedUstensils, displayTags } from "../components/tags.js";

export function updateUI(filteredRecipes, searchValue) {
    // Create new sets for items available in recipes displayed
    const availableIngredients = new Set();
    const availableAppliances = new Set();
    const availableUstensils = new Set();

    // Add each available items separetaly in new sets 
    filteredRecipes.forEach(recipe => {
        recipe.ingredients.forEach(i => {
            availableIngredients.add(i.ingredient.charAt(0).toUpperCase() + i.ingredient.slice(1));
        });
        
        availableAppliances.add(recipe.appliance.charAt(0).toUpperCase() + recipe.appliance.slice(1));

        recipe.ustensils.forEach(u => {
            availableUstensils.add(u.charAt(0).toUpperCase() + u.slice(1));
        });
    });

    // Delete already displayed tags from new sets
    selectedIngredients.forEach(tag => availableIngredients.delete(tag));
    selectedAppliances.forEach(tag => availableAppliances.delete(tag));
    selectedUstensils.forEach(tag => availableUstensils.delete(tag));

    // Set() to Array and sort.
    const availableIngredientsArray = Array.from(availableIngredients).sort();
    const availableAppliancesArray = Array.from(availableAppliances).sort();
    const availableUstensilsArray = Array.from(availableUstensils).sort();

    const totalRecipesSection = document.getElementById("total-recipes");
    totalRecipesSection.innerHTML = `${filteredRecipes.length} recettes`;


    recipesSection.innerHTML = "";
    if (filteredRecipes.length === 0) {
        recipesSection.classList.remove("grid", "grid-cols-3", "gap-5");
        recipesSection.innerHTML = `
            <h2 class="font-bold">Aucune recette ne contient ‘${searchValue}’ vous pouvez chercher «tarte aux pommes », « poisson », etc...</h2>
        `;
    } else {
        recipesSection.classList.add("grid", "grid-cols-3", "gap-5");
        updateTagsLists(availableIngredientsArray, availableAppliancesArray, availableUstensilsArray);
        displayRecipes(filteredRecipes);
    }
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