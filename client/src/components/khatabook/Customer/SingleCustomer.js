import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleCustomerTransactions, getSingleCustomerDetail } from '../../../actions/customerAction'
import { handleLogout } from '../../../actions/userAction'
import { useHistory, Link } from 'react-router-dom';
import '../style.css';
import CustomerDetail from './CustomerDetail';
import { Typography, Box, Button, CircularProgress, Table, TableRow, TableHead, TableBody, TableCell } from '@mui/material';
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
	const dispatch = useDispatch();
	const singlecustomerid = localStorage.getItem('SingleCustomerId');
	const userLoginState = useSelector(state => state.userLogin)
	const userLoginInfo = userLoginState.userInfo
	const SingleCustomerTransactionState = useSelector(state => state.singleCustomerTransactions);
	// const customerState = useSelector(state => state.getCustomers)
	// const singleCustomer = customerState.customers.find(customer => customer._id === singlecustomerid)
	const singleCustomerDetails = useSelector(state => state.SingleCustomerDetail)
	const { loading, singleCustomer, error } = singleCustomerDetails;
	const { SingleCustomerTransaction } = SingleCustomerTransactionState

	useEffect(() => {
		if (userLoginInfo !== null) {
			dispatch(getSingleCustomerTransactions(singlecustomerid));
			dispatch(getSingleCustomerDetail(singlecustomerid))
		}
		else {
			dispatch(handleLogout(history));
		}
	}, [userLoginInfo])

	const handleEditSupplier = (item) => {
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
	/* changed here singleCustomerDetailState.loading */
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
			{
				(!SingleCustomerTransactionState.loading && !loading && !error && !SingleCustomerTransactionState.error) ?
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
										{/* RITIK RAJ */}
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
					</>
					:
					<CircularProgress />
			}
		</>
	);
};

export default SingleCustomer;




// ----------------in parent component---------------
// const customerList = useSelector(state => state.getCustomers.customers)
// 	const singleCustomer = customerList.find(customer => customer._id === singlecustomerid)

// 	using singleCustomer in parent component
// 	1.(printting it on screeen)
// 	2. passing it as a prop to side component


// 	----------------------side component------------

// 	using singleCustomer and updating it.