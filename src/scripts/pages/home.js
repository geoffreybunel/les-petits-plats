import { recipes } from '../../data/recipes.js';
import { dropdown, displayLists } from '../components/filterDropdown.js';
import { displayRecipes } from '../components/recipeCard.js';

export default function Home() {
    dropdown();
    displayLists();
    displayRecipes(recipes);
  }