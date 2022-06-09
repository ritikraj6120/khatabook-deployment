// import React, { useReducer, useEffect } from 'react';
// import axios from 'axios';
// const initialState = {
// 	loading: true,
// 	error: '',
// 	post: {}
// }
// const reducer = (state, action) => {
// 	switch (action.type) {
// 		case 'FETCH_SUCCESS':
// 			return {
// 				loading: false,
// 				error: '',
// 				post: action.payload
// 			}
// 		case 'FETCH_ERROR':
// 			return {
// 				loading: false,
// 				error: 'Something Went wrong!',
// 				post: {}
// 			}
// 		default:
// 			return state
// 	}
// }

// function Datafetch() {
// 	const [state, dispatch] = useReducer(reducer, initialState);

// 	useEffect(() => {
// 		axios
// 			.get('https://jsonplaceholder.typicode.com/posts/1')
// 			.then(response => {
// 				dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
// 			})
// 			.catch(error => {
// 				dispatch({ type: 'FETCH_ERROR' })
// 			})
// 	}, [])

// 	return (
// 		<div>
// 			{state.loading ? 'Loading' : state.post.title}
// 			{state.error?state.error:null}
// 		</div>
// 	)
// }


// import Box from '@mui/material/Box';
// <Box sx={{ minWidth: 275 }}>
// <Card variant="outlined">
// 	<>
// 		<CardContent>
// 			<Typography color="text.secondary">
// 				Name
// 			</Typography>
// 			<Typography variant="h5" component="div">
// 				{UserDetail.fname + " " + UserDetail.lname}
// 			</Typography>
// 			<Typography color="text.secondary">
// 				Email
// 			</Typography>
// 			<Typography variant="body2">
// 				{UserDetail.email}
// 			</Typography>
// 			<Typography color="text.secondary">
// 				Created account on
// 			</Typography>
// 			<Typography variant="body2">
// 				{new Date(UserDetail.date).toLocaleString()} I.S.T
// 			</Typography>
// 		</CardContent>
// 		{/* <CardActions>
// 			<Button size="small" value={props._id} onClick={handleSubmit}>
// 				Delete User
// 			</Button>
// 		</CardActions> */}
// 	</>
// </Card>
// </Box>


// import React, { useState } from "react";
// import ReactDOM from "react-dom";
// import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
// import DateFnsUtils from "@date-io/date-fns";

// function App() {
//   const [open, setOpen] = useState(false);

//   return (
//     <MuiPickersUtilsProvider utils={DateFnsUtils}>
//       <button onClick={() => setOpen(isOpen => !isOpen)}>Open Picker</button>
//       <DatePicker open={open} />
//     </MuiPickersUtilsProvider>
//   );
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
const { jsPDF } = require("jspdf");
const doc = new jsPDF();
console.log(doc.getFontList())



import React, { useContext, useEffect } from 'react';
import CustomerContext from '../../../context/CustomerContext';
import { useHistory, Link } from 'react-router-dom';
import '../style.css';
import CustomerDetail from './CustomerDetail';
// import Navbar from '../Navbar';
import { Typography, Button, CircularProgress, Table, TableRow, TableHead, TableBody, TableCell, CardContent, Card } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));


const SingleCustomer = () => {
	let history = useHistory();
	const { SingleCustomerTransaction, getSingleCustomerTransactions, getSingleCustomerDetail, singleCustomerDetail, setSingleTransactionOfParticularCustomer } = useContext(CustomerContext);
	const { singleCustomer, loading } = singleCustomerDetail;
	const singlecustomerid = JSON.parse(localStorage.getItem('SingleCustomerId'));


	useEffect(() => {
		getSingleCustomerTransactions(singlecustomerid);
		getSingleCustomerDetail(singlecustomerid);
		// eslint-disable-next-line
	}, [])


	const handleEditSupplier = async (item) => {
		console.log(item._id);
		await setSingleTransactionOfParticularCustomer({ ...item })
		if (item.lendamount_singleCustomer > 0) {

			history.push('/editcustomertransactionforgaveamount', {
				transactionid: item._id, name: singleCustomer.name, ...item
			});

		}
		else {
			history.push('/editcustomertransactionforgetamount', {
				transactionid: item._id, name: singleCustomer.name, ...item
			});
		}
	}

	const month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
	const formatdate = (d) => {
		let localdate = d.toLocaleTimeString("en-IN");
		if (localdate.length < 11)
			localdate = "0" + localdate
		let x = localdate.substr(0, 5);
		let y = localdate.substr(9, 2).toUpperCase();
		return d.getDate() + ' ' + month[d.getMonth()] + ('' + d.getFullYear()).slice(2) + ' ' + x + ' ' + y;
	}
	return (
		<>
			{/* <Navbar a="/editcustomer" b="/editsupplier" /> */}
			{

				loading === true ? <CircularProgress color="secondary" /> :
					<>

						<Grid container spacing={2} sx={{}}>
							<Grid item xs={9} sx={{ overflowY: "auto", maxHeight: "90vh" }}>
								<Breadcrumbs separator="›" sx={{ padding: 2 }} aria-label="breadcrumb">
									<Link underline="hover" color="inherit" to="/customers">
										Customers List
									</Link>
									<Link
										underline="hover"
										color="text.primary"
										to="#"
									>
										{singleCustomer.name}
									</Link>
								</Breadcrumbs>
								<Table >
									<TableHead sx={{
										background: '#ffeb3b'
									}}>
										<TableRow>
											<TableCell>
												<Typography variant="h6">
													Entries
												</Typography>

											</TableCell>
											<TableCell>
												<Typography variant="h6">
													YOU GAVE
												</Typography>
											</TableCell>
											<TableCell>
												<Typography variant="h6">
													YOU GOT
												</Typography>
											</TableCell>
											<TableCell>
												<Typography variant="h6">
													UPDATE
												</Typography>
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{
											SingleCustomerTransaction.sort((a, b) => {
												return new Date(b.date) - new Date(a.date);
											}).map(
												(item, i) => {
													let d = new Date(item.date)
													return (
														<TableRow key={i}>
															<TableCell>
																<Typography variant="subtitle1" sx={{
																	color: '#616161', fontSize: 13
																}}>
																	{formatdate(d)}
																</Typography>
																{'billNo' in item === true ? <Typography variant="caption" sx={{
																	color: '#9e9e9e', mt: 0.5
																}}>
																	Bill No. {item.billNo}
																</Typography> : null}

																{'billDetails' in item === true ? <Typography variant="subtitle1" sx={{
																	mt: 0.5
																}}>
																	{item.billDetails}
																</Typography> : null}
															</TableCell>

															<TableCell sx={{ backgroundColor: "#f4e5ed" }}>
																{item.lendamount_singleCustomer > 0 ? <Typography variant="h6" sx={{ color: "red", fontSize: "1rem" }}>
																	<CurrencyRupeeIcon sx={{ fontSize: "0.90rem" }} /> {item.lendamount_singleCustomer}
																</Typography> : null}
																{/* <Typography variant="body1">
																	Rs {item.lendamount_singleCustomer}
																</Typography> */}
															</TableCell>

															<TableCell sx={{ backgroundColor: "#edf3ed" }}>
																{item.takeamount_singleCustomer > 0 ?
																	<Typography variant="h6" sx={{ color: "green", fontSize: "1rem" }}>
																		<CurrencyRupeeIcon sx={{ fontSize: "0.90rem" }} />  {item.takeamount_singleCustomer}
																	</Typography> : null}
																{/* <Typography variant="body1">
																	Rs  {item.takeamount_singleCustomer}
																</Typography> */}
															</TableCell>

															<TableCell>
																<Typography variant="body1">
																	<Button variant="contained" onClick={() => handleEditSupplier(item)} size="small"> Edit </Button>
																</Typography>
															</TableCell>
														</TableRow>
													)
												}
											)
										}
									</TableBody>
								</Table >
								{/* </Item> */}
							</Grid>
							<Grid item xs={3}>
								<CustomerDetail singleCustomer={singleCustomer} />
							</Grid>
						</Grid>
						{/* <div className=".container-fluid ">
							<div className="row">
								<div className="col-8">
									<CustomerDetail singleCustomer={singleCustomer} />
								</div>
								<div className="col-4">
									<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
										<div className="container-fluid">
											<div className="collapse navbar-collapse" id="navbarSupportedContent">
												<ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
													<li className="nav-item">
														<Link className="nav-link " to="/singleCustomerReport">
															<PictureAsPdfOutlinedIcon /> Report</Link>
													</li>
													<li className="nav-item">
														<Link className="nav-link " to="/singleCustomerReminder"><WhatsappOutlinedIcon /> Reminder</Link>
													</li>
												</ul>
											</div>
										</div>
									</nav>
								</div>
							</div>
						</div>*/}
						{/* <div className="d-flex justify-content-center" style={{ marginBottom: "5rem" }}>
							<div className='d-grid gap-2 col-6 '>
								<Table>
									<TableHead sx={{
										background: '#ffeb3b'
									}}>
										<TableRow>
											<TableCell>
												<Typography variant="h6">
													Entries
												</Typography>
											</TableCell>
											<TableCell>
												<Typography variant="h6">
													YOU GAVE
												</Typography>
											</TableCell>
											<TableCell>
												<Typography variant="h6">
													YOU GOT
												</Typography>
											</TableCell>
											<TableCell>
												<Typography variant="h6">
													UPDATE
												</Typography>
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{
											SingleCustomerTransaction.sort((a, b) => {
												return new Date(b.date) - new Date(a.date);
											}).map(
												(item, i) => {
													let d = new Date(item.date)
													return (
														<TableRow key={i}>
															<TableCell>
																<Typography variant="subtitle1" sx={{
																	color: '#616161', fontSize: 13
																}}>
																	{formatdate(d)}
																</Typography>
																{'billNo' in item === true ? <Typography variant="caption" sx={{
																	color: '#9e9e9e', mt: 0.5
																}}>
																	Bill No. {item.billNo}
																</Typography> : null}
																{'billDetails' in item === true ? <Typography variant="subtitle1" sx={{
																	mt: 0.5
																}}>
																	{item.billDetails}
																</Typography> : null}
															</TableCell>
															<TableCell sx={{ backgroundColor: "#f4e5ed" }}>
																{item.lendamount_singleCustomer > 0 ? <Typography variant="h6" sx={{ color: "red", fontSize: "1rem" }}>
																	<CurrencyRupeeIcon sx={{ fontSize: "0.90rem" }} /> {item.lendamount_singleCustomer}
																</Typography> : null}
															</TableCell>
															<TableCell sx={{ backgroundColor: "#edf3ed" }}>
																{item.takeamount_singleCustomer > 0 ?
																	<Typography variant="h6" sx={{ color: "green", fontSize: "1rem" }}>
																		<CurrencyRupeeIcon sx={{ fontSize: "0.90rem" }} />  {item.takeamount_singleCustomer}
																	</Typography> : null}
															</TableCell>
															<TableCell>
																<Typography variant="body1">
																	<Button variant="contained" onClick={() => handleEditSupplier(item)} size="small"> Edit </Button>
																</Typography>
															</TableCell>
														</TableRow>
													)
												}
											)
										}
									</TableBody>
								</Table >
							</div>
						</div> */}
						{/* <Card sx={{
							minWidth: 275, position: 'fixed', bottom: 0, width: "100%",
							margin: "0 auto"
						}} >
							<CardContent sx={{
								alignItems: "center",
								display: "flex",
								justifyContent: "center",
							}} >
								<Button style={{ backgroundColor: "red", marginRight: "1rem" }} variant="contained" onClick={youGaveAddPage}>You Gave <CurrencyRupeeIcon sx={{ fontSize: "1.25rem" }} /></Button>
								<Button style={{ backgroundColor: "green" }} variant="contained" onClick={youGetAddPage}>You Got <CurrencyRupeeIcon sx={{ fontSize: "1.25rem" }} /></Button>
							</CardContent>
						</Card> */}
					</>
			}

		</>
	);
};

export default SingleCustomer;



<Card variant="outlined" sx={{ textAlign: 'center', maxHeight: "60vh", overflowY: "auto" }}>
	<Grid container spacing={2}>
		<Grid item xs={9} >
			<Avatar sx={{ bgcolor: "#186fd9", width: 107, height: 107, marginLeft: "8vw", fontSize: 32, fontWeight: "bold", marginBottom: "16px", marginTop: "2vw" }}>
				{stringAvatar(singleCustomer.name)}
			</Avatar>
		</Grid>
	</Grid>

	<CardContent sx={{ paddingTop: 0 }}>
		<Typography variant="h6" sx={{ fontSize: 20, mb: 1 }}>
			{singleCustomer.name}
		</Typography>
		{x >= 0 ? x > 0 ?
			<>
				<Typography color="text.secondary" gutterBottom variant="body1" sx={{ display: 'inline' }}>
					You will get
				</Typography>
				<Typography sx={{ fontSize: 20, fontWeight: "bold", color: "#C82128", display: "inline" }}><CurrencyRupeeIcon sx={{ fontSize: 20 }} />{x}</Typography>
			</>
			: null :
			<>
				<Typography color="text.secondary" gutterBottom variant="body1" sx={{ display: 'inline' }}>
					You'll give
				</Typography>
				<Typography sx={{ fontSize: 20, fontWeight: "bold", color: "#0F814D", display: "inline" }}><CurrencyRupeeIcon sx={{ fontSize: 20 }} />{-x}</Typography>
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
	{/* <CardActions> */}
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
					<WhatsappOutlinedIcon fontSize='100' />
					<Typography>
						Reminder
					</Typography>
				</Box>
		}
		<Divider orientation="vertical" variant="middle" />
		{/* <Link to="/" className="nav-link" style={true ? { pointerEvents: "none" } : null}>Test</Link> */}
		{/* <Typography variant="body1">hello</Typography> */}
	</Box>
	{/* </CardActions> */}
</Card >