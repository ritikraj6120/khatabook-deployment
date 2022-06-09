import React, {  useEffect } from 'react'
import SupplierItem from './SupplierItem';
import { useHistory } from 'react-router-dom'
// import {Spinner} from '../../Spinner'
import { useDispatch, useSelector } from 'react-redux';
import { getSuppliers, getSupplierBalance } from '../../../actions/supplierAction';
import { handleLogout } from '../../../actions/userAction'
import '../style.css'
import { Button, Card, CardContent, Divider, Box, Typography, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import generatePDF from './supplierReport';
// import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CircularProgress from '@mui/material/CircularProgress';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
const theme = createTheme({
	palette: {
		primary: {
			main: '#3fcb1d'
		}
	},
});



const Suppliers = () => {
	let history = useHistory();
	const dispatch = useDispatch();
	const userLoginState = useSelector(state => state.userLogin)
	const userLoginInfo = userLoginState.userInfo
	const suppliersState = useSelector(state => state.getSuppliers)
	const supplierBalanceState = useSelector(state => state.getSupplierBalance)
	const { supplierBalance } = supplierBalanceState;
	const { suppliers } = suppliersState
	useEffect(() => {
		if (userLoginInfo !== null) {
			dispatch(getSuppliers());
			dispatch(getSupplierBalance());
		}
		else {
			dispatch(handleLogout(history));
		}
	}, [userLoginInfo])
	// useEffect(() => {
	// 	if (suppliersState.error !== null) {
	// 		history.push('/login');
	// 	}
	// }, [suppliersState.error])
	let totalpurchase = 0;
	let youwillgive = 0;
	if (supplierBalanceState.loading === false && supplierBalanceState.error === null) {
		for (let i = 0; i < supplierBalance.length; i++) {
			totalpurchase += supplierBalance[i].purchase;
			youwillgive = supplierBalance[i].purchase - supplierBalance[i].payment;
		}
	}


	function handleClick(e) {
		history.push('/addsupplier');
	}

	return (
		<>
			{
				(supplierBalanceState.loading === false && suppliersState.loading === false && supplierBalanceState.error === null && suppliersState.error === null) ?
					<>
						<Grid container sx={{ marginTop: "1vw" }}  >

							<Grid item xs={9} sx={{ overflowY: "auto", maxHeight: "90vh", backgroundColor: "#fbf7f8" }}>
								<Box sx={{ height: "10vh", margin: "0px 14px", marginTop: "16px", marginBottom: "8px", display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }} >
									<Box sx={{ display: 'flex', flexDirection: "row", marginLeft: "8px" }}>
										<Typography variant="body1" sx={{ fontSize: "16px", fontWeight: "500" }}>
											Suppliers
										</Typography>
										<Typography variant="body1" sx={{ fontSize: "16px", fontWeight: "400" }}>
											({suppliers.length})
										</Typography>
									</Box>
									<ThemeProvider theme={theme}>
										<Button variant="contained" size="small" sx={{ backgroundColor: "#055903" }} startIcon={<PersonAddAltIcon sx={{ color: "white" }} />} onClick={handleClick}>
											<Typography sx={{ color: "white" }} >Add Supplier</Typography>
										</Button>
									</ThemeProvider>
								</Box>
								<Box sx={{ display: 'flex', flexDirection: 'column', margin: "0px 14px", marginBottom: "2vh" }}>
									{suppliers.map((supplier) => {
										return <SupplierItem key={supplier._id} supplier={supplier} supplierBalance={supplierBalance} />
									})}
								</Box>
							</Grid>


							<Grid item xs={3}>
								<Card variant="outlined" sx={{ textAlign: 'center', maxHeight: "60vh", overflowY: "auto" }}>

									<AccountBalanceWalletIcon sx={{ bgcolor: "#f2f1c4", color: "#ecac38f5", width: "4rem", height: "4rem", marginBottom: "16px", marginTop: "2vw", borderRadius: "4rem" }} />
									<CardContent sx={{ padding: 0, paddingBottom: 0 }}>
										<Typography variant="h6" sx={{ fontSize: 20 }}>
											Total Purchase
										</Typography>
										<Box sx={{ mb: "2rem" }}>
											<Typography sx={{
												fontSize: 24, fontWeight: "bold",
												// color: `${totalpurchase >= 0 ? "#C82128" : "#0F814D"}` 
											}}>
												<CurrencyRupeeIcon sx={{ fontSize: 24, fontWeight: "bold" }} />
												{totalpurchase}
											</Typography>
											<Typography color="text.secondary" gutterBottom variant="body1" sx={{ display: 'inline' }}>
												Your Purchase
											</Typography>
										</Box>
										<Divider />
										<Box
											sx={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'space-evenly',
												paddingTop: "5vh",
												paddingBottom: "4vh",
												marginBottom:"2vh",
												backgroundColor: `${youwillgive >= 0 ? "#E9FCF4" : "#FCE9F2"}`,
												color: 'text.secondary',
												'& hr': {
													mx: 0.5,
													// width:"50px",
													// height:"35px"
												},
											}}
										>
											{/* <Box sx={{ marginBottom: "1vh" }}>
												<Typography color="text.secondary" variant="body1" sx={{ display: 'inline' }}>
													You'll Get
												</Typography>
												<Typography sx={{ fontSize: 20, fontWeight: "bold", color: "#C82128" }}>
													<CurrencyRupeeIcon sx={{ fontSize: 20 }} />
													{TotalAmounttoget}
												</Typography>
											</Box> */}
											{/* <Divider orientation="vertical" variant="middle" /> */}
											{/* <Box>
												<Typography color="text.secondary" variant="body1" sx={{ display: 'inline' }}>
													You'll Give
												</Typography>
												<Typography sx={{ fontSize: 20, fontWeight: "bold", color: "#0F814D" }}>
													<CurrencyRupeeIcon sx={{ fontSize: 20 }} />
													{TotalAmounttogive}
												</Typography>
											</Box> */}

											{youwillgive >= 0 ? <Typography sx={{ color: "#0F814D" }}>You'll Give</Typography> :
												<Typography sx={{ color: "#C82128" }}>Advance</Typography>
											}
											<Typography sx={{ fontSize: 24, fontWeight: "bold", color: `${youwillgive >= 0 ? "#0F814D" : "#C82128"}` }}>
												<CurrencyRupeeIcon sx={{ fontSize: 24, fontWeight: "bold" }} />
												{Math.abs(youwillgive)}
											</Typography>
										</Box>
										<Button variant="contained" size="small" onClick={() => generatePDF(suppliers, supplierBalance)}>
											Download Report
										</Button>
									</CardContent>
								</Card>
							</Grid>
						</Grid>




						{/* <div className="card mt-5" style={{ width: "18rem" }}>
							<div className="card-body">
								<h5 className="card-title">Total Purchase </h5>
								<p className="card-text">Rs {totalpurchase}</p>
								{youwillgive >= 0 ? <h5 className="card-title">You'll Give</h5> : <h5 className="card-title">Advance</h5>}
								<p>
									Rs {Math.abs(youwillgive)}
								</p>
								<Button variant="contained" onClick={() => generatePDF(suppliers, supplierBalance)}>
									Download Report
								</Button>
							</div>
						</div> */}

						{/* <div className="my-3">
							<br />
							<div className="container mx-2 h3">
								{suppliers.length === 0 && 'No Suppliers'}
							</div>
							<div className="d-flex justify-content-center">
								<div className='d-grid gap-2 col-6 '>
									{
										suppliers.map((supplier) => {
											return <SupplierItem key={supplier._id} supplier={supplier}
												supplierBalance={supplierBalance}
											/>
										})
									}
								</div>
							</div>
						</div> */}
					</> : <CircularProgress />
			}

			{/* <Link to="/addsupplier">
				<button type="button" className="btn  sticky-btn" style={{ backgroundColor: "#3fcb1d" }}>
					<PersonAddRoundedIcon style={{ color: "white" }} />
				</button>
			</Link> */}
		</>
	)
}

export default Suppliers;

