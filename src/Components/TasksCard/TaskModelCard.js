import React from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Textarea from 'react-textarea-autosize';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import ListRoundedIcon from '@material-ui/icons/ListRounded';
import { renameTask, deleteTask, updateTaskDesc } from '../../actions/column';
import { closeModel } from '../../actions/ui';

class TaskModelCard extends React.Component {

	state = {
		title:"",
		description:"",
		titleFocused: false,
		descFocused: false,
	}
	componentDidMount = ()=>{
		const {taskModelData} = this.props.ui;
		let taskOfModel;
		this.props.columns.forEach(column => {
			if(column.id===taskModelData.columnId && column.kanbanId===taskModelData.kanbanId){
				const tasks = column.tasks;
				tasks.forEach(task=>{
					if(taskModelData.taskId===task.id){
						taskOfModel = task;
					}
				});
			}
		});
		this.setState({...this.state, title: taskOfModel.title, description:taskOfModel.description});
	}
	style = {
		container: {
			width: '850px',
			height: '650px',
			background: 'white',
			borderRadius: '8px',
		},
		header: {
			height: '70px',
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			boxShadow:'0px 1px 6px 0px rgba(0,0,0,0.2)',
			padding: '20px 10px',
		},
		title:{
			padding: '10px',
		},
		taskDates:{
			
		},
		description:{
			padding: '10px',
		},
		comment:{

		},
		activity:{

		},
		markCompleteButton:{
		},
		textArea: {
			resize: 'none',
			outline: 'none',
			border: 'none',
			fontFamily: 'Muli',
			padding: '5px',
			width: '100%',
		},
	}
	handleTitleBlur=(e)=>{
		this.setState({...this.state, titleFocused:false});
		this.dispatchTaskRename();
	}
	handleDescBlur=(e)=>{
		this.setState({...this.state, descFocused:false});
		this.dispatchDescUpdate();
	}
	dispatchTaskRename = ()=>{
		const {kanbanId, columnId, taskId} = this.props.ui.taskModelData
		this.props.dispatch(renameTask({ kanbanId: kanbanId, columnId: columnId, taskId: taskId, title: this.state.title }));
	}
	dispatchDescUpdate = ()=>{
		const {columnId, kanbanId,taskId} = this.props.ui.taskModelData
		this.props.dispatch(updateTaskDesc({ kanbanId: kanbanId, columnId: columnId, taskId: taskId, description: this.state.description }));
	}
	handleTitleKeyUp=(e)=>{
		if (e.key === "Enter") {
			this.setState({...this.state, title:e.target.value.trim()});
			this.dispatchTaskRename();
		}
	}
	handleDescKeyUp=(e)=>{
		if (e.key === "Enter") {
			this.setState({...this.state, description:e.target.value.trim()});
			this.dispatchDescUpdate();
		}
	}
	handleTitleChange=(e)=>{
		this.setState({...this.state, title:e.target.value});
	}
	handleDescChange=(e)=>{
		this.setState({...this.state, description:e.target.value});
	}
	handleClose = (e)=>{
		this.props.dispatch(closeModel());
	}
	handleDeleteClick = (e)=>{
		const {columnId, kanbanId,taskId} = this.props.ui.taskModelData;
		this.props.dispatch(deleteTask({columnId, kanbanId,taskId}));
		this.props.dispatch(closeModel());
	}
	render() {
		const style = this.style;
		return (
			<div style={style.container}>
				<div style={style.header}>
					<div>
						{/* <Button variant="outlined" style={{color:'green', fontFamily:'Ubuntu'}}>
							<CheckCircleOutlineIcon />
						</Button> */}
						<Button variant="outlined" onClick={this.handleDeleteClick} style={{color:'green', fontFamily:'Ubuntu'}}>
							<DeleteIcon />
						</Button>
					</div>
					<Button variant="outlined" onClick={this.handleClose}>
						<CloseRoundedIcon/>
					</Button>
				</div>
				<div onFocus={(e)=>{this.setState({...this.state, titleFocused:true});}} style={{...style.title, display:'flex', boxShadow: this.state.titleFocused?'0px 0px 2px 1px rgba(60,221,232,1)': ""}}>
					<CreateIcon />
					<Textarea 
					onBlur={this.handleTitleBlur} 
					onKeyUp={this.handleTitleKeyUp} 
					value={this.state.title} 
					onChange={this.handleTitleChange} 
					style={style.textArea}/>
				</div>
				<div style={style.taskDates}>

				</div>
				<div onFocus={(e)=>{this.setState({...this.state, descFocused:true});}} style={{...style.description, display:'flex', boxShadow: this.state.descFocused?'0px 0px 2px 1px rgba(60,221,232,1)': ""}}>
					<ListRoundedIcon />
					<Textarea 
					onBlur={this.handleDescBlur} 
					onKeyUp={this.handleDescKeyUp} 
					value={this.state.description} 
					onChange={this.handleDescChange} 
					style={style.textArea}/>
				</div>
				<div style={style.comment}>

				</div>
				<div style={style.activity}>

				</div>
			</div>
		);
	}
}
const mapStateToProps=(state)=>{
	return {
		ui: state.ui,
		columns:state.columns
	}
}
export default connect(mapStateToProps)(TaskModelCard);