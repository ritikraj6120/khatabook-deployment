import UserContext from "./UserContext";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { notifyError, notifySuccess, notifyUnAuthorized, notifyWarning } from '../alert';
import { withRouter } from 'react-router-dom'
const UserState = (props) => {
	let history = useHistory();
	const host = "https://khatabook-app.herokuapp.com"
	const UserInitial = {};
	const [UserDetail, setUserDetail] = useState(UserInitial)
	const [userloggedin, setUserloggedin] = useState(false);

	const signup = async (user) => {
		const response = await fetch(`${host}/api/auth/signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		});
		const json = await response.json()
		// console.log(json);
		if (json.isAuthenticated) {
			// Save the auth token and redirect
			notifySuccess("Account Created Successfully")
			history.push("/login");
		}
		else {
			let x = json.error;
			x = x[0];
			notifyError(x.msg);
		}
	}

	const login = async (user) => {
		const response = await fetch(`${host}/api/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		});
		const json = await response.json()
		if (json.success) {
			// Save the auth token and redirect
			localStorage.setItem('token', json.authtoken);
			setUserloggedin(true);
			notifySuccess("Successfully logged in")
			history.push("/customers");
		}
		else {
			notifyError(json.error);
		}
	}

	const handleLogout = () => {
		localStorage.clear();
		setUserloggedin(false);
		history.push('/login')
	}
	// Get User details
	const getUser = async () => {
		// API Call 
		const response = await fetch(`${host}/api/user/fetchuserdetails`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			}
		});
		const json = await response.json()
		setUserDetail(json[0])
	}

	const changePassword = async (user) => {
		const response = await fetch(`${host}/api/auth/changepassword`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			},
			body: JSON.stringify(user)
		});
		// const response = { status: 200 };
		if (response.status === 200) {
			notifySuccess("successfully Updated Password");
			return response.status;
		}
		else if (response.status === 400) {
			notifyWarning("Current Password not correctly entered");
		}
		else if (response.status === 401) {
			notifyUnAuthorized("Not Authorized");
			localStorage.clear();
			// setTimeout(function () { history.push('/login') }, 1000);
			history.push('/login')
		}
		else {
			notifyError("Some Error happenend");
		}
	}



	return (
		<UserContext.Provider value={{ UserDetail, getUser, signup, login, changePassword, userloggedin, handleLogout }}>
			{props.children}
		</UserContext.Provider>
	)

}
export default withRouter(UserState);