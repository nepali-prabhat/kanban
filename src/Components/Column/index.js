import React from 'react'
import TaskCard from '../TasksCard';
import Add from '../Add';
import { Draggable } from 'react-beautiful-dnd';

import { Droppable } from 'react-beautiful-dnd';

const style = {
	title: {
		fontFamily: 'Roboto',
		fontWeight: '700',
		fontSize: '20px',
		marginLeft: '5px',
		flex:1,
	},
	stickyAdd: {
		position: 'sticky',
		bottom: '2px',
		padding: '0 10px',
		zIndex: '10',
	}
}
class Column extends React.Component {
	render() {
		const { title, tasks, id, kanbanId, isDragging} = this.props;
		let tasksRender = [];
		tasks.map((task, index) => (
			tasksRender.push(
				<Draggable
					draggableId={String(kanbanId) + "," + String(id) + "," + String(index)+","+String(task.id)}
					index={index}
					key={task.id}>
					{(provided, snapshot) => (
						<div
						key={task.id}
						{...provided.droppableProps} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
							<TaskCard isDragging={snapshot.isDragging} columnId={id} kanbanId={kanbanId} id={task.id} title={task.title} description={task.description} />
						</div>
					)}
				</Draggable>
			)
		));
		return (
			<div 
			className='kanban-column'
			style={{
				border:  isDragging? '1px dashed #3EC3BB':'none',
				background:  isDragging? '#c8ebf0':'rgba(255,255,255,0)'
			}}  id='style-1'>
				<div className="column-title" >
					<div style={style.title} {...this.props.handle}>
						{title}
					</div>
					<div className="option">
						...
					</div>
				</div>
				<Droppable type="Row" droppableId={String(kanbanId) + "," + String(id) + "," + title}>
					{(provided) => (
						<div ref={provided.innerRef} className="column-tasks">
							{tasksRender}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
				<div style={style.stickyAdd}>
					<Add type="task" columnId={id} kanbanId={kanbanId} />
				</div>
			</div>
		);
	}
}
export default Column;