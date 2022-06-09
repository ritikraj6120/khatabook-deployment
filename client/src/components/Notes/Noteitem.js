import React, { useContext } from 'react'
import noteContext from "../../context/noteContext"
import StarPurple500OutlinedIcon from '@mui/icons-material/StarPurple500Outlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import { IconButton } from '@mui/material';
import soundfile from '../../music/completed.wav';
import './style.css'
const Noteitem = (props) => {

	const { note, updateNote } = props;
	const context = useContext(noteContext);
	const { deleteNote, editNote } = context;

	const handleimportant = () => {
		console.log(!note.important);
		editNote(note._id, null, null, null, !note.important, null);
	}
	const handleCompleted = () => {
		console.log(!note.completed);
		if (!note.completed) {
			const audio = new Audio(soundfile);
			audio.play();
		}
		editNote(note._id, null, null, null, null, !note.completed);
	}
	return (
		<div className="col-md-3">
			<div className="card my-3 cardbody">
				<div className="card-body ">
					<div className="d-flex align-items-center">

						{/* <i className="far fa-trash-alt mx-2" onClick={() => { deleteNote(note._id); showAlert("Deleted successfully", "success"); }} ></i> */}
						<Tooltip className='mx-2' title="Delete note" placement="top" arrow style={{ cursor: " pointer" }}>
							<DeleteIcon onClick={() => { deleteNote(note._id); }} />
						</Tooltip>
						<i className="far fa-edit mx-1" onClick={() => { updateNote(note); }} ></i>

						{/* <i className="far fa-calendar-alt mx-2"></i> */}

						{
							note.completed ?

								<Tooltip sx={{ mx: 2 }} title="Mark as Not Completed" placement="top" arrow><CheckCircleIcon style={{ cursor: "pointer", color: "#3e69e4" }} onClick={handleCompleted} /></Tooltip>
								:
								<Tooltip sx={{ mx: 2 }} title="Mark as Completed" placement="top" arrow><CircleOutlinedIcon style={{ cursor: "pointer", color: "#3e69e4" }} onClick={handleCompleted} /></Tooltip>

						}
						
						{
							note.important ? <Tooltip title="Remove Importance" placement="top" arrow><StarPurple500OutlinedIcon style={{ cursor: "pointer", color: "#3e69e4" }} onClick={handleimportant} />
							</Tooltip>
								:
								<Tooltip title="Mark task as Important" placement="top" arrow><StarOutlineOutlinedIcon style={{ cursor: "pointer" }} onClick={handleimportant} />
								</Tooltip>
						}
					</div>
					<hr />
					<h5 className="card-title">{note.title}</h5>
					<hr />
					<p className="card-text">{note.description}</p>
					<hr />
					<i><small>{note.tag}</small></i>

				</div>
			</div>
		</div>
	)
}

export default Noteitem
