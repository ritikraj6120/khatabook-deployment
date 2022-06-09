import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editCustomer, deleteCustomer, getCustomerBalance } from '../../../actions/customerAction'
import { handleLogout } from '../../../actions/userAction'
import { useHistory, Link } from 'react-router-dom';
import { notifyWarning } from '../../../alert';
import { Button, Typography, CardContent, Card, Divider, Grid, Avatar, IconButton, MenuItem, Menu } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import WhatsappOutlinedIcon from '@mui/icons-material/WhatsappOutlined';
import 'react-phone-number-input/style.css'
import PhoneInput, { isPossiblePhoneNumber, isValidPhoneNumber } from 'react-phone-number-input'
import { Box } from '@mui/system';


const CustomerDetail = (props) => {
	let { singleCustomer } = props;
	let history = useHistory();
	const dispatch = useDispatch();
	const userLoginState = useSelector(state => state.userLogin)
	const userLoginInfo = userLoginState.userInfo
	const customerBalanceState = useSelector(state => state.getCustomerBalance)
	const singleCustomerTransactionsState = useSelector(state => state.singleCustomerTransactions)
	const { SingleCustomerTransaction } = singleCustomerTransactionsState
	const { customerBalance } = customerBalanceState;
	let x = 0;
	if (customerBalanceState.loading === false) {
		const result = customerBalance.filter(item => item.customer === singleCustomer._id);
		if (result[0])
			x = (result[0].amounttoget - result[0].amounttogive);
	}
	const [credentials, setCredentials] = useState({  ename: "" })
	const ref = useRef(null)
	const refClose = useRef(null)
	const [anchorEl, setAnchorEl] = useState(null);
	const [phone, setPhone] = useState('')
	const open = Boolean(anchorEl);
	// useEffect(() => {
	// 	setCredentials({ etitle: singleCustomer.title, ename: singleCustomer.name });
	// 	setPhone(singleCustomer.phone);
	// 	y = singleCustomer.phone;
	// }, [singleCustomer]);

	useEffect(() => {
		if (userLoginInfo !== null) {
			dispatch(getCustomerBalance());
		}
		else {
			dispatch(handleLogout(history));
		}
	}, [userLoginInfo, SingleCustomerTransaction])

	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value })
	}

	const youGaveAddPage = (e) => {
		e.preventDefault();
		history.push('/addNewTransactionForCustomerGave');
	}

	const youGetAddPage = (e) => {
		e.preventDefault();
		history.push('/addNewTransactionForCustomerGet');
	}

	const handleUpdate = (e) => {
		e.preventDefault();
		const {  ename } = credentials;
		if (ename.length < 1) {
			console.log(ename.length);
			notifyWarning("Customer name less than 1");
		}
		else if (phone === null || phone === undefined) {
			notifyWarning("Phone Number can not be empty");
		}
		else if (isPossiblePhoneNumber(phone) === false) {
			console.log(phone);
			notifyWarning("Enter correct phone Number");
		}
		else if (isValidPhoneNumber(phone) === false) {
			notifyWarning("Enter valid phone Number");
		}
		else {
			dispatch(editCustomer(singleCustomer._id,ename, phone));
			// singleCustomer = { ...singleCustomer, title: etitle, name: ename, phone: phone };
			refClose.current.click();
			// window.location.reload();
		}
	}
	const updateCustomerProfile = () => {
		setAnchorEl(null);
		ref.current.click();
		setCredentials({  ename: singleCustomer.name })
		setPhone(singleCustomer.phone);
	}

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};



	const handleDelete = (e) => {
		e.preventDefault();
		console.log("dispatched deletecustomer")
		dispatch(deleteCustomer(singleCustomer._id, history));
		localStorage.removeItem('SingleCustomerId');
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
			{/* modal starts */}
			<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
				Launch demo modal
			</button>


			<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">Edit Details</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<form className="my-3"  >
								<div className="mb-3">
									<label htmlFor="name" className="form-label">Name</label>
									<input type="text" className="form-control" id="name" name="ename" value={credentials.ename} onChange={onChange} minLength={1} required />
								</div>
								<div className="mb-3">
									<label htmlFor="phone" className="form-label">Phone</label>
									{/* <input type="tel" className="form-control" id="ephone" name="ephone" value={credentials.ephone} onChange={onChange} required />
									<label htmlFor="phone" className="form-label" >Enter Phone No.</label> */}
									<PhoneInput
										international
										defaultCountry="IN"
										placeholder="Enter Phone Number"
										className="form-control"
										id="phone" value={phone} onChange={setPhone} required />
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Discard</button>
							<button type="button" onClick={handleUpdate} className="btn btn-primary" >Save Changes</button>
						</div>
					</div>
				</div>
			</div>
			{/* modal ends */}

			<Card variant="outlined" sx={{ textAlign: 'center', maxHeight: "60vh", overflowY: "auto" }}>
				<Grid container spacing={2}>
					<Grid item xs={9} >
						<Avatar sx={{ bgcolor: "#186fd9", width: 107, height: 107, marginLeft: "8vw", fontSize: 32, fontWeight: "bold", marginBottom: "16px", marginTop: "2vw" }}>
							{stringAvatar(singleCustomer.name)}
						</Avatar>
					</Grid>
					<Grid item xs={3}>
						<IconButton
							onClick={handleClick}>
							<MoreVertIcon />
						</IconButton>
						<Menu
							id="basic-menu"
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							MenuListProps={{
								'aria-labelledby': 'basic-button',
							}}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'right',
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
						>
							{/* onClick={() => { updateNote(note); }} */}
							<MenuItem divider onClick={updateCustomerProfile}><EditIcon fontSize="small" /> Edit Customer</MenuItem>
							<MenuItem onClick={handleDelete}><DeleteIcon fontSize="small" /> Delete Customer</MenuItem>
						</Menu>
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
		</>
	)
}
export default CustomerDetail;
