import React, { Component } from 'react'
import { connect } from 'react-redux';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Column from '../Column';
import Add from '../Add';
import Modal from '@material-ui/core/Modal';
import { rearangeColumn, shiftColumn, rearrangeKanban } from '../../actions/column';
import TaskModelCard from '../TasksCard/TaskModelCard';

class Kanban extends Component {
	handleDragEnd = (result) => {
		const { destination, source, draggableId, type } = result;
		if (destination === null) {
			return;
		}
		if ((destination.droppableId === source.droppableId) && (destination.index === source.index)) {
			return;
		}
		if (type === "Row") {
			console.log(result);

			if (destination.droppableId === source.droppableId) {
				//
				const [kanbanId, columnId, taskIndex] = draggableId.split(',');
				this.props.dispatch(rearangeColumn({ kanbanId: parseInt(kanbanId), columnId: parseInt(columnId), taskIndex, destinationId: destination.index, sourceId: source.index }));
			} else {
				//dragged boi
				const [kanbanId, columnId, taskIndex] = draggableId.split(',');
				const destinationId = parseInt(destination.droppableId.split(',')[1]);
				const sourceId = parseInt(source.droppableId.split(',')[1]);
				const sourceIndex = source.index;
				const destinationIndex = destination.index;
				this.props.dispatch(shiftColumn({ kanbanId: parseInt(kanbanId), columnId: parseInt(columnId), taskIndex, destinationId, sourceId, sourceIndex, destinationIndex }));
			}
		}
		if (type === "Column") {
			this.props.dispatch(rearrangeKanban({ destinationIndex: destination.index, sourceIndex: source.index }));
		}
	}
	
	buildDroppableColumn(column, index) {
		return (
			<Draggable draggableId={String(column.id)} index={index}
				key={column.id}>
				{(provided, snapshot) => (
					<div
						{...provided.draggableProps}
						ref={provided.innerRef}
						key={column.id}
					>
						<Column
							isDragging={snapshot.isDragging}
							id={column.id}
							handle={provided.dragHandleProps}
							kanbanId={column.kanbanId}
							title={column.title}
							tasks={column.tasks} />
							{provided.placeholder}
					</div>
				)}
			</Draggable>
		)
	}

	render() {
		const { title, columns } = this.props;
		let columnRender = [];
		columns.map((column, index) => {
			const droppableColumn = this.buildDroppableColumn(column, index);
			columnRender.push(droppableColumn)
			return "";
		});
		return (
			<div className="kanban">
				<div className="kanban-title">
					<div className="board-name">
						{title}
					</div>
				</div>
				<DragDropContext onDragEnd={this.handleDragEnd}>
					<Droppable type="Column" droppableId={String(this.props.id)} direction='horizontal'>
						{
							(provided, snapshot) => (
								<div className="board-columns" {...provided.droppableProps} ref={provided.innerRef} style={snapshot.isDraggingOver ? { background: 'rgba(119,235,228,0.2)' } : {}}>
									{columnRender}
									{provided.placeholder}
									<div style={{ padding: '20px' }}>
										<Add placeholder="Add new list" type='column' kanbanId={this.props.id} />
									</div>
								</div>
							)
						}
					</Droppable>
				</DragDropContext>
				<Modal style={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}} open={this.props.ui.openTaskModel}>
					{<TaskModelCard />}
				</Modal>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return { columns: state.columns, ui:state.ui }
}

export default connect(mapStateToProps)(Kanban);