import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addSingleSupplierTransaction, getSingleSupplierDetail } from '../../../actions/supplierAction';
import { handleLogout } from '../../../actions/userAction'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CircularProgress, Button, TextField, Typography, Breadcrumbs } from '@mui/material';
const AddNewTransactionForSupplierPayment = () => {
	const singlesupplierid = localStorage.getItem('SingleSupplierId');
	let history = useHistory();
	const dispatch = useDispatch();
	const errorStateinit = {
		amountError: null
	}
	const [errorState, seterrorState] = useState(errorStateinit);
	const userLoginState = useSelector(state => state.userLogin)
	const userLoginInfo = userLoginState.userInfo
	const singleSupplierDetail = useSelector(state => state.SingleSupplierDetail)
	const { singleSupplier, loading } = singleSupplierDetail;


	useEffect(() => {
		if (userLoginInfo !== null) {
			dispatch(getSingleSupplierDetail(singlesupplierid));
		}
		else {
			dispatch(handleLogout(history))
		}
	}, [userLoginInfo])

	const [newTransaction, setNewTransaction] = useState('');
	const [newTransactiondate, setNewTransactiondate] = useState(new Date());
	const [newTransactionBilldetails, setNewTransactiondateBilldetails] = useState("");
	const [toggleAddBillNo, settoggleAddBillNo] = useState(false);
	const [addBillNo, setAddBillNo] = useState("");
	const onChange = (e) => {
		let x = e.target.value
		if (x === '') {
			seterrorState(previousState => {
				return { ...previousState, amountError: null }
			});
			setNewTransaction('');
		}
		else {
			x = parseInt(x);
			// console.log(x)
			// console.log(typeof x)
			if (x <= 0) {
				seterrorState(previousState => {
					return { ...previousState, amountError: "Invalid Amount" }
				});
				setNewTransaction('0');
			}
			else {
				seterrorState({ ...errorState, amountError: null })
				setNewTransaction(x.toString());
			}
		}
	}
	const handlesubmit = (e) => {
		e.preventDefault();
		console.log(typeof parseInt(newTransaction));
		dispatch(addSingleSupplierTransaction(history,singleSupplier._id, 0, parseInt(newTransaction), newTransactionBilldetails, addBillNo, newTransactiondate));
		// history.push('/singlesupplier')
	}
	return (
		<>
			{
				loading === true ? <CircularProgress /> :
					<>
						<div>
							<Breadcrumbs separator="›" sx={{ padding: 2 }} aria-label="breadcrumb">
								<Link underline="hover" color="inherit" to="/suppliers">
									Suppliers List
								</Link>
								<Link
									underline="hover"
									color="inherit"
									to="/singlesupplier"
								>
									{singleSupplier.name}
								</Link>
								<Link
									underline="hover"
									color="text.primary"
									to="#"
								>
									Your Payment
								</Link>
							</Breadcrumbs>
							<h1>You gave Rs {newTransaction === '' ? 0 : newTransaction} to {singleSupplier.name}</h1>
						</div>
						<form >
							<input type="number" className="form-control " placeholder="Enter Amount" onChange={onChange} />
							<span className="text-danger">{errorState.amountError}</span>
							<br />
							<input type="text" className="form-control " placeholder="Enter Details (Item Name, Bill No, Quantity...)" value={newTransactionBilldetails} onChange={(e) => {
								setNewTransactiondateBilldetails(e.target.value);
							}} />

							<br />
							{toggleAddBillNo === false ?
								<Button onClick={(e) => {
									settoggleAddBillNo(true);
								}} >Add Bill No.</Button>
								: <input type="text" className="form-control " placeholder="Add Bill No." value={addBillNo} onChange={(e) => {
									setAddBillNo(e.target.value);
								}} />
							}
							<br />
							<br />
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DatePicker
									openTo="day"
									views={['year', 'month', 'day']}
									label="Month, date and year"
									value={newTransactiondate}
									onChange={(newValue) => {
										setNewTransactiondate(newValue);
									}}
									renderInput={(params) => <TextField {...params} helperText={null} />}
								/>
							</LocalizationProvider>
							<br />
							<Typography align='center'>
								{
									newTransaction > 0 ? <Button sx={{
										width: 1 / 4, backgroundColor: "#f2183d", '&:hover': {
											background: "#f2183d",
										}
									}} onClick={handlesubmit} variant="contained">SAVE</Button> :
										<Button disabled sx={{
											width: 1 / 4, backgroundColor: "#f2183d", '&:hover': {
												background: "#f2183d",
											}
										}} onClick={handlesubmit} variant="contained">SAVE</Button>
								}
							</Typography>

						</form>
					</>
			}
		</>
	);
};

export default AddNewTransactionForSupplierPayment;