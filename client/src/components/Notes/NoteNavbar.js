import React from 'react'
import { Link, useLocation } from "react-router-dom";

const NoteNavbar = () => {
	let location = useLocation();
	return (
		<nav className="navbar navbar-expand-lg   navbar-dark bg-primary" style={{ color: "#ffffff" }}>
			<div className="container-fluid">
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link className={`nav-link pb-0 ${location.pathname === '/notes' ? "active border-bottom border-white border-5" : ""}`} to="/notes">All Notes</Link>
						</li>
						<li className="nav-item">
							<Link className={`nav-link pb-0 ${location.pathname === '/importantNotes' ? "active border-bottom border-white border-5" : ""}`} to="/importantNotes">Important</Link>
						</li>
						<li className="nav-item">
							<Link className={`nav-link pb-0 ${location.pathname === '/completedNotes' ? "active border-bottom border-white border-5" : ""}`} to="/completedNotes">Completed</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default NoteNavbar
