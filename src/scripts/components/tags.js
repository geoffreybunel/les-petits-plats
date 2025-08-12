import { filterAllRecipes } from '../utils/filter.js';
import { filtersInput } from '../utils/listSearchBarInput.js';

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
    
        // tag.innerHTML = `
    //     <div class="relative p-3">
    //         <span class="pr-4">${tagName}</span>
    //         <button class="remove-tag cursor-pointer" data-tag="${tagName}">
    //             <img src="../src/assets/icons/removeTag.svg" alt="close icon" class="absolute right-3 top-[19px]"/>
    //         </button>
    //     </div>
    // `;

    // Create tag card
    const tag = document.createElement("div");
    tag.className = "rounded-xl h-full bg-primary shadow-md overflow-hidden max-w-[380px]";

    const tagContent = document.createElement("div");
    tagContent.className = "flex justify-between items-center p-3";

    const tagSpan = document.createElement("span");
    tagSpan.className = "pr-4"
    tagSpan.textContent = tagName;

    const tagButton = document.createElement("button");
    tagButton.className = "remove-tag cursor-pointer";
    tagButton.dataset.tag = tagName;

    const tagCloseIcon = document.createElement("img");
    tagCloseIcon.className = "right-3 top-[19px]";
    tagCloseIcon.src = "../src/assets/icons/removeTag.svg"
    tagCloseIcon.alt = "close icon";

    tagButton.append(tagCloseIcon);
    tagContent.append(tagSpan, tagButton);
    tag.append(tagContent);
    tagsSection.append(tag);

    // display filtered recipes
    const searchInput = document.getElementById("search");
    const searchValue = searchInput.value.trim().toLowerCase();
    filterAllRecipes(searchValue);

    // Remove tags
    const removeTag = tag.querySelector(".remove-tag");
    removeTag.addEventListener("click", () => {
        tag.remove();
        tagSet.delete(tagName);
        const currentSearch = document.getElementById("search").value.trim().toLowerCase();
        filterAllRecipes(currentSearch); // filter again
    })
}

export function displayTags() {
    const listItems = document.querySelectorAll(".filters-lists li");

    listItems.forEach(item => {
        item.addEventListener("click", () => {
            const tagName = item.textContent.trim();
            const type = item.closest("ul").dataset.type; // get the tag's type
            tagCard(tagName, type); // update Set

            // Clear input
            const inputClear = Array.from(filtersInput).find(input => input.dataset.type === type);
            if (inputClear) {
                inputClear.value = "";
                inputClear.dispatchEvent(new Event("input"));
            }
        });
    });
}