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

export function displayLists() {
    // Display ingredients
    const ingredientsList = document.getElementById('ingredientsList');

    const allIngredients = getAllIngredients();
    allIngredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        li.classList.add('cursor-pointer', 'hover:bg-primary', 'p-2');
        ingredientsList.append(li);
    });

    // Display appliance
    const applianceList = document.getElementById('applianceList');

    const allAppliances = getAllAppliance();
    allAppliances.forEach(appliance => {
        const li = document.createElement('li');
        li.textContent = appliance;
        li.classList.add('cursor-pointer', 'hover:bg-primary', 'p-2');
        applianceList.append(li);
    });

    // Display ustensils
    const ustensilsList = document.getElementById('ustensilsList');

    const allUstensils = getAllUstensils();
    allUstensils.forEach(utensil => {
        const li = document.createElement('li');
        li.textContent = utensil;
        li.classList.add('cursor-pointer', 'hover:bg-primary', 'p-2');
        ustensilsList.append(li);
    });

    console.log(getAllUstensils())
}