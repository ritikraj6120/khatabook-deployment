import React, { useContext, useState } from 'react'
import noteContext from "../../context/noteContext"

const AddNote = () => {
	const context = useContext(noteContext);
	const { addNote } = context;

	const [note, setNote] = useState({ title: "", description: "", tag: "Personal" })

	const handleClick = (e) => {
		e.preventDefault();
		console.log(note.title, note.description, note.tag);
		addNote(note.title, note.description, note.tag);
		setNote({ title: "", description: "", tag: "" })
		// showAlert("Added Succcessfully","success")
	}

	const onChange = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value })
	}
	return (
		<div className="container my-3">
			<h2>Add a Note</h2>
			<form className="my-3" onSubmit={handleClick}>
				<div className="mb-3">
					<label htmlFor="title" className="form-label">Title</label>
					<input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={1} required />
				</div>
				<div className="mb-3">
					<label htmlFor="description" className="form-label">Description</label>
					<input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required />
				</div>
				<div className="mb-3">
					<label htmlFor="tag" className="form-label">Tag</label>
					{/* <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} required /> */}

					<select className="form-select" id="tag" name="tag" value={note.tag} onChange={onChange} >
						<option value="Personal">Personal</option>
						<option value="Work">Work</option>
						<option value="Customer">Customer</option>
						<option value="Supplier">Supplier</option>
						<option value="Staff">Staff</option>
						<option value="Others">Others</option>
					</select>

				</div>

				<button type="submit" className="btn btn-primary" >Add Note</button>
			</form>
		</div>
	)
}
export default AddNote
