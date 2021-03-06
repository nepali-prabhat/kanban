import React from 'react'
import TaskCard from '../TasksCard';
import Add from '../Add';
import ColumnTitle from '../ColumnTitle';
import { Draggable } from 'react-beautiful-dnd';

import { Droppable } from 'react-beautiful-dnd';

const style = {
	stickyAdd: {
		position: 'sticky',
		bottom: '0px',
		padding: '0 10px',
		zIndex: '10',
	}
}
class Column extends React.Component {
	scrollRef = React.createRef();
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
						{...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
							<TaskCard isDragging={snapshot.isDragging} columnId={id} kanbanId={kanbanId} id={task.id} title={task.title} description={task.description} />
						</div>
					)}
				</Draggable>
			)
		));
		
		return (
			<div 
			className='kanban-column'
			ref = {this.scrollRef}
			style={{
				border:  isDragging? '1px dashed #3EC3BB':'none',
				background:  isDragging? '#c8ebf0':'rgba(255,255,255,0)'
			}}  id='style-1'>
				<ColumnTitle kanbanId={kanbanId} columnId={id} title={title} handle={this.props.handle}/>
				<Droppable type="Row" droppableId={String(kanbanId) + "," + String(id) + "," + title}>
					{(provided) => (
						<div ref={provided.innerRef} {...provided.droppableProps} className="column-tasks">
							{tasksRender}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
				<div style={style.stickyAdd}>
					<Add type="task" scrollRef={this.scrollRef} placeholder="Add new task" columnId={id} kanbanId={kanbanId} />
				</div>
			</div>
		);
	}
}
export default Column;