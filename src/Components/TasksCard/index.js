import React from 'react'
import Textarea from 'react-textarea-autosize';
import {connect} from 'react-redux';
import { renameTask } from '../../actions/column';

class TasksCard extends React.Component {
	state = {formMode:false, value:""}

	componentDidMount=()=>{
		this.setState({...this.state, value:this.props.title});
	}

	handleKeyUp=(e)=>{
		if(e.key === "Enter"){
			//fire update action
			this.props.dispatch(renameTask({kanbanId:this.props.kanbanId,columnId:this.props.columnId,taskId:this.props.id,title:this.state.value}));
			this.formClose();
			return;
		}
		if(e.key === "Escape"){
			//
			this.formClose();
			return;
		}
	}
	formOpen=()=>{
		this.setState({...this.state, formMode:true});
	}
	formClose=()=>{
		this.setState({...this.state, value:this.props.title, formMode:false});
	}
	handleOnChange=(e)=>{
		this.setState({...this.state, value: e.target.value});
	}
	handleBlur=(e)=>{
		this.formClose();
	}
	formRender=()=>{
		return (
			<div style={style.form}>
				<Textarea onBlur={this.handleBlur} onKeyUp={this.handleKeyUp} autoFocus value={this.state.value} onChange={this.handleOnChange} style={style.textArea}/>
			</div>
		);
	}
	
	render() {
		const { title, isDragging } = this.props;
		return (

			<div onClick={this.formOpen} style={{ ...style.task, border: isDragging ? '1px dashed #3EC3BB' : 'none', background: isDragging ? '#C6FEFA' : 'rgba(255,255,255,1)' }} className='column-task'>
				{this.state.formMode?
					this.formRender()
					:
					title
				}
			</div>
		);
	}
}
const style = {
	task: {
		padding: '15px',
		boxShadow: '0 1px 3px 0 rgba(21,27,38,.15)',
		transition: 'box-shadow 100ms,transform 100ms,background-color 100ms,border-color 100ms',
		cursor: 'pointer',
		borderRadius: '3px',
		fontFamily: 'Muli',
		fontSize: '15px',
		width: '274px',
		wordWrap: 'break-word'
	},
	form:{
		boxShadow: '0px 0px 2px 1px rgba(60,221,232,1)',
		borderRadius: '0px 0px 3px 3px ',
	},
	textArea:{
		resize:'none',
		outline:'none',
		border: 'none',
		fontFamily: 'Muli',
		padding: '5px',
		width:'100%',
	}
}
export default connect()(TasksCard);