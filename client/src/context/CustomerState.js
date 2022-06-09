import CustomerContext from "./CustomerContext";
import UserContext from "./UserContext";
import { useState, useReducer, useContext } from "react";
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
const CustomerState = (props) => {
	let history = useHistory();
	const host = "https://khatabook-app.herokuapp.com"
	const [customers, setCustomers] = useState([])
	const [SingleCustomerTransaction, setSingleCustomerTransaction] = useState([]);
	const [SingleTransactionOfParticularCustomer, setSingleTransactionOfParticularCustomer] = useState({});
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

	const initialState = {
		loading: true,
		error: '',
		customerBalance: []
	}

	const reducer = (state, action) => {
		switch (action.type) {
			case 'FETCH_SUCCESS':
				return {
					loading: false,
					error: '',
					customerBalance: action.payload
				}
			case 'FETCH_ERROR':
				return {
					loading: false,
					error: 'Something Went wrong!',
					customerBalance: []
				}
			default:
				return state
		}
	}
	const initialStatesingleCustomerDetail = {
		loading: true,
		error: '',
		singleCustomer: {}
	}

	const reducersingleCustomerDetail = (state, action) => {
		switch (action.type) {
			case 'FETCH_SUCCESS':
				return {
					loading: false,
					error: '',
					singleCustomer: action.payload
				}
			case 'FETCH_ERROR':
				return {
					loading: false,
					error: 'Something Went wrong!',
					singleCustomer: {}
				}
			default:
				return state
		}
	}
	const [state, dispatch] = useReducer(reducer, initialState);

	const [singleCustomerDetail, dispatchsingleCustomerDetail] = useReducer(reducersingleCustomerDetail, initialStatesingleCustomerDetail);

	///////////////////////////////////////////////////////////////////////
	// Get all Customers function no 1
	const getCustomers = async () => {
		const response = await fetch(`${host}/api/customer/getcustomers`, {
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
			setCustomers(json);
		}
		else {
			notifyError("Some Error happenend");
		}
	}

	// Add a Customer function no 2
	const addCustomer = async (title, name, phone) => {
		const response = await fetch(`${host}/api/customer/addcustomer`, {
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
			notifyWarning("Customer  already exists")
		}
		else if (response.status === 200) {
			const customer = await response.json();
			setCustomers(customers.concat(customer))
			localStorage.setItem("SingleCustomerId", JSON.stringify(customer._id))
			notifySuccess("Customer Added Succcessfully")
			setTimeout(function () { history.push('/singlecustomer') }, 1000);
		}
		else {
			notifyError("Some Error happenend ");
		}
	}

	// Edit a Customer function no 3
	const editCustomer = async (id, title, name, phone) => {
		console.log(title, name, phone);
		const response = await fetch(`${host}/api/customer/updatecustomer/${id}`, {
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
			notifyWarning("No Customer found with this name")
		}
		else if (response.status === 200) {
			let newCustomers = JSON.parse(JSON.stringify(customers))
			// Logic to edit in client
			for (let index = 0; index < newCustomers.length; index++) {
				const element = newCustomers[index];
				if (element._id === id) {
					newCustomers[index].title = title;
					newCustomers[index].name = name;
					newCustomers[index].phone = phone;
					break;
				}
			}
			setCustomers(newCustomers);
			notifySuccess("Customer Details Updated  Succcessfully")
		}
		else {
			notifyError("Some Error happenend ");
		}

	}

	// Delete a Customer function no 4
	const deleteCustomer = async (id) => {
		const response = await fetch(`${host}/api/customer/deletecustomer/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			}
		});
		console.log(response.status)
		if (response.status === 400 || response.status === 401) {
			notifyUnAuthorized("Not Authorized, Login Again ");
			handleLogout()
		}
		else if (response.status === 404) {
			notifyWarning("No Customer found with this name")
		}
		else if (response.status === 200) {
			// const json = await response.json();
			const newCustomers = customers.filter((customer) => { return customer._id !== id })
			setCustomers(newCustomers);
			notifySuccess("Customer Deleted Succcessfully")
			setTimeout(function () { history.push('/customers') }, 1000);
		}
		else {
			notifyError("Some Error happenend ");
		}

	}

	// Get single Customer function no 5
	const getSingleCustomerDetail = async (id) => {
		const response = await fetch(`${host}/api/customer/getSingleCustomerDetail/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			}
		});
		if (response.status === 404) {
			dispatchsingleCustomerDetail({ type: 'FETCH_ERROR' });
			notifyWarning("No Customer found with this name")
			setTimeout(function () { history.push('/customers') }, 1000);
		}
		else if (response.status === 401) {
			dispatchsingleCustomerDetail({ type: 'FETCH_ERROR' });
			notifyUnAuthorized("Not Authorized, Login Again ");
			handleLogout()
		}
		else if (response.status === 200) {
			const json = await response.json();
			dispatchsingleCustomerDetail({ type: 'FETCH_SUCCESS', payload: json })
		}
		else {
			notifyError("Some Error happenend at Server side");
		}
	}

	//get single customer transcation function no 6
	const getSingleCustomerTransactions = async (id) => {
		const response = await fetch(`${host}/api/customer/getCustomerTransactions/${id}`, {
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
			notifyWarning("No Customer found with this name")
			setTimeout(function () { history.push('/customers') }, 1000);
		}
		else if (response.status === 200) {
			const json = await response.json()
			setSingleCustomerTransaction(json);
		}
		else {
			notifyError("Some Error happenend at Server side");
		}
	}

	//  add a transaction  using: post "/api/customer/addCustomerTransaction/" function no 7

	const addSingleCustomerTransaction = async (id, lendamount_singleCustomer, takeamount_singleCustomer, billDetails, billNo, date) => {
		if (billDetails === "")
			billDetails = null
		if (billNo === "")
			billNo = null
		const response = await fetch(`${host}/api/customer/addCustomerTransaction/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			},
			body: JSON.stringify({ lendamount_singleCustomer, takeamount_singleCustomer, billDetails, billNo, date })
		});
		if (response.status === 400 || response.status === 401) {
			notifyUnAuthorized("Not Authorized, Login Again ");
			handleLogout()
		}
		else if (response.status === 404) {
			notifyWarning("No Customer found with this name")
			setTimeout(function () { history.push('/customers') }, 1000);
		}
		else if (response.status === 200) {
			const newCustomertransaction = await response.json();
			setSingleCustomerTransaction(SingleCustomerTransaction.concat(newCustomertransaction))
			//////////////////////////////////////////////////////////
			// let amounttoget = 0, amounttogive = 0;
			// if (lendamount_singleCustomer > 0) {
			// 	amounttoget = lendamount_singleCustomer;
			// }
			// else {
			// 	amounttogive = takeamount_singleCustomer;
			// }
			// let { customerBalance } = state;
			// const result = customerBalance.filter(item => item.customer === id);
			// if (result[0]){
			// 	amounttoget = amounttoget + result[0].amounttoget;
			// 	amounttogive += result[0].amounttogive;

			// }
			///////////////////////////////////////
			notifySuccess("Customer Transaction Added Succcessfully", "success")

		}
		else {
			notifyError("Some Error happenend at Server side");
		}
	}

	//	 Update an existing customerTransaction  using: PUT "/api/customer/updatetransactions/" function no 8
	const updateCustomerTransaction = async (transactionid, singlecustomerid, lendamount_singleCustomer, takeamount_singleCustomer, billdetails, billNo, date) => {
		try {
			const response = await fetch(`${host}/api/customer/updateCustomerTransaction/${transactionid}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					"auth-token": localStorage.getItem('token'),
					"cust-token": singlecustomerid
				},
				body: JSON.stringify({ lendamount_singleCustomer, takeamount_singleCustomer, billdetails, billNo, date })
			});
			if (response.status === 200) {
				// const newCustomerTransaction = {};
				// if (date) { newCustomerTransaction.date = date };
				// if (lendamount) { newCustomerTransaction.lendamount = lendamount };
				// if (takeamount) { newCustomerTransaction.takeamount = takeamount };
				// Logic to edit in client
				for (let index = 0; index < SingleCustomerTransaction.length; index++) {
					const element = SingleCustomerTransaction[index];
					if (element._id === transactionid) {
						if (date)
							SingleCustomerTransaction[index].date = date;
						if (lendamount_singleCustomer)
							SingleCustomerTransaction[index].lendamount_singleCustomer = lendamount_singleCustomer;
						if (takeamount_singleCustomer)
							SingleCustomerTransaction[index].takeamount_singleCustomer = takeamount_singleCustomer;
						if (billdetails)
							SingleCustomerTransaction[index].billdetails = billdetails;
						if (billNo)
							SingleCustomerTransaction[index].billNo = billNo;
						break;
					}
				}
				setSingleCustomerTransaction(SingleCustomerTransaction)
				notifySuccess("Customer Transaction  Updated Succcessfully")
				history.push('/singlecustomer');
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
	// fetch balance of every customer function no 9
	const getCustomerBalance = async () => {
		try {
			const response = await fetch(`${host}/api/customer/getCustomerBalance`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					"auth-token": localStorage.getItem('token')

				}
			});
			if (response.status === 400 || response.status === 401) {
				notifyUnAuthorized("Unauthorized User Access");
				handleLogout()
			}
			else if (response.status === 200) {
				const data = await response.json();
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
		<CustomerContext.Provider value={
			{
				customers, // Contains all customers
				getCustomers,  //fetches all customers from database
				addCustomer,   //add a new customer to database
				deleteCustomer, // delete a given customer from database
				editCustomer,   // edit a given customer from a database
				singleCustomerDetail, //contains information about a given customer 
				getSingleCustomerDetail,// fetches information about a single customer
				SingleCustomerTransaction, // contains all  transactions for a customer
				getSingleCustomerTransactions,  // fetches all transcations of a given customer
				addSingleCustomerTransaction, //  adds a new transaction for a given customer
				updateCustomerTransaction, // update existing transaction for a given customer
				getCustomerBalance,// fetch balance of all customer
				customerstate: state,  // contains balance of all customer  
				SingleTransactionOfParticularCustomer, // contains info about a single transaction of a particular customer 
				setSingleTransactionOfParticularCustomer,// sets info about a single transaction of a particular customer 
				notifySuccess, notifyError, notifyWarning, notifyUnAuthorized,
			}
		}>
			{props.children}
		</CustomerContext.Provider>
	)

}
export default CustomerState;