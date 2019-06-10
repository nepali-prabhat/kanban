import {combineReducers} from 'redux';
import columnReducer from './columns';
import uiReducer from './ui';

export default combineReducers({
	columns: columnReducer,
	ui: uiReducer
});