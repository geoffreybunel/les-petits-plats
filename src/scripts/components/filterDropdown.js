export function dropdown() {
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector(".dropdown-toggle");
        const menu = dropdown.querySelector(".dropdown-menu");

        toggle.addEventListener('click', () => {
            menu.classList.remove('hidden');
        })
    });
}