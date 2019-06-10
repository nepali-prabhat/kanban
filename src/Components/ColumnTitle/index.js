import React, { Component } from 'react';
import {connect} from 'react-redux';
import Textarea from 'react-textarea-autosize';
import {renameColumn} from '../../actions/column';
const style={
	title: {
		fontFamily: 'Roboto',
		fontWeight: '700',
		fontSize: '20px',
		marginLeft: '5px',
		width: '250px',
		wordWrap: 'break-word'
	},
	form:{
		boxShadow: '0px 0px 2px 1px rgba(60,221,232,1)',
		borderRadius: '0px 0px 3px 3px ',
		padding:'5px 5px 0px 5px',
	},
	textArea:{
		resize:'none',
		outline:'none',
		border: 'none',
		fontFamily: 'Roboto',
		fontWeight: '700',
		fontSize: '20px',
		padding: '5px',
		width:'100%',
	}
}
class ColumnTitle extends Component{
	state = {formMode:false, value:""}
	componentDidMount=()=>{
		this.setState({...this.state, value:this.props.title});
	}

	handleKeyUp=(e)=>{
		if(e.key === "Enter"){
			//fire update action
			this.props.dispatch(renameColumn({kanbanId:this.props.kanbanId,columnId:this.props.columnId,title:this.state.value}));
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
		this.setState({...this.state, value:this.props.title, formMode:true});
	}
	formClose=()=>{
		this.setState({...this.state,formMode:false});
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
		const { title,handle} = this.props;
		return (
			<div className="column-title" >
					{this.state.formMode?
						this.formRender()
						:
						<div onClick={this.formOpen} style={style.title} {...handle}>
							{title}
						</div>
					}
				<div className="option">
					...
				</div>
			</div>
		);
	}
}
export default connect()(ColumnTitle);