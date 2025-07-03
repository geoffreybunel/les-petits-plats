const tagsSection = document.getElementById("tags-section");
const addedTags = new Set(); //items already added

export function tagCard(tagName) {
    if (addedTags.has(tagName)) {
        console.log(tagName, "a déjà été ajouté");
        return
    }

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

    addedTags.add(tagName);

    // Remove tags
    const removeTag = tag.querySelector(".remove-tag");
    removeTag.addEventListener("click", () => {
        tag.remove();
        addedTags.delete(tagName);
    })
}

export function displayTags() {
    const listItems = document.querySelectorAll(".filters-lists li");

    listItems.forEach(item => {
        item.addEventListener("click", () => {
            const tagName = item.textContent.trim();
            tagCard(tagName); // update Set
        });
    });
}