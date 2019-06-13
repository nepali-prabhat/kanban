import React from 'react';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
// import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutlined';
// import CancelOutlineIcon from '@material-ui/icons/CancelOutlined';
import Textarea from 'react-textarea-autosize';
import {connect} from 'react-redux';
import { addList } from '../../actions/tasks';
import {addColumn} from '../../actions/column';

const style= {
	add:{
		padding: '5px',
		background: "#fff",
		border: '1px solid transparent',
		boxShadow: '0 -1px 3px 0 rgba(21,27,38,.15)',
		transition: 'color 200ms',  
		cursor: 'pointer',
		borderRadius: '0px 0px 3px 3px ',
		textAlign: 'center',
		minWidth: '260px',
		height: '40px',
	},
	form:{
		padding: '5px',
		background: "#fff",
		border: '1px solid transparent',
		boxShadow: '0px 0px 2px 1px rgba(60,221,232,1)',
		borderRadius: '0px 0px 3px 3px ',
		minWidth: '260px',
		display: 'flex',
		maxHeight: '100px',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	textArea:{
		resize:'none',
		width: '100%',
		outline:'none',
		maxHeight: '80px',
		border: 'none',
		fontFamily: 'Muli',
		padding: '5px',
		wordSpacing: '5px',
	}
}
class Add extends React.Component{
	state={formMode:false, value:""}
	componentDidUpdate = ()=>{
		if(this.state.formMode){		
			if(this.props.type==="task"){
				const element = this.props.scrollRef.current;
				element.scrollTop = element.scrollHeight;
			}
		}
	}
	toggleFormMode = ()=>{
		this.setState({...this.state, formMode:!this.state.formMode, value: ""});
	}
	handleValueChange=(e)=>{
		this.setState({...this.state, value: e.target.value});
		
		if(this.props.type==="task"){
			const element = this.props.scrollRef.current;
			element.scrollTop = element.scrollHeight;
		}
	}
	handleCheckClick=(e)=>{
		//dispatch add task if this.state.value != ""
		const value = this.state.value.trim();
		if(value.length>0 && this.props.type==="task"){
			const {kanbanId, columnId} = this.props;
			this.props.dispatch(addList({title:this.state.value, description:"", kanbanId: kanbanId, columnId:columnId}));
			this.setState({...this.state, value: ""});
		}	
		if(value.length>=0 && this.props.type==="column"){
			this.props.dispatch(addColumn({title:value, kanbanId:this.props.kanbanId}));
			this.setState({...this.state, value: ""});
		}

	}
	handleCancelClick=(e)=>{
		this.toggleFormMode();
	}
	handleBlur=(e)=>{
		e.preventDefault();
		this.toggleFormMode();
	}
	handleKeyUp=(e)=>{
		if(e.key === "Enter"){
			this.handleCheckClick();
			return;
		}
		if(e.key === "Escape"){
			this.handleCancelClick();
			return;
		}
	}
	render(){	
		const formMode = this.state.formMode;
		return (
			formMode?
			<div style={{...style.form, margin: this.state.formMode? '0 0 2px 0':'0 0 1px 0'}}>
				<div style={{flex:1}}>
					<Textarea onBlur={this.handleBlur} placeholder={this.props.placeholder} onKeyUp={this.handleKeyUp} autoFocus value={this.state.value} onChange={this.handleValueChange} style={style.textArea}/>
				</div>
				<div style={style.formButton}>
					{/* <span style={{color:'green'}}><CheckCircleOutlineIcon/></span>
					<span style={{color:'red'}}><CancelOutlineIcon/></span> */}
				</div>
			</div>
			:
			<div className="add-task" style={style.add} onClick={this.toggleFormMode}>
				<AddRoundedIcon />
			</div>
		);
	}
}

export default connect()(Add);