import axios from 'axios';
import { FETCH_USER, FETCH_RECIPES, FETCH_RECIPE } from './types';
export const fetchUser = () => async (dispatch) => {
	const res = await axios.get('/api/current_user');
	dispatch({ type: FETCH_USER, payload: res.data });
};
export const fetchRecipes = () => async (dispatch) => {
	const res = await axios.get('/api/recipes');
	dispatch({ type: FETCH_RECIPES, payload: res.data });
};
export const fetchRecipe = (id) => async (dispatch) => {
	const res = await axios.get('/api/recipes/' + id);
	dispatch({ type: FETCH_RECIPE, payload: res.data });
};
export const submitRecipe = (values, history) => async (dispatch) => {
	console.log(values);
	const res = await axios.post('/api/recipes', values);
	console.log(res);
	history.push('/recipes/' + res.data._id);
	dispatch({ type: FETCH_RECIPE, payload: res.data });
};
