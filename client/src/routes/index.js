import RecipeNew from '../views/RecipeNew';
import RecipeView from '../views/RecipeView';
import RecipeEdit from '../views/RecipeEdit';
import Dashboard from '../views/Dashboard';
import Landing from '../views/Landing';

const routes = [
	{ path: '/', name: 'Home', component: Landing },
	{ path: '/recipe/new', name: 'New Recipe', component: RecipeNew },
	{ path: '/dashboard', name: 'Your Recipes', component: Dashboard },
	{ path: '/recipes/:id', name: 'View Recipe', component: RecipeView },
	{ path: '/recipes/:id/edit', name: 'Edit Recipe', component: RecipeEdit }
];

export default routes;
