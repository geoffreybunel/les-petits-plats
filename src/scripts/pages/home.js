import { getAllRecipes } from '../../scripts/utils/dataManager.js';
import { dropdown } from '../../scripts/components/filterDropdown.js';

export default function Home() {
    getAllRecipes();
    dropdown();
  }