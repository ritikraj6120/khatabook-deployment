import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import { addSupplier } from '../../../actions/supplierAction';
import { useDispatch } from 'react-redux';
import { TextField, Box, Paper, Button, Typography } from '@mui/material';
// import { notifyWarning } from '../../../alert';
// import 'react-phone-number-input/style.css'
// import PhoneInput, { isPossiblePhoneNumber, isValidPhoneNumber } from 'react-phone-number-input'
import Breadcrumbs from '@mui/material/Breadcrumbs';
// const Navbar2 = () => {
// 	return (
// 		<nav className="navbar navbar-expand-lg  navbar-dark bg-primary" style={{ color: "#ffffff" }
// 		}>
// 			<div className="container-fluid" >
// 				<div className="collapse navbar-collapse" id="navbarSupportedContent" >
// 					<ul className="navbar-nav me-auto mb-2 mb-lg-0" >
// 						<li className="nav-item" >
// 							Add New Supplier
// 						</li >

// 					</ul >
// 				</div >
// 			</div >
// 		</nav >
// 	)
// }

const AddSupplier = () => {
	const dispatch = useDispatch()
	let history = useHistory()
	const [supplier, setSupplier] = useState({ name: '', phone: '' });
	const [helpertext, setHelpertext] = useState('');
	const handleChange = (e) => {
		setSupplier({ ...supplier, [e.target.name]: e.target.value })
		if (e.target.name === "phone") {
			let x = e.target.value.toString();
			let len = x.length;
			console.log("length is ", len);
			if (len === 0 || len === 10) {
				setHelpertext("");
				console.log(helpertext)
			}
			else {
				setHelpertext("Please make sure you have entered a valid 10 digit phone number");
			}
		}
	}

	const handleSubmit = (e) => {
		// e.preventDefault();
		// if (supplier.name.length < 1) {
		// 	console.log(supplier.name.length);
		// 	notifyWarning("Supplier length less than 1");
		// }
		// else if (isPossiblePhoneNumber(phone) === false) {
		// 	notifyWarning("Enter correct phone Number");
		// }
		// else if (isValidPhoneNumber(phone) === false) {
		// 	notifyWarning("Enter valid phone Number");
		// }
		// else {
		// console.log("very good");
		let y = "+91" + supplier.phone;
		dispatch(addSupplier(history, supplier.name, y));
		// history.push('/editcustomer');
		// }
	}

	return (
		<>
			<br />
			<Breadcrumbs separator="›" sx={{ padding: 2 }} aria-label="breadcrumb">
				<Link underline="hover" color="inherit" to="/suppliers">
					Suppliers List
				</Link>
				<Link
					underline="hover"
					color="text.primary"
					to="#"
				>
					Add new supplier
				</Link>
			</Breadcrumbs>
			{/* <Navbar2 /> */}
			{/* <br /> */}

			<Paper elevation={3} sx={{ width: "50vw", height: "15em", margin: "auto", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
				<Typography variant="h6">	Add New Supplier</Typography>
				<Box component="form" noValidate autoComplete="off"
					sx={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
					<TextField
						required
						id="outlined-required"
						label="Name"
						name="name"
						value={supplier.name}
						onChange={handleChange}
						sx={{ marginRight: "5vw" }}
						size="large"
					/>
					{/* <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}> */}
					<TextField
						required type="number"
						id="outlined-error-helper-text"
						label="Phone"
						name="phone"
						value={supplier.phone} onChange={handleChange}
						sx={{ marginLeft: "5vw" }}
						size="large"
					/>

					{/* </Box> */}
				</Box>
				<Typography variant="caption" sx={{ color: "red" }}>{helpertext}</Typography>
				<Button onClick={handleSubmit} disabled={supplier.name.length < 1 || supplier.phone.length !== 10 ? true : false} variant="contained" sx={{ width: "20%", marginBottom: "3%" }}>
					Save
				</Button>
			</Paper>


			{/* <form onSubmit={handleClick}>
				<div className="row">
					<div className="col-sm col-lg-4">
						<label htmlFor="exampleFormControlSelect1">Enter Title</label>
						<select className="form-select" id="exampleFormControlSelect1" name="title" value={supplier.title} onChange={onChange} >
							<option value="Mr">Mr</option>
							<option value="Mrs">Mrs</option>
						</select>
					</div>
					<div className="col-sm col-lg-4">
						<label htmlFor="name">Name</label>
						<input required="required" type="text" className="form-control" id="name" name="name"
							value={supplier.name} onChange={onChange} placeholder="Enter Supplier Name to add Entries" />
					</div>
					<div className="col-sm col-lg-4">
						<label htmlFor="phone">Enter Phone No.</label>
						<PhoneInput
							international
							defaultCountry="IN"
							placeholder="Enter Phone Number"
							className="form-control"
							id="phone" value={phone} onChange={setPhone} />
				 <input required type="number" className="form-control" id="phone" name="phone" onChange={onChange} placeholder="Enter Phone Number" /> 
		</div>
				</div >
	<div className="row mt-3">
		<div className="col-sm">
			<button type="submit" className="btn btn-primary">
				Add New Supplier
			</button>
		</div>
	</div>
			</form >  */}
		</>
	)
}

export default AddSupplier;





