import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import recipesReducer from './recipesReducer';

export default combineReducers({
	// Auth state is produced by authReducer
	auth: authReducer,
	form: formReducer,
	recipes: recipesReducer
});
