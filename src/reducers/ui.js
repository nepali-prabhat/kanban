import { SET_MODEL, OPEN_MODEL, CLOSE_MODEL } from "../CONST";

const initialState = {
	openTaskModel:true,
	taskModelData:{
		taskId:0,
		columnId: 0,
		kanbanId: 0,
	}
}
const uiReducer = (state=initialState,action)=>{
	switch(action.type){
		case SET_MODEL:{
			const {taskId, columnId, kanbanId, openTaskModel} = action.payload
			return {
				...state,
				openTaskModel:openTaskModel,
				taskModelData:{
					taskId,
					columnId,
					kanbanId
				}
			}
		}
		case OPEN_MODEL:{
			return {
				...state,
				openTaskModel: true
			}
		}
		case CLOSE_MODEL:{
			return {
				...state,
				openTaskModel: false
			}
		}
		default:
			return state;
	}
}
export default uiReducer;