import NoteContext from "./noteContext";
import { useDispatch  } from 'react-redux';
import { handleLogout } from '../actions/userAction'
import { useState } from "react";
import {useHistory}  from "react-router-dom"
import { notifySuccess, notifyError, notifyWarning, notifyUnAuthorized } from "../alert.js"
const NoteState = (props) => {
	let history = useHistory();
	const dispatch = useDispatch();
	// const host = "https://khatabook-app.herokuapp.com"
	const host = "https://khatabook-app6120.herokuapp.com"
	const notesInitial = []
	const [notes, setNotes] = useState(notesInitial)

	// Get all Notes
	const getNotes = async () => {
		// API Call 
		const response = await fetch(`${host}/api/notes/fetchallnotes`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			}
		});
		if (response.status === 401) {
			notifyUnAuthorized("Unauthorized User Access");
			dispatch(handleLogout(history));
		}
		else if (response.status === 200) {
			const json = await response.json()
			setNotes(json)
		}
		else {
			notifyError("Some Error happenend at Server side");
		}
	}

	// Add a Note
	const addNote = async (title, description, tag) => {
		const response = await fetch(`${host}/api/notes/addnote`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			},
			body: JSON.stringify({ title, description, tag })
		});
		if (response.status === 401) {
			notifyUnAuthorized("Unauthorized User Access");
			dispatch(handleLogout(history));
		}
		else if (response.status === 400) {
			notifyWarning("Invalid Details for Notes")
		}
		else if (response.status === 200) {
			notifySuccess("Note Added Succcessfully")
			const note = await response.json();
			setNotes(notes.concat(note));
		}
		else {
			notifyError("Some Error happenend at Server side");
		}
	}

	// Delete a Note
	const deleteNote = async (id) => {
		try {
			const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					"auth-token": localStorage.getItem('token')
				}
			});
			if (response.status === 401) {
				notifyUnAuthorized("Unauthorized User Access");
				dispatch(handleLogout(history));
			}
			else if (response.status === 404) {
				notifyWarning(" Note to be deleted Not Found");
			}
			else if (response.status === 200) {
				const newNotes = notes.filter((note) => { return note._id !== id })
				setNotes(newNotes)
				notifySuccess("Note Deleted successfully");
			}
			else {
				notifyError("Some Error happenend at Server side");
			}
		}
		catch (error) {
			notifyError("Some Error happenend at Server side");
		}


	}

	// Edit a Note
	const editNote = async (id, title, description, tag, important, completed) => {
		const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			},
			body: JSON.stringify({ title, description, tag, important, completed })
		});
		// const json = await response.json();
		if (response.status === 404) {
			notifyWarning(" Note Not Found");
		}
		else if (response.status === 401) {
			notifyUnAuthorized("Unauthorized User Access");
			dispatch(handleLogout(history));
		}
		else if (response.status === 200) {
			let newNotes = notes;
			// let newNotes = JSON.parse(JSON.stringify(notes))
			// Logic to edit in client
			for (let index = 0; index < newNotes.length; index++) {
				const element = newNotes[index];
				if (element._id === id) {
					if (title)
						newNotes[index].title = title;
					if (description)
						newNotes[index].description = description;
					if (tag)
						newNotes[index].tag = tag;
					if (important === true || important === false)
						newNotes[index].important = important;
					if (completed === true || completed === false)
						newNotes[index].completed = completed;
					break;
				}
			}
			setNotes(newNotes);
			if (important === null && completed === null)
				notifySuccess("Note Updated Succcessfully")
		}
		else {
			notifyError("Some Error happenend at Server side");
		}
	}

	return (
		<NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
			{props.children}
		</NoteContext.Provider>
	)

}
export default NoteState;