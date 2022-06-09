import React from 'react'
import { Link } from 'react-router-dom';
const UserNavbar = () => {
	return (
		<Link to="/userdetail">
			<span style={{ color: "white", fontSize: "1.5rem" }} >
				<i className="far fa-user mx-4"></i>
			</span>
		</Link>
	)
}

export default UserNavbar;
