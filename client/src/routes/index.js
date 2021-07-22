import RecipeNew from '../views/RecipeNew';
import RecipeView from '../views/RecipeView';
import RecipeEdit from '../views/RecipeEdit';
import Dashboard from '../views/Dashboard';
import Landing from '../views/Landing';
import Login from '../views/Login';
import Favorites from '../views/Favorites';

// Paths for testing components
import Loading from '../components/Loading';

const routes = [
	{ path: '/', name: 'Home', component: Landing },
	{ path: '/recipe/new', name: 'New Recipe', component: RecipeNew },
	{ path: '/dashboard', name: 'Your Recipes', component: Dashboard },
	{ path: '/favorites', name: 'Favorites', component: Favorites },
	{ path: '/recipes/:id', name: 'View Recipe', component: RecipeView },
	{ path: '/recipes/:id/edit', name: 'Edit Recipe', component: RecipeEdit },
	{ path: '/loading', name: 'Loading', component: Loading },
	{ path: '/login', name: 'Login', component: Login }
];

export default routes;
