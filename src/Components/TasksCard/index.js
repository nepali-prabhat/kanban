import React from 'react'
import Textarea from 'react-textarea-autosize';
import { connect } from 'react-redux';
import { renameTask } from '../../actions/column';
import { setTaskModel, openModel } from '../../actions/ui';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

class TasksCard extends React.Component {
	state = { formMode: false, value: "", mouseOver: false }

	componentDidMount = () => {
		this.setState({ ...this.state, value: this.props.title });
	}

	handleKeyUp = (e) => {
		if (e.key === "Enter") {
			//fire update action
			this.props.dispatch(renameTask({ kanbanId: this.props.kanbanId, columnId: this.props.columnId, taskId: this.props.id, title: this.state.value }));
			this.formClose();
			return;
		}
		if (e.key === "Escape") {
			//
			this.formClose();
			return;
		}
	}
	formOpen = () => {
		this.setState({ ...this.state, value: this.props.title, formMode: true });
	}
	formClose = () => {
		this.setState({ ...this.state, formMode: false });
	}
	handleOnChange = (e) => {
		this.setState({ ...this.state, value: e.target.value });
	}
	handleBlur = (e) => {
		this.formClose();
	}
	formRender = () => {
		return (
			<div style={style.form}>
				<Textarea onBlur={this.handleBlur} onKeyUp={this.handleKeyUp} autoFocus value={this.state.value} onChange={this.handleOnChange} style={style.textArea} />
			</div>
		);
	}
	handleEditClick = (e) => {
		const {kanbanId, columnId, id } = this.props;
		this.props.dispatch(setTaskModel({taskId:id, kanbanId:kanbanId, columnId:columnId, openTaskModel:true}));
	}
	render() {
		const { title, kanbanId, columnId, id, isDragging } = this.props;
		return (

			<div onClick={this.formOpen} 
			onMouseEnter={(e) => { this.setState({ ...this.state, mouseOver: true }) }} 
			onMouseLeave={(e) => { this.setState({ ...this.state, mouseOver: false }) }} 
			style={{ ...style.task, border: isDragging ? '1px dashed #3EC3BB' : 'none', background: isDragging ? '#e2fff1' : 'rgba(255,255,255,1)' }} 
			className='column-task'>
				{this.state.formMode ?
					this.formRender()
					:
					title
				}
				{
					this.state.mouseOver ?
						<div>
							<div onClick={this.handleEditClick} style={{ position: 'absolute', right: '5px', top: '5px', color: 'rgba(0,0,0,0.65), height:"50px", width:"50px"' }}>
								<CreateIcon fontSize='small' />
							</div>
							{/* <div onClick={this.handleEditClick} style={{ position: 'absolute', right: '5px', top: '20px', color: 'rgba(0,0,0,0.65), height:"50px", width:"50px"' }}>
								<DeleteIcon fontSize='small' />
							</div> */}
						</div>
						:
						<div></div>
				}
			</div>
		);
	}
}
const style = {
	task: {
		position: 'relative',
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
	form: {
		boxShadow: '0px 0px 2px 1px rgba(60,221,232,1)',
		borderRadius: '0px 0px 3px 3px ',
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
const mapStateToProps = (state) => {
	return {
		ui: state.ui,
	}
}
export default connect(mapStateToProps)(TasksCard);