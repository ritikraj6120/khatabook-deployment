import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleLogout, getUserDetails, changePassword } from '../actions/userAction'
import { useHistory } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';
import { TextField, Divider, Paper } from '@mui/material';
import { notifyWarning } from '../alert';
import Alert from '@mui/material/Alert';
const User = () => {
	let history = useHistory();
	const dispatch = useDispatch();
	const userLoginState = useSelector(state => state.userLogin.userInfo)
	const UserDetailState = useSelector(state => state.userDetails)
	const UserDetail = UserDetailState.user
	let UpdateProfileSuccess = useSelector(state => state.userUpdateProfile.success)
	const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" })

	useEffect(() => {
		if (userLoginState !== null)
			dispatch(getUserDetails())
		else {
			dispatch(handleLogout(history));
		}
	}, [userLoginState])

	useEffect(() => {
		if (UpdateProfileSuccess === true) {
			setPasswords({ currentPassword: "", newPassword: "" })
		}
	}, [UpdateProfileSuccess])

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const user = {
			currentPassword: data.get('currentPassword'),
			newPassword: data.get('newPassword'),
		};
		if (user.currentPassword === user.newPassword) {
			notifyWarning("New Password is same as Old Password");
			return;
		}
		dispatch(changePassword(user));
	};
	// function alertFunc() {
	// 	console.log("magic")
	// 	console.log(customers)
	// 	console.log("happens")
	// }

	// const handledummy = (e) => {
	// 	e.preventDefault();
	// 	console.log("you clicked");
	// 	dispatch(addCustomer(history, 'mr', 'manish kumar', '+91634333244485023'));
	// 	// setTimeout(alertFunc, 5000);

	// }
	return (
		<>
			{
				UserDetailState.loading ?
					<CircularProgress />
					:
					UserDetailState.error !== null ?
						<Alert severity="error">{UserDetailState.error}</Alert> :
						< Box sx={{ minWidth: 275 }}>
							<Card variant="outlined">
								<CardContent>
									<Typography color="text.secondary">
										Name
									</Typography>
									<Typography variant="h5" component="div">
										{UserDetail.fname + " " + UserDetail.lname}
									</Typography>
									<Typography color="text.secondary">
										Email
									</Typography>
									<Typography variant="body2">
										{UserDetail.email}
									</Typography>
									<Typography color="text.secondary">
										Created account on
									</Typography>
									<Typography variant="body2">
										{new Date(UserDetail.date).toLocaleString()} I.S.T
									</Typography>
								</CardContent>
							</Card>
						</Box>
			}
			<div className="container">
				<Paper elevation={3} sx={{
					width: "35vw", borderRadius: "10px"
				}}>
					<Box component="form" onSubmit={handleSubmit}
						sx={{
							marginTop: 8,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							width: "35vw"
						}} autoComplete="off" >
						<Typography variant="h5" component="div" sx={{ marginTop: 1 }}>
							Change Password
						</Typography>
						<TextField
							required
							label="Current Password"
							id="Current Password"
							variant="outlined"
							name="currentPassword"
							type="text"
							inputProps={{ minLength: 8 }}
							sx={{ width: "25vw", marginTop: 3 }}
							value={passwords.currentPassword}
							onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
						/>
						<Divider />
						<TextField
							required
							label="New Password"
							id="New Password"
							variant="outlined"
							name="newPassword"
							type="text"
							margin="dense"
							inputProps={{ minLength: 8 }}
							sx={{ width: "25vw" }}
							value={passwords.newPassword}
							onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
						/>

						<Button
							type="submit"
							variant="contained"
							sx={{ mt: 3, mb: 1 }}
							endIcon={<SendIcon />}
						>
							Update
						</Button>

					</Box>
				</Paper>
				{/* <Box>
					<Typography> adding customer</Typography>
					<Button type="submit" variant="contained" onClick={handledummy}>Submit</Button>
				</Box> */}
			</div>
		</>
	)
}
export default User;