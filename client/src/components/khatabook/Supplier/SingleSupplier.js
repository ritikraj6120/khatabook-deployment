import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleSupplierTransactions, getSingleSupplierDetail } from '../../../actions/supplierAction'
import { handleLogout } from '../../../actions/userAction'
import { useHistory, Link } from 'react-router-dom';
import '../style.css';
import SupplierDetail from './SupplierDetail';
import { Typography, Button, CircularProgress, Table, TableRow, TableHead, TableBody, TableCell, } from '@mui/material';
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


const SingleSupplier = () => {
	let history = useHistory();
	const dispatch = useDispatch();
	const singlesupplierid = localStorage.getItem('SingleSupplierId');
	const userLoginState = useSelector(state => state.userLogin)
	const userLoginInfo = userLoginState.userInfo
	const SingleSupplierTransactionState = useSelector(state => state.singleSupplierTransactions);
	const singleSupplierDetails = useSelector(state => state.SingleSupplierDetail)
	const { loading, singleSupplier, error } = singleSupplierDetails;
	const { SingleSupplierTransaction } = SingleSupplierTransactionState


	useEffect(() => {
		if (userLoginInfo !== null) {
			dispatch(getSingleSupplierTransactions(singlesupplierid));
			dispatch(getSingleSupplierDetail(singlesupplierid))
		}
		else {
			dispatch(handleLogout(history));
		}
	}, [userLoginInfo])

	const handleEditSupplier = async (item) => {
		if (item.purchase_singleSupplier > 0) {
			history.push('/editsinglesuppliertransactionforpurchase', {
				transactionid: item._id, name: singleSupplier.name, ...item
			});

		}
		else {
			history.push('/editsinglesuppliertransactionforpayment', {
				transactionid: item._id, name: singleSupplier.name, ...item
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
			{
				(!SingleSupplierTransactionState.loading && !loading && !error && !SingleSupplierTransactionState.error) ?
					<>

						<Grid container spacing={2} sx={{}}>
							<Grid item xs={9} sx={{ overflowY: "auto", maxHeight: "90vh" }}>
								<Breadcrumbs separator="›" sx={{ padding: 2 }} aria-label="breadcrumb">
									<Link underline="hover" color="inherit" to="/suppliers">
										Suppliers List
									</Link>
									<Link
										underline="hover"
										color="text.primary"
										to="#"
									>
										{singleSupplier.name}
									</Link>
								</Breadcrumbs>
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
													PURCHASE
												</Typography>
											</TableCell>
											<TableCell>
												<Typography variant="h6">
													PAYMENT
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
											SingleSupplierTransaction.sort((a, b) => {
												return new Date(b.date) - new Date(a.date);
											}).map((item, i) => {
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

														{/* <TableCell>
															<Typography variant="body1">
																Rs {item.purchase_singleSupplier}
															</Typography>
														</TableCell> */}

														<TableCell sx={{ backgroundColor: "#eafdf6" }}>
															{item.purchase_singleSupplier > 0 ? <Typography variant="h6" sx={{ color: "green", fontSize: "1rem" }}>
																<CurrencyRupeeIcon sx={{ fontSize: "0.90rem" }} /> {item.purchase_singleSupplier}
															</Typography> : null}
														</TableCell>


														<TableCell sx={{ backgroundColor: "#f8f0f4" }}>
															{item.payment_singleSupplier > 0 ?
																<Typography variant="h6" sx={{ color: "red", fontSize: "1rem" }}>
																	<CurrencyRupeeIcon sx={{ fontSize: "0.90rem" }} />  {item.payment_singleSupplier}
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
							</Grid>
							<Grid item xs={3}>
								<SupplierDetail singleSupplier={singleSupplier} />
							</Grid>
						</Grid>
						{/* <Card sx={{
									minWidth: 275, position: 'fixed', bottom: 0, width: "100%",
									margin: "0 auto"
								}} >
									<CardContent sx={{
										alignItems: "center",
										display: "flex",
										justifyContent: "center",
									}} >
										<Button style={{ backgroundColor: "green", marginRight: "1rem" }} variant="contained" onClick={newPurchaseAddPage}>PURCHASE</Button>
										<Button style={{ backgroundColor: "red" }} variant="contained" onClick={newPaymentAddPage}>PAYMENT</Button>
									</CardContent>
								</Card> */}
					</>
					:<CircularProgress color="secondary" /> 
			}
		</>
	);
};

export default SingleSupplier;