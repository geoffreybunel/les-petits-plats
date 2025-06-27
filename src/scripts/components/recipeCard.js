export function displayRecipes(recipesList) {
    const recipesSection = document.getElementById("recipes-section");
    recipesSection.innerHTML = "";

    recipesList.forEach(recipe => {
        const recipeCard = document.createElement("article");
        recipeCard.className = "rounded-xl h-full bg-white shadow-md overflow-hidden max-w-[380px]";

        recipeCard.innerHTML = `
            <div class="relative">
                <img src="../src/assets/images/recipes/${recipe.image}" alt="${recipe.name}" class="h-[253px] object-cover w-full">
                <span class="absolute z-10 bg-primary px-3 py-1.5 top-3 right-3 rounded-4xl w-16 text-xs">${recipe.time}min</span>
            </div>

            <div class="p-5">
                <h3 class="font-title text-lg my-2.5">${recipe.name}</h3>
                
                <div class="my-7">
                    <h4 class="text-xs tracking-wider font-medium text-tertiary uppercase">Recette</h4>
                    <p class="text-sm mt-2.5">${recipe.description}</p>
                </div>

                <div class="my-7">
                    <h4 class="text-xs tracking-wider font-medium text-tertiary uppercase">Ingrédients</h4>
                    <div class="grid grid-cols-2 gap-x-4 gap-y-2">
                        ${recipe.ingredients.map(i => 
                            `<div class="text-sm mt-2.5">
                                <p>${i.ingredient}</p>
                                <p class="font-light text-tertiary">${i.quantity ? `${i.quantity}${i.unit || ""}` : ""}</p>`).join('')}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        `;
        recipesSection.append(recipeCard);
    });
}