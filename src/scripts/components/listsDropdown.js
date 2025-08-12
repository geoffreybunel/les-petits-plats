import { getAllIngredients, getAllAppliance, getAllUstensils } from '../utils/dataManager.js';

export function dropdown() {
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector(".dropdown-toggle");
        const menu = dropdown.querySelector(".dropdown-menu");
        const arrow = dropdown.querySelector(".arrow")

        toggle.addEventListener('click', () => {
            if (menu.classList.contains('hidden')) {
                menu.classList.remove('hidden');
                arrow.classList.add('rotate-180');
                arrow.classList.add('transition');
            } else {
                menu.classList.add('hidden');
                arrow.classList.remove('rotate-180');
            }
        })
    });
}

export const ingredientsList = document.getElementById('ingredientList');
export const applianceList = document.getElementById('applianceList');
export const ustensilsList = document.getElementById('ustensilList');

export function displayLists() {
    // Display ingredients
    const allIngredients = getAllIngredients();
    const sortedIngredients = allIngredients.sort();

    sortedIngredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        li.classList.add('ingredients-item', 'cursor-pointer', 'hover:bg-primary', 'p-2');
        ingredientsList.append(li);
    });

    // Display appliance
    const allAppliances = getAllAppliance();
    const sortedAppliance = allAppliances.sort();

    sortedAppliance.forEach(appliance => {
        const li = document.createElement('li');
        li.textContent = appliance;
        li.classList.add('appliances-item', 'cursor-pointer', 'hover:bg-primary', 'p-2');
        applianceList.append(li);
    });

    // Display ustensils
    const allUstensils = getAllUstensils();
    const sortedUstensils = allUstensils.sort();

    sortedUstensils.forEach(utensil => {
        const li = document.createElement('li');
        li.textContent = utensil;
        li.classList.add('ustensils-item', 'cursor-pointer', 'hover:bg-primary', 'p-2');
        ustensilsList.append(li);
    });
}