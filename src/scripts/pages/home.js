import { recipes } from '../../data/recipes.js';
import { dropdown, displayLists } from '../components/listsDropdown.js';
import { displayRecipes } from '../components/recipeCard.js';
import { displayTags } from '../components/tags.js';
import { filterListItems } from '../utils/listSearchBarInput.js';

export default function Home() {
    dropdown();
    displayLists();
    displayRecipes(recipes);
    displayTags();
    filterListItems();
  }