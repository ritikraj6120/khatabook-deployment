import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleCustomerTransactions, getSingleCustomerDetail } from '../../../actions/customerAction';
import { handleLogout } from '../../../actions/userAction'
import { Typography, Button, CircularProgress, AppBar, Table, TableRow, TableHead, TableBody, TableCell, Toolbar, IconButton, Card, CardContent } from '@mui/material';
import { Box } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

import generatePDF from './pdfGeneration_singleCustomer';
const SingleCustomerReport = () => {
	let history = useHistory();
	const dispatch = useDispatch();
	const singlecustomerid = localStorage.getItem('SingleCustomerId');
	const userLoginState = useSelector(state => state.userLogin)
	const userLoginInfo = userLoginState.userInfo
	const SingleCustomerTransactionState = useSelector(state => state.singleCustomerTransactions);
	const singleCustomerDetail = useSelector(state => state.SingleCustomerDetail)
	const { SingleCustomerTransaction } = SingleCustomerTransactionState;
	const { singleCustomer } = singleCustomerDetail;

	useEffect(() => {
		if (userLoginInfo !== null) {
			dispatch(getSingleCustomerTransactions(singlecustomerid));
			dispatch(getSingleCustomerDetail(singlecustomerid));
		}
		else {
			dispatch(handleLogout(history))
		}
	}, [userLoginInfo])

	let yougave = 0, yougot = 0, netbalance = 0;
	let x;
	if (SingleCustomerTransactionState.loading === false) {
		// can apply conddition but not of much optimisation
		for (let i = 0; i < SingleCustomerTransaction.length; i++) {
			yougave += SingleCustomerTransaction[i].lendamount_singleCustomer;
			yougot += SingleCustomerTransaction[i].takeamount_singleCustomer;
		}
		netbalance = yougave - yougot;
	}

	if (singleCustomerDetail.loading === false) {
		x = `https://api.whatsapp.com/send?phone=${singleCustomer.phone}`;
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

	// const callToWhatsAppWeb = async () => {
	// 	// https://api.whatsapp.com/send?phone=
	// 	// console.log(`https://api.whatsapp.com/send?phone=91${singleCustomer.phone}`);
	// 	// <Redirect to=`https://api.whatsapp.com/send?phone=91${singleCustomer.phone}` />
	// 	const response=await fetch(`https://api.whatsapp.com/send?phone=91${singleCustomer.phone}`, {
	// 		method: 'GET',
	// 		headers: {
	// 			'Content-Type': 'application/json'
	// 		},
	// 		mode: 'no-cors' // 'cors' by default
	// 	});
	// 	console.log(response);
	// }
	return (
		<>
			{
				(SingleCustomerTransactionState.loading === true || singleCustomerDetail.loading === true) ? <CircularProgress color="secondary" /> :
					<>
						<Box sx={{ flexGrow: 1, mb: 4 }}>
							<AppBar position="static">
								<Toolbar>
									<IconButton
										size="large"
										edge="start"
										color="inherit"
										aria-label="menu"
										sx={{ mr: 2 }} onClick={() => history.push('/singlecustomer')}
									>
										<ArrowBackIcon />
									</IconButton>
									<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
										Report of {singleCustomer.name}
									</Typography>
								</Toolbar>
							</AppBar>
						</Box>

						{/* <ButtonGroup variant="outlined" aria-label="outlined button group">
							<Button size="large" onClick={() => setOpen(isOpen => !isOpen)}><TodayIcon />START DATE</Button>
							<Button size="large" ><TodayIcon />END DATE</Button>
						</ButtonGroup> */}

						{/* <LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								openTo="day"
								views={['year', 'month', 'day']}
								label="START DATE"
								value={newTransactiondate}
								onChange={(newValue) => {
									setNewTransactiondate(newValue);
								}}
								clearable=true
								open={open}
								renderInput={(params) => <TextField {...params} helperText={null} />}
							/>
						</LocalizationProvider> */}
						{/* <LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								openTo="day"
								views={['year', 'month', 'day']}
								value={newTransactiondate}
								onChange={(newValue) => {
									setNewTransactiondate(newValue);
								}}
								open={open}
								renderInput={(params) => <TextField {...params} helperText={null} />}
							/>
						</LocalizationProvider> */}


						<div className="d-flex justify-content-center" style={{ marginBottom: "5rem" }}>
							<div className='d-grid gap-2 col-6 '>
								<Table>
									<TableHead>
										<TableRow>
											<TableCell>
												<Typography>Net Balance</Typography>
											</TableCell>
											<TableCell>
												<Typography sx={{ display: { xl: 'none', xs: 'block' } }}>Net Balance</Typography>
											</TableCell>
											<TableCell>

												{
													netbalance > 0 ? netbalance === 0 ?
														<Typography sx={{ display: "inline-block" }}>
															<CurrencyRupeeIcon sx={{ fontSize: "1.25rem" }} />
															{Math.abs(netbalance)}
														</Typography> :
														<Typography sx={{ display: "inline-block", color: "red" }}>
															<CurrencyRupeeIcon sx={{ fontSize: "1.25rem" }} />
															{Math.abs(netbalance)}
														</Typography> :
														<Typography sx={{ display: "inline-block", color: "green" }}>
															<CurrencyRupeeIcon sx={{ fontSize: "1.25rem" }} />
															{Math.abs(netbalance)}
														</Typography>
												}
											</TableCell>
										</TableRow>
									</TableHead>
									<TableHead >
										<TableRow>
											<TableCell>
												<Typography variant="caption" display="block" sx={{ fontSize: "0.80rem" }} >
													TOTAL
												</Typography>
												<Typography variant="h6" display="block" sx={{ fontSize: "1rem" }}>
													{SingleCustomerTransaction.length} Entries
												</Typography>
											</TableCell>
											<TableCell>
												<Typography variant="caption" display="block" sx={{ fontSize: "0.80rem" }} >
													YOU GAVE
												</Typography>
												<Typography variant="h6" display="block" sx={{ fontSize: "1rem", color: "red" }}>
													<CurrencyRupeeIcon sx={{ fontSize: "1.25rem" }} /> {yougave}
												</Typography>
											</TableCell>
											<TableCell>
												<Typography variant="caption" display="block" sx={{ fontSize: "0.8rem" }} >
													YOU GOT
												</Typography>
												<Typography variant="h6" display="block" sx={{ fontSize: "1rem", color: "green" }}>
													<CurrencyRupeeIcon sx={{ fontSize: "1.25rem" }} /> {yougot}
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
																{item.lendamount_singleCustomer > 0 ? <Typography variant="h6" sx={{ color: "red", fontSize: "0.90rem" }}>
																	<CurrencyRupeeIcon sx={{ fontSize: "0.90rem" }} /> {item.lendamount_singleCustomer}
																</Typography> : null}

															</TableCell>
															<TableCell>
																{item.takeamount_singleCustomer > 0 ?
																	<Typography variant="h6" sx={{ color: "green", fontSize: "0.90rem" }}>
																		<CurrencyRupeeIcon sx={{ fontSize: "0.90rem" }} />  {item.takeamount_singleCustomer}
																	</Typography> : null}
															</TableCell>
														</TableRow>
													)
												}
											)
										}
									</TableBody>
								</Table >
							</div>
						</div>
						<Card sx={{
							minWidth: 275, position: 'fixed', bottom: 0, width: "100%",
							margin: "0 auto"
						}} >
							<CardContent sx={{
								alignItems: "center",
								display: "flex",
								justifyContent: "center",
							}} >

								<Button variant="outlined" onClick={() => generatePDF(singleCustomer, SingleCustomerTransaction)} size="large" style={{ marginRight: "1rem" }} startIcon={<PictureAsPdfOutlinedIcon sx={{ fontSize: "1.25rem" }} />}>  Download  </Button>

								<Button style={{ backgroundColor: "#0b3fd0" }} size="large" variant="contained" startIcon={<ShareOutlinedIcon />}>
									Share
									{/* <Link to={{ pathname: x }} style={{ textDecoration: 'none', color: "white" }} target="_blank">Share </Link> */}
								</Button>
							</CardContent>
						</Card>
					</>
			}
			{/* <Link to={{ pathname: "https://example.zendesk.com/hc/en-us/articles/123456789-Privacy-Policies" }} target="_blank" /> */}
		</>
	)
}

export default SingleCustomerReport