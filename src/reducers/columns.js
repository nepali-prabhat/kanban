import {ADD_TASK, ADD_COLUMN, REARANGE_COLUMN,SHIFT_COLUMN,REARANGE_KANBAN, RENAME_TASK} from '../CONST';

let latestColumn = 4;
const initialState= [
	{
		id: 0,
		kanbanId: 0,
		title: "/homepage",
		latestTask:-1,
		tasks: [

		]
	},
	{
		id: 2,
		title: "in progress",
		kanbanId: 0, 
		latestTask:-1,
		tasks:[

		]
	},
	{
		id: 3,
		title: "done",
		kanbanId: 0, 
		latestTask:-1,
		tasks:[

		]
	},
	{
		id: 4,
		title: "confirmed live",
		kanbanId: 0, 
		latestTask:-1,
		tasks:[

		]
	},
]

const columnReducer = (state=initialState, action)=>{
	switch(action.type){
		case ADD_TASK:{
			const task = action.payload;
			let ourColumn = state.filter((column)=>{
				return column.id === task.columnId && column.kanbanId === task.kanbanId
			})[0];
			let ourTasks = [...ourColumn.tasks];
			let latestTask = ourColumn.latestTask+1;
			ourTasks.push({
				id: latestTask,
				title: task.title.substring(0,task.title.length-1).trim(),
				description: task.description
			});
			ourColumn.tasks=[...ourTasks];
			ourColumn.latestTask = latestTask;
			let newStateIndex = state.findIndex((value)=>(task.columnId===value.id && value.kanbanId === task.kanbanId ));
			let newState = [...state];
			newState[newStateIndex] = ourColumn;
			return newState;
		}
		case ADD_COLUMN:{
			const columnToAdd = action.payload;
			latestColumn += 1;
			return [...state, {
				id: latestColumn,
				title: columnToAdd.title.trim(),
				kanbanId: columnToAdd.kanbanId,
				latestTask:-1,
				tasks:[

				]
			}];
		}
		case REARANGE_COLUMN:{
			const {kanbanId,columnId,taskIndex,destinationId,sourceId} = action.payload;
			let ourState = [...state];
			let columnIndex;
			let ourColumn = ourState.filter((column, index)=>{
				if(column.id === columnId && column.kanbanId === kanbanId){
					columnIndex = index;
					return true;
				}
				return false;
			})[0];
			let ourTasks = ourColumn.tasks;
			const draggedTask = ourTasks[taskIndex];
			ourTasks.splice(sourceId,1);
			ourTasks.splice(destinationId,0,draggedTask);
			ourColumn.tasks = ourTasks;
			ourState[columnIndex] = ourColumn;
			return ourState;
		}
		case SHIFT_COLUMN:{
			const {kanbanId,columnId,taskIndex,destinationId,sourceId,sourceIndex,destinationIndex} = action.payload;
			let ourState = [...state];
			//searching for our column 
			let ourColumn = ourState.filter((column, index)=>{
				if(column.id === columnId && column.kanbanId === kanbanId){
					return true;
				}
				return false;
			})[0];
			//removing task index from the source column
			let ourTasks = ourColumn.tasks;
			let draggedTask = ourTasks[taskIndex];
			ourColumn.tasks.splice(taskIndex,1);

			//finding destination column
			let ourDestinationColumn = ourState.filter((column, index)=>{
				if(column.id === destinationId && column.kanbanId === kanbanId){
					return true;
				}
				return false;
			})[0];
			ourDestinationColumn.latestTask +=1;
			draggedTask.id=ourDestinationColumn.latestTask;
			ourDestinationColumn.tasks.splice(destinationIndex,0,draggedTask);
			return [...state];
		}
		case REARANGE_KANBAN:{
			const  {destinationIndex, sourceIndex} = action.payload;
			let ourState = [...state];
			const ourColumn = ourState[sourceIndex];
			ourState.splice(sourceIndex,1);
			ourState.splice(destinationIndex,0,ourColumn);
			return ourState;
		}
		case RENAME_TASK:{
			const {kanbanId,columnId,taskId,title} = action.payload;
			console.log({kanbanId,columnId,taskId,title})
			//searching for our column 
			let ourColumn = state.filter((column, index)=>{
				if(column.id === columnId && column.kanbanId === kanbanId){
					return true;
				}
				return false;
			})[0];
			let  taskIndex;
			ourColumn.tasks.map((task, index)=>{
				if(Number(taskId)===task.id) 
				{
					taskIndex =  index
				} 
				return ""
			});
			console.log(taskIndex)
			ourColumn.tasks[taskIndex] = {
				id:ourColumn.tasks[taskIndex].id,
				title: title.trim(),
				description: ourColumn.tasks[taskIndex].description
			};
			return [...state];
		}
		default:
			return state;
	}
}

export default columnReducer;