import React, { useEffect } from 'react'
import CustomerItem from './CustomerItem';
import { useHistory } from 'react-router-dom'
// import {Spinner} from '../../Spinner'
import { useDispatch, useSelector } from 'react-redux';
import { getCustomers, getCustomerBalance } from '../../../actions/customerAction';
import { handleLogout } from '../../../actions/userAction'
import '../style.css'
import { Button, Card, CardContent, Divider, Box, Typography, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import generatePDF from './customerReport';
// import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CircularProgress from '@mui/material/CircularProgress';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
const theme = createTheme({
	palette: {
		primary: {
			main: '#A10C50'
		}
	},
});



const Customers = () => {
	let history = useHistory();
	const dispatch = useDispatch();
	const userLoginState = useSelector(state => state.userLogin)
	const userLoginInfo = userLoginState.userInfo
	const customersState = useSelector(state => state.getCustomers)
	const customerBalanceState = useSelector(state => state.getCustomerBalance)
	const { customerBalance } = customerBalanceState;
	const { customers } = customersState
	useEffect(() => {
		if (userLoginInfo !== null) {
			dispatch(getCustomers());
			dispatch(getCustomerBalance());
		}
		else {
			dispatch(handleLogout(history));
		}
	}, [userLoginInfo])
	let TotalAmounttoget = 0;
	let TotalAmounttogive = 0;
	let netBalance = 0;
	if (customerBalanceState.loading === false && customerBalanceState.error === null) {
		for (let i = 0; i < customerBalance.length; i++) {
			let x = customerBalance[i].amounttoget - customerBalance[i].amounttogive;
			netBalance += x;
			if (x >= 0) {
				TotalAmounttoget += x;
			}
			else {
				TotalAmounttogive += (-x);
			}
		}
	}

	function handleClick(e) {
		history.push('/addcustomer');
	}
	// const comps = [1, 2, 3, 4];// 1 for most recent 2 for oldest
	// function compare(a, b,choice) {
	// 	if(choice===1)
	// 	return new Date(b.date) - new Date(a.date);
	// 	else if(choice===2){
	// 		return new Date(a.date) - new Date(b.date);
	// 	}
	// }
	return (
		<>
			{
				(customerBalanceState.loading === false && customersState.loading === false && customerBalanceState.error === null && customersState.error === null) ?
					<>
						<Grid container sx={{ marginTop: "1vw" }}  >

							<Grid item xs={9} sx={{ overflowY: "auto", maxHeight: "90vh", backgroundColor: "#fbf7f8" }}>
								<Box sx={{ height: "10vh", margin: "0px 14px", marginTop: "16px", marginBottom: "8px", display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }} >
									<Box sx={{ display: 'flex', flexDirection: "row", marginLeft: "8px" }}>
										<Typography variant="body1" sx={{ fontSize: "16px", fontWeight: "500" }}>
											Customers
										</Typography>
										<Typography variant="body1" sx={{ fontSize: "16px", fontWeight: "400" }}>
											({customers.length})
										</Typography>
									</Box>
									<ThemeProvider theme={theme}>
										<Button variant="contained" size="small" sx={{ backgroundColor: "#A10C50" }} startIcon={<PersonAddAltIcon />} onClick={handleClick}>
											Add Customer
										</Button>
									</ThemeProvider>
								</Box>
								<Box sx={{ display: 'flex', flexDirection: 'column', margin: "0px 14px", marginBottom: "2vh" }}>
									{customers.map((customer) => {
										return <CustomerItem key={customer._id} customer={customer} customerBalance={customerBalance} />
									})}
								</Box>
							</Grid>


							<Grid item xs={3}>
								<Card variant="outlined" sx={{ textAlign: 'center', maxHeight: "60vh", overflowY: "auto" }}>

									<AccountBalanceWalletIcon sx={{ bgcolor: "#f2f1c4", color: "#ecac38f5", width: "4rem", height: "4rem", marginBottom: "16px", marginTop: "2vw", borderRadius: "4rem" }} />
									<CardContent sx={{ padding: 0, paddingBottom: 0 }}>
										<Typography variant="h6" sx={{ fontSize: 20 }}>
											Net Balance
										</Typography>
										<Box sx={{ mb: "2rem" }}>
											<Typography sx={{ fontSize: 24, fontWeight: "bold", color: `${netBalance >= 0 ? "#C82128" : "#0F814D"}` }}>
												<CurrencyRupeeIcon sx={{ fontSize: 24, fontWeight: "bold" }} />
												{Math.abs(netBalance)}
											</Typography>
											<Typography color="text.secondary" gutterBottom variant="body1" sx={{ display: 'inline' }}>
												{netBalance >= 0 ? "You'll Get" : "You'll Give"}
											</Typography>
										</Box>
										<Divider />
										<Box
											sx={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'space-evenly',
												// width: 'fit-content',
												borderBottom: (theme) => `10px solid rgb(0 0 0 / -1.88)`,
												borderRadius: 1,
												// bgcolor: 'yellow',
												color: 'text.secondary',
												'& hr': {
													mx: 0.5,
													// width:"50px",
													// height:"35px"
												},
											}}
										>
											<Box sx={{ marginBottom: "1vh" }}>
												<Typography color="text.secondary" variant="body1" sx={{ display: 'inline' }}>
													You'll Get
												</Typography>
												<Typography sx={{ fontSize: 20, fontWeight: "bold", color: "#C82128" }}>
													<CurrencyRupeeIcon sx={{ fontSize: 20 }} />
													{TotalAmounttoget}
												</Typography>
											</Box>
											<Divider orientation="vertical" variant="middle" />
											<Box>
												<Typography color="text.secondary" variant="body1" sx={{ display: 'inline' }}>
													You'll Give
												</Typography>
												<Typography sx={{ fontSize: 20, fontWeight: "bold", color: "#0F814D" }}>
													<CurrencyRupeeIcon sx={{ fontSize: 20 }} />
													{TotalAmounttogive}
												</Typography>
											</Box>
										</Box>
										<Button variant="contained" size="small" onClick={() => generatePDF(customers, customerBalance)}>
											Download Report
										</Button>
									</CardContent>
								</Card>
							</Grid>
						</Grid>

						{/* <div className="card mt-5" style={{ width: "18rem" }}>
							<div className="card-body">
								<h5 className="card-title">You will get </h5>
								<p className="card-text">Rs {TotalAmounttoget}</p>
								<h5 className="card-title">You will give </h5>
								<p className="card-text">Rs {TotalAmounttogive}</p>
								<Button variant="contained" onClick={() => generatePDF(customers, customerBalance)}>
									Download Report
								</Button>
							</div>
						</div> */}

						{/* <div className=" my-3">
									<br />
									<div className="container mx-2 h3">
										{customers !== null && customers.length === 0 && 'No Customers'}
									</div>
									<div className="d-flex justify-content-center">
										<div className='d-grid gap-2 col-6 '>
											{customers.map((customer) => {
												return <CustomerItem key={customer._id} customer={customer} customerBalance={customerBalance} />
											})}
										</div>
									</div>
								</div> */}
					</> : <CircularProgress />
			}
			{/* <Link to="/addcustomer">
				<button type="button" className="btn  sticky-btn">
					<PersonAddRoundedIcon style={{ color: "white" }} />
				</button>
			</Link> */}
			{/* <Card variant="outlined" sx={{ textAlign: 'center', maxHeight: "60vh", overflowY: "auto" }}>
							<AccountBalanceWalletIcon sx={{ bgcolor: "#186fd9", width: 107, height: 107, marginLeft: "8vw", fontSize: 32, fontWeight: "bold", marginBottom: "16px", marginTop: "2vw" }} />


							<CardContent sx={{ paddingTop: 0 }}>
								<Typography variant="h6" sx={{ fontSize: 20, mb: 1 }}>
									Net Balance
								</Typography>
								{
									NetBalance >= 0 ? x > 0 ?
									<>
										<Box>
											<Typography sx={{ fontSize: 20, fontWeight: "bold", color: "#C82128" }}>
												<CurrencyRupeeIcon sx={{ fontSize: 20 }} />
												{NetBalance}
											</Typography>
											<Typography color="text.secondary" gutterBottom variant="body1" sx={{ display: 'inline' }}>
												You will get
											</Typography>
										</Box>
										:
										<Box>
											<Typography sx={{ fontSize: 20, fontWeight: "bold", color: "#0F814D" }}>
												<CurrencyRupeeIcon sx={{ fontSize: 20 }} />
												{NetBalance}
											</Typography>
											<Typography color="text.secondary" gutterBottom variant="body1" sx={{ display: 'inline' }}>
												You'll Give
											</Typography>
										</Box>
									</>
								}
								<Divider />
								<Typography sx={{ mb: 3, mt: 3 }}>
									<LocalPhoneOutlinedIcon sx={{ color: "red", mr: "5%" }} />
									{singleCustomer.phone}
								</Typography>
								<Box sx={{ mb: 3 }} >
									<Button size="small" style={{ backgroundColor: "#C82128", marginRight: "0.75rem" }} variant="contained" onClick={youGaveAddPage}>You Gave <CurrencyRupeeIcon sx={{ fontSize: "1.10rem" }} /></Button>

									<Button size="small" style={{ backgroundColor: "#0F814D", marginRight: "0.75rem" }} variant="contained" onClick={youGetAddPage}>You Got <CurrencyRupeeIcon sx={{ fontSize: "1.10rem" }} /></Button>
								</Box>
								<Divider />
							</CardContent>
							 <CardActions> 
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-evenly',
									// width: 'fit-content',
									borderBottom: (theme) => `10px solid rgb(0 0 0 / -1.88)`,
									borderRadius: 1,
									// bgcolor: 'yellow',
									color: 'text.secondary',
									'& hr': {
										mx: 0.5,
										// width:"50px",
										// height:"35px"
									},
								}}
							>
								<Link className="nav-link " to="/singleCustomerReport">
									<PictureAsPdfOutlinedIcon fontSize='100' />
									<Typography>
										Reports
									</Typography>
								</Link>


								<Divider orientation="vertical" variant="middle" />
								{
									x > 0 ?
										<Link className="nav-link" to={{ pathname: `https://api.whatsapp.com/send?phone=${singleCustomer.phone}&text=Dear Sir/Madam, your payment of Rs ${Math.abs(x)} is still pending. Please make payment as soon as possible.` }} target="_blank"><WhatsappOutlinedIcon fontSize='100' /><Typography> Reminder</Typography></Link> :
										<Box sx={{ color: "#9e9e9e" }}>
											<PictureAsPdfOutlinedIcon fontSize='100' />
											<Typography>
												Reports
											</Typography>
										</Box>
								}
								<Divider orientation="vertical" variant="middle" />
								{/* <Link to="/" className="nav-link" style={true ? { pointerEvents: "none" } : null}>Test</Link> */}
			{/* <Typography variant="body1">hello</Typography> */}
			{/* </Box> */}
			{/* </CardActions> */}
			{/* </Card >  */}

		</>
	)
}

export default Customers


