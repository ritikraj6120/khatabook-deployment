import SupplierContext from "./SupplierContext";
import UserContext from "./UserContext";
import { useState, useContext, useReducer } from "react";
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
const SupplierState = (props) => {
	const { handleLogout } = useContext(UserContext)

	const notifySuccess = (x) => {
		toast.success(x, {
			autoClose: 2000,
			position: "top-center",
		});
	}
	const notifyError = (x) => {
		toast.error(x, {
			autoClose: 2000,
			position: "top-right",
		});
	}
	const notifyWarning = (x) => {
		toast.warn(x, {
			autoClose: 2000,
			position: "top-center",
		})
	}
	const notifyUnAuthorized = (x) => {
		toast.error(x, {
			autoClose: 500,
			position: "top-center",
		});
	}
	let history = useHistory();
	const host = "https://khatabook-app.herokuapp.com"
	const [suppliers, setSuppliers] = useState([])
	const [SingleSupplierTransaction, setSingleSupplierTransaction] = useState([]);
	const [SingleTransactionOfParticularSupplier, setSingleTransactionOfParticularSupplier] = useState({});
	const initialState = {
		loading: true,
		error: '',
		supplierBalance: []
	}
	const reducer = (state, action) => {
		switch (action.type) {
			case 'FETCH_SUCCESS':
				return {
					loading: false,
					error: '',
					supplierBalance: action.payload
				}
			case 'FETCH_ERROR':
				return {
					loading: false,
					error: 'Something Went wrong!',
					supplierBalance: []
				}
			default:
				return state
		}
	}


	const initialStatesingleSupplierDetail = {
		loading: true,
		error: '',
		singleSupplier: {}
	}
	const reducersingleSupplierDetail = (state, action) => {
		switch (action.type) {
			case 'FETCH_SUCCESS':
				return {
					loading: false,
					error: '',
					singleSupplier: action.payload
				}
			case 'FETCH_ERROR':
				return {
					loading: false,
					error: 'Something Went wrong!',
					singleSupplier: {}
				}
			default:
				return state
		}
	}
	const [state, dispatch] = useReducer(reducer, initialState);
	const [singleSupplierDetail, dispatchsingleSupplierDetail] = useReducer(reducersingleSupplierDetail, initialStatesingleSupplierDetail);


	/////////////////////////////////////////////////////////////






	// Get all Suppliers function no 1
	const getSuppliers = async () => {
		const response = await fetch(`${host}/api/supplier/getsuppliers`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			}
		});
		if (response.status === 401) {
			notifyUnAuthorized("Not Authorized, Login Again ");
			handleLogout()
		}
		else if (response.status === 200) {
			const json = await response.json()
			setSuppliers(json);
		}
		else {
			notifyError("Some Error happenend");
		}
	}


	// Add a Supplier function no 2
	const addSupplier = async (title, name, phone) => {
		const response = await fetch(`${host}/api/supplier/addsupplier`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			},
			body: JSON.stringify({ title, name, phone })
		});
		if (response.status === 401) {
			notifyUnAuthorized("Not Authorized, Login Again ");
			handleLogout()
		}
		else if (response.status === 404) {
			notifyWarning("Supplier  already exists")
		}
		else if (response.status === 200) {
			const supplier = await response.json();
			setSuppliers(suppliers.concat(supplier))
			localStorage.setItem("SingleSupplierId", JSON.stringify(supplier._id))
			notifySuccess("Supplier Added Succcessfully")
			// setTimeout(function () { history.push('/singlesupplier') }, 1000);
			history.push('/singlesupplier')
		}
		else {
			notifyError("Some Error happenend ");
		}
	}

	// Edit a supplier function no 3
	const editSupplier = async (id, title, name, phone) => {
		console.log(title, name, phone);
		const response = await fetch(`${host}/api/supplier/updatesupplier/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			},
			body: JSON.stringify({ title, name, phone })
		});
		// const json = await response.json();
		if (response.status === 401) {
			notifyUnAuthorized("Not Authorized, Login Again ");
			handleLogout()
		}
		else if (response.status === 404) {
			notifyWarning("No Supplier found with this name")
		}
		else if (response.status === 200) {
			let newSuppliers = JSON.parse(JSON.stringify(suppliers))
			// Logic to edit in client
			for (let index = 0; index < newSuppliers.length; index++) {
				const element = newSuppliers[index];
				if (element._id === id) {
					newSuppliers[index].title = title;
					newSuppliers[index].name = name;
					newSuppliers[index].phone = phone;
					break;
				}
			}
			setSuppliers(newSuppliers);
			notifySuccess("Supplier Details Updated  Succcessfully")
		}
		else {
			notifyError("Some Error happenend ");
		}
	}

	// Delete a Supplier function no 4
	const deleteSupplier = async (id) => {
		const response = await fetch(`${host}/api/supplier/deletesupplier/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			}
		});
		console.log(response.status);
		if (response.status === 400 || response.status === 401) {
			notifyUnAuthorized("Not Authorized, Login Again ");
			handleLogout()
		}
		else if (response.status === 404) {
			notifyWarning("No Supplier found with this name")
		}
		else if (response.status === 200) {
			const newSuppliers = suppliers.filter((supplier) => { return supplier._id !== id })
			setSuppliers(newSuppliers);
			history.push("/suppliers");
		}
		else {
			notifyError("Some Error happenend ");
		}

	}

	// Get single Supplier function no 5
	const getSingleSupplierDetail = async (id) => {
		const response = await fetch(`${host}/api/supplier/getSingleSupplierDetail/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			}
		});
		if (response.status === 404) {
			dispatchsingleSupplierDetail({ type: 'FETCH_ERROR' })
			notifyWarning("No Supplier found with this name")
			setTimeout(function () { history.push('/suppliers') }, 1000);
		}
		else if (response.status === 401) {
			dispatchsingleSupplierDetail({ type: 'FETCH_ERROR' });
			notifyUnAuthorized("Not Authorized, Login Again ");
			handleLogout()
		}
		if (response.status === 200) {
			const json = await response.json()
			dispatchsingleSupplierDetail({ type: 'FETCH_SUCCESS', payload: json })
		}
		else {
			notifyError("Some Error happenend at Server side");
		}
	}

	//get single Supplier transcation function no 6
	const getSingleSupplierTransactions = async (id) => {
		const response = await fetch(`${host}/api/supplier/getSupplierTransactions/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')

			}
		});
		if (response.status === 400 || response.status === 401) {
			notifyUnAuthorized("Not Authorized, Login Again ");
			handleLogout()
		}
		else if (response.status === 404) {
			notifyWarning("No Supplier found with this name")
			setTimeout(function () { history.push('/suppliers') }, 1000);
		}
		else if (response.status === 200) {
			const json = await response.json()
			setSingleSupplierTransaction(json);
		}
		else {
			notifyError("Some Error happenend at Server side");
		}
	}

	//  add a transaction  using: post "/api/supplier/addSupplierTransaction/" function no 7

	const addSingleSupplierTransaction = async (id, purchase_singleSupplier, payment_singleSupplier, billDetails, billNo, date) => {

		const response = await fetch(`${host}/api/supplier/addSupplierTransaction/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			},
			body: JSON.stringify({ purchase_singleSupplier, payment_singleSupplier, billDetails, billNo, date })
		});

		if (response.status === 400 || response.status === 401) {
			notifyUnAuthorized("Not Authorized, Login Again ");
			handleLogout()
		}
		else if (response.status === 404) {
			notifyWarning("No Supplier found with this name")
			setTimeout(function () { history.push('/suppliers') }, 1000);
		}
		else if (response.status === 200) {
			const newSuppliertransaction = await response.json();
			setSingleSupplierTransaction(SingleSupplierTransaction.concat(newSuppliertransaction));
			notifySuccess("Supplier Transaction Added Succcessfully")
		}
		else {
			notifyError("Some Error happenend at Server side");
		}
	}

	//Update an existing supplierTransaction  using: PUT "/api/supplier/updatetransactions/" function no 8
	const updateSupplierTransaction = async (transactionid, singlesupplierid, purchase_singleSupplier, payment_singleSupplier, billdetails, billNo, date) => {
		try {
			const response = await fetch(`${host}/api/supplier/updateSupplierTransaction/${transactionid}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					"auth-token": localStorage.getItem('token'),
					"supplier-token": singlesupplierid
				},
				body: JSON.stringify({ purchase_singleSupplier, payment_singleSupplier, billdetails, billNo, date })
			});
			if (response.status === 200) {
				// Logic to edit in client
				for (let index = 0; index < SingleSupplierTransaction.length; index++) {
					const element = SingleSupplierTransaction[index];
					if (element._id === transactionid) {
						if (date)
							SingleSupplierTransaction[index].date = date;
						if (purchase_singleSupplier)
							SingleSupplierTransaction[index].purchase_singleSupplier = purchase_singleSupplier;
						if (payment_singleSupplier)
							SingleSupplierTransaction[index].payment_singleSupplier = payment_singleSupplier;
						if (billdetails)
							SingleSupplierTransaction[index].billdetails = billdetails;
						if (billNo)
							SingleSupplierTransaction[index].billNo = billNo;
						break;
					}
				}
				setSingleSupplierTransaction(SingleSupplierTransaction)
				notifySuccess("Supplier Transaction  Updated Succcessfully")
				history.push('/singlesupplier');
			}
			else if (response.status === 400 || response.status === 401) {
				notifyUnAuthorized("Not Authorized, Login Again ");
				handleLogout()
			}
			else {
				notifyError("Some Error happenend at Server side");
			}
		}
		catch (error) {
			notifyError("Some Error happenend at Server side");
			handleLogout()
		}
	}

	// fetch balance of each supplier function no 9
	const getSupplierBalance = async () => {
		try {
			const response = await fetch(`${host}/api/supplier/getSupplierBalance`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					"auth-token": localStorage.getItem('token')

				}
			});
			if (response.status === 400 || response.status === 401) {
				notifyError("Unauthorized User Access");
				handleLogout()
			}
			else if (response.status === 200) {
				const data = await response.json();
				console.log(data);
				if (data === null) {
					dispatch({ type: 'FETCH_SUCCESS', payload: [] })
				}
				else
					dispatch({ type: 'FETCH_SUCCESS', payload: data })
			}
			else if (response.status === 500) {
				dispatch({ type: 'FETCH_ERROR' })
				notifyError("Some Error happenend at Server side");
			}
		}
		catch (error) {
			dispatch({ type: 'FETCH_ERROR' })
			notifyError("Some Error happenend at Server side");
		}
	}

	return (
		<SupplierContext.Provider value={
			{
				suppliers, //contains all suppliers
				getSuppliers, //fetches all suppliers from database
				addSupplier, // add a new supplier to database
				editSupplier, // edit a given supplier from a datbase
				deleteSupplier, // delete a given supplier from a datbase
				singleSupplierDetail, // contains information about a given supplier
				getSingleSupplierDetail,// fetches information about a single supplier

				SingleSupplierTransaction, // contains information about a given supplier

				getSingleSupplierTransactions, // fetches all transaction of a given supplier
				addSingleSupplierTransaction,// adds a new transaction for a given supplier
				updateSupplierTransaction, // update existing transaction for a given supplier
				getSupplierBalance, // fetch balance of all supplier
				supplierstate: state,  // contains balance of all supplier
				SingleTransactionOfParticularSupplier, // contains info about a single transaction of a particular supplier 
				setSingleTransactionOfParticularSupplier //  sets info about a single transaction of a particular supplier 
			}
		}>
			{props.children}
		</SupplierContext.Provider>
	)

}
export default SupplierState;