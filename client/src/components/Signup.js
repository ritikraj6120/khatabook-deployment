
import React from "react";
import {Link,useHistory} from "react-router-dom"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux'
import { signup } from '../actions/userAction.js';
function Copyright(props) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{'Copyright © '}
			Ritik Raj
			{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const theme = createTheme();

export default function SignUp() {
	let history = useHistory()
	const dispatch = useDispatch()
	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const user = {
			fname: data.get("firstName"),
			lname: data.get("lastName"),
			email: data.get("email"),
			password: data.get("password")
		};
		dispatch(signup(user, history));
	}

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									name="firstName"
									required
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
									autoComplete="off"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="off"
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="off"
								/>
							</Grid>

							{/* <Grid item xs={12}>
								<PhoneInput
									// fullWidth
									required
									international
									defaultCountry="IN"
									placeholder="Phone Number"
									className="form-control"
									name="phone"
									autoComplete="off"
									id="phone" value={phone} onChange={setPhone} />

							</Grid> */}

							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="off" inputProps={{ minLength: 8 }}
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link to="/login" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 5 }} />
			</Container>
		</ThemeProvider>
	);
}