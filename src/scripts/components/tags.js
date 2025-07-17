import { mainSearchBar } from '../utils/mainSearchBar.js';

const tagsSection = document.getElementById("tags-section");
export const selectedIngredients = new Set(); //Ingredients already added
export const selectedAppliances = new Set(); //Appliances already added
export const selectedUstensils = new Set(); //Ustensils already added

export function tagCard(tagName, type) {
    let tagSet;

    if (type === "ingredient") {
        tagSet = selectedIngredients;
    } else if (type === "appliance") {
        tagSet = selectedAppliances;
    } else if (type === "ustensil") {
        tagSet = selectedUstensils;
    }

    if (tagSet.has(tagName)) {
        return
    }

    tagSet.add(tagName);

    // console.log(tagSet);
    
    // Create tag card
    const tag = document.createElement("div");
    tag.className = "rounded-xl h-full bg-primary shadow-md overflow-hidden max-w-[380px]";

    tag.innerHTML = `
        <div class="relative p-3">
            <span class="pr-4">${tagName}</span>
            <button class="remove-tag cursor-pointer" data-tag="${tagName}">
                <img src="../src/assets/icons/removeTag.svg" alt="close icon" class="absolute right-3 top-[19px]"/>
            </button>
        </div>
    `;
    
    tagsSection.append(tag);

    // display filtered recipes
    mainSearchBar();

    // Remove tags
    const removeTag = tag.querySelector(".remove-tag");
    removeTag.addEventListener("click", () => {
        tag.remove();
        tagSet.delete(tagName);
        mainSearchBar(); // filter again
    })


}

export function displayTags() {
    const listItems = document.querySelectorAll(".filters-lists li");

    listItems.forEach(item => {
        item.addEventListener("click", () => {
            const tagName = item.textContent.trim();
            const type = item.closest("ul").dataset.type; // get the tag's type
            tagCard(tagName, type); // update Set
        });
    });
}