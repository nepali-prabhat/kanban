import {SET_MODEL, OPEN_MODEL, CLOSE_MODEL} from '../CONST'

export const setTaskModel=(modelState)=>{
	return {
		type: SET_MODEL,
		payload: modelState
	}
}
export const openModel=()=>{
	return {
		type: OPEN_MODEL,
	}
}

export const closeModel=()=>{
	return {
		type: CLOSE_MODEL,
	}
}