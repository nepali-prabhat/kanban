import { ADD_COLUMN, REARANGE_COLUMN, SHIFT_COLUMN,REARANGE_KANBAN,RENAME_TASK } from "../CONST";

export const addColumn= (column)=>{
	return {
		type: ADD_COLUMN,
		payload: column
	}
}

export const renameTask = (task)=>{
	return {
		type: RENAME_TASK,
		payload: task
	}
}

export const rearangeColumn= (columnValues)=>{
	return {
		type: REARANGE_COLUMN,
		payload: columnValues
	}
}

export const shiftColumn= (columnValues)=>{
	return {
		type: SHIFT_COLUMN,
		payload: columnValues
	}
}

export const rearrangeKanban= (kanbanValues)=>{
	return {
		type: REARANGE_KANBAN,
		payload: kanbanValues
	}
}