import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';

export default combineReducers({
	// Auth state is produced by authReducer
	auth: authReducer,
	form: reduxForm
});
