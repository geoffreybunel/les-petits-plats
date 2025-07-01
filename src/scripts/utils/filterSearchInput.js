const filtersInput = document.querySelectorAll(".filter-search-input");

export function filterListItems(listElement, searchValue) {
    if (!listElement) {
        return;
      }

    const items = listElement.querySelectorAll("li");

    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(searchValue) ? "" : "none";
    })
}

filtersInput.forEach(input => {
    input.addEventListener("input", (event) => {
        const searchValue = event.target.value.toLowerCase();
        const type = event.target.dataset.type; // "ingredients", "appliance", "ustensils"
        const list = document.getElementById(`${type}List`);

        console.log("Filtrage:", type, list);
        filterListItems(list, searchValue);
    })
})