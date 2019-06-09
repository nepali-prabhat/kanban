import {ADD_TASK} from '../CONST';

// task: {title:"complete barebone.",description:"", columnId:1, kanbanId: }
export const addList = (task)=>{
	return {
		type: ADD_TASK,
		payload: task
	}
}
