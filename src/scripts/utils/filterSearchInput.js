const filtersInput = document.querySelectorAll(".filter-search-input");
const deleteIcon = document.querySelectorAll(".delete-icon");

export function filterListItems(listElement, searchValue) {
    if (!listElement) {
        return;
      }

    const items = listElement.querySelectorAll("li");
    
    // filter the search
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(searchValue) ? "" : "none";
    })
}

// For each filter's input
filtersInput.forEach((input, index) => {
    const icon = deleteIcon[index];
    icon.style.display = "none";

    // Everytime we type in the input ...
    input.addEventListener("input", (event) => {
        const searchValue = event.target.value.toLowerCase();
        const type = event.target.dataset.type; // "ingredients", "appliance", "ustensils"
        const list = document.getElementById(`${type}List`);

        // Display delete icon if searchbar's length > 0
        icon.style.display = searchValue.length > 0 ? "" : "none";
        console.log("Filtrage:", type, list);

        // filter the search
        filterListItems(list, searchValue);
    });

    // Hide the delete icon on click and restart the filter
    icon.addEventListener("click", () => {
        input.value = "";
        input.dispatchEvent(new Event("input")); // restart filter
    });

})
