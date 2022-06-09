import React from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar, Button, Divider, Box, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
const theme = createTheme({
	palette: {
		primary: {
			main: '#fcfcfc'
		}
	},
});

const CustomerItem = (props) => {
	let history = useHistory();
	const { customer, customerBalance } = props;
	const { name } = customer;
	const result = customerBalance.filter(item => item.customer === customer._id);
	let x = 0
	if (result[0])
		x = result[0].amounttoget - result[0].amounttogive;
	const edit = () => {
		localStorage.setItem("SingleCustomerId", customer._id);
		history.push('/singlecustomer');
	}
	const stringAvatar = (name) => {
		let text;
		if (name.split(' ').length > 1)
			text = text = `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`;
		else
			text = text = `${name.split(' ')[0][0]}`;
		return text.toUpperCase();
	}

	return (
		<>
			<ThemeProvider theme={theme}>
				<Button variant="contained" disableRipple sx={{
					backGroundcolor: "white", width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: "16px 24px", '&:hover': {
						boxShadow: "6px 6px 10px 5px rgb(0 0 0 / 20%), -3px -2px 18px 3px rgb(0 0 0 / 20%)", backgroundColor: "rgb(252, 252, 252)", zIndex: 3,
					}
				}} onClick={edit}>
					<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
						<Avatar sx={{ bgcolor: "#186fd9", width: 40, height: 40, marginLeft: "1vw", fontSize: 16 }}>
							{stringAvatar(name)}
						</Avatar>
						<Typography sx={{ marginLeft: "3vh", fontSize: 16, fontWeight: "500", textTransform: "none" }} variant="body1">{name}</Typography>
					</Box>
					<Box sx={{ display: 'flex', flexDirection: 'column' }}>
						<Typography sx={{ fontSize: 24, fontWeight: "bold", color: `${x >= 0 ? "#C82128" : "#0F814D"}` }}>
							<CurrencyRupeeIcon sx={{ fontSize: 24, fontWeight: "bold" }} />
							{Math.abs(x)}
						</Typography>
						<Typography variant="body1" sx={{ fontSize: 12, color: "#828584" }} >
							{x >= 0 ? x > 0 ? "You will get" : null : "You will give"}
						</Typography>
					</Box>
				</Button>
				{/* <Divider /> */}
			</ThemeProvider>
			{/* <button className="btn btn-outline-dark" onClick={edit}>
				<div className="d-flex bd-highlight">
					<Avatar sx={{ bgcolor: "#186fd9", width: 40, height: 40, marginLeft: "1vw", fontSize: 16 }}>
						{stringAvatar(name)}
					</Avatar>
					<div className="p-2  bd-highlight">{title}</div>
					<div className="p-2 bd-highlight">{name}</div>
					<div className="p-2 flex-grow-1 bd-highlight">Rs {Math.abs(x)}
						<br />
						{x >= 0 ? x > 0 ? <small>You will get </small> : null : <small>You will give</small>}
					</div>
				</div>
			</button> */}
		</>

	)
}

export default CustomerItem;
