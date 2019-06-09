import React from 'react'
const TasksCard = ({title})=>{
		return (
			<div style={style.task} className='column-task'>
				{title}
			</div>
		);
}
const style={
	task:{
		padding: '15px',
		border: '1px solid transparent',
		boxShadow: '0 1px 3px 0 rgba(21,27,38,.15)',
		transition: 'box-shadow 100ms,transform 100ms,background-color 100ms,border-color 100ms',
		cursor: 'pointer',
		borderRadius: '3px',
		fontFamily:'Muli',
		fontSize:'15px',
		width: '274px',
	}
}
export default TasksCard;