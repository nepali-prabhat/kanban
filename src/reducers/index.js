import {combineReducers} from 'redux';
import columnReducer from './columns';

export default combineReducers({
	columns: columnReducer
});