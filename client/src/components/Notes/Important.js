import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import noteContext from "../../context/noteContext"
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import NoteNavbar from './NoteNavbar';
import { notifyWarning, notifySuccess } from '../../alert';
const Notes = () => {

	const context = useContext(noteContext);
	let history = useHistory();
	const { notes, getNotes, editNote } = context;
	useEffect(() => {
		if (localStorage.getItem('token'))
			getNotes()
		else {
			history.push('/login');
		}
	}, [])
	const ref = useRef(null)
	const refClose = useRef(null)
	const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
	const importantNotes = notes.filter((note) => note.important === true);

	const updateNote = (currentNote) => {
		ref.current.click();
		setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })

	}

	const handleClick = (e) => {
		if (note.etitle.length < 1) {
			refClose.current.click();
			notifyWarning("Title length less than 1");
		}
		else if (note.edescription.length < 5) {
			refClose.current.click();
			notifyWarning("Description length less than 5");
		}
		else {
			editNote(note.id, note.etitle, note.edescription, note.etag)
			refClose.current.click();
			notifySuccess("Updated Succcessfully")
		}
	}

	const onChange = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value })
	}

	return (
		<div className="container">
		<br/>
			<NoteNavbar />
			<AddNote />
			<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
				Launch demo modal
			</button>


			<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<form className="my-3"  >
								<div className="mb-3">
									<label htmlFor="title" className="form-label">Title</label>
									<input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
								</div>
								<div className="mb-3">
									<label htmlFor="description" className="form-label">Description</label>
									<input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
								</div>
								<div className="mb-3">
									<label htmlFor="tag" className="form-label">Tag</label>
									<select className="form-select" id="etag" name="etag" value={note.etag} onChange={onChange} >
										<option value="Personal">Personal</option>
										<option value="Work">Work</option>
										<option value="Customer">Customer</option>
										<option value="Supplier">Supplier</option>
										<option value="Staff">Staff</option>
										<option value="Others">Others</option>
									</select>
								</div>

							</form>
						</div>
						<div className="modal-footer">
							<button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							<button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
						</div>
					</div>
				</div>
			</div>

			<div className="row my-3">
				<h2>You Notes</h2>
				<div className="container mx-2">
					{importantNotes.length === 0 && 'No notes to display'}
				</div>
				{
					importantNotes.map((note) => {
						return <Noteitem key={note._id} updateNote={updateNote} note={note} />
					})}
			</div>
		</div>
	)
}

export default Notes

