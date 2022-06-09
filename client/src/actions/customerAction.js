import {
	CUSTOMER_GET_REQUEST,
	CUSTOMER_GET_SUCCESS,
	CUSTOMER_GET_FAIL,

	CUSTOMER_APPEND_SUCCESS,
	CUSTOMER_UPDATE_SUCCESS,
	CUSTOMER_REMOVE_SUCCESS,

	CUSTOMER_ADDING_REQUEST,
	CUSTOMER_ADDING_SUCCESS,
	CUSTOMER_ADDING_FAIL,

	CUSTOMER_EDIT_REQUEST,
	CUSTOMER_EDIT_SUCCESS,
	CUSTOMER_EDIT_FAIL,

	CUSTOMER_DELETE_REQUEST,
	CUSTOMER_DELETE_SUCCESS,
	CUSTOMER_DELETE_FAIL,

	SINGLE_CUSTOMER_TRANSACTION_GET_REQUEST,
	SINGLE_CUSTOMER_TRANSACTION_GET_SUCCESS,
	SINGLE_CUSTOMER_TRANSACTION_GET_FAIL,

	SINGLE_CUSTOMER_TRANSACTION_ADDING_REQUEST,
	SINGLE_CUSTOMER_TRANSACTION_ADDING_SUCCESS,
	SINGLE_CUSTOMER_TRANSACTION_ADDING_FAIL,

	SINGLE_CUSTOMER_TRANSACTION_APPEND_SUCCESS,
	SINGLE_CUSTOMER_TRANSACTION_UPDATE_SUCCESS,

	SINGLE_CUSTOMER_TRANSACTION_EDIT_REQUEST,
	SINGLE_CUSTOMER_TRANSACTION_EDIT_SUCCESS,
	SINGLE_CUSTOMER_TRANSACTION_EDIT_FAIL,

	CUSTOMERS_BALANCE_GET_REQUEST,
	CUSTOMERS_BALANCE_GET_SUCCESS,
	CUSTOMERS_BALANCE_GET_FAIL,

	SINGLE_CUSTOMER_DETAILS_FETCH_REQUEST,
	SINGLE_CUSTOMER_DETAILS_FETCH_SUCCESS,
	SINGLE_CUSTOMER_DETAILS_FETCH_ERROR,

	SINGLE_CUSTOMER_DETAILS_UPDATE_SUCCESS,
	SINGLE_CUSTOMER_DETAILS_DELETE_SUCCESS,

} from "../constants/customerConstant";
import { handleLogout } from './userAction'
import { notifyError, notifySuccess, notifyUnAuthorized, notifyWarning } from '../alert';


// const host = "https://khatabook-app.herokuapp.com"
const host = "http://localhost:5000"

export const getCustomers = () => async (dispatch) => {
	try {
		dispatch({
			type: CUSTOMER_GET_REQUEST,
		});
		const response = await fetch(`${host}/api/customer/getcustomers`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			}
		});
		if (response.status === 401) {
			notifyUnAuthorized("Not Authorized, Login Again ");
			dispatch({
				type: CUSTOMER_GET_FAIL,
				payload: "Not Authorized, Login Again ",
			});
			dispatch(handleLogout());
		}
		else if (response.status === 200) {
			const json = await response.json()
			dispatch({
				type: CUSTOMER_GET_SUCCESS,
				payload: json,
			});
		}
		else {
			dispatch({
				type: CUSTOMER_GET_FAIL,
				payload: "CUSTOMER FETCHING FAILED",
			});
			notifyError("CUSTOMER FETCHING FAILED");
		}
	} catch (error) {
		dispatch({
			type: CUSTOMER_GET_FAIL,
			payload: "FETCHING CUSTOMER FAILED"
		});
		notifyError("FETCHING CUSTOMER FAILED");
	}
};

export const addCustomer = (history, name, phone) => async (dispatch, getState) => {
	try {
		dispatch({
			type: CUSTOMER_ADDING_REQUEST
		})
		const response = await fetch(`${host}/api/customer/addcustomer`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			},
			body: JSON.stringify({ name, phone })
		});
		// console.log(response.status)
		if (response.status === 401) {
			notifyUnAuthorized("Not Authorized, Login Again ");
			dispatch({
				type: CUSTOMER_ADDING_FAIL,
				payload: "Not Authorized, Login Again",
			});
			dispatch(handleLogout());
		}

		else if (response.status === 409) {
			dispatch({
				type: CUSTOMER_ADDING_FAIL,
				payload: "Customer With Similar Phone No. Already Exists"
			});
			notifyWarning("Customer With Similar Phone No. Already Exists")
		}

		else if (response.status === 200) {
			const customer = await response.json();

			dispatch({
				type: CUSTOMER_ADDING_SUCCESS,
			})
			dispatch({
				type: CUSTOMER_APPEND_SUCCESS,
				payload: customer
			})
			localStorage.setItem("SingleCustomerId", customer._id)
			notifySuccess("Customer Added Succcessfully")
			history.push('/customers')
		}

		else {
			dispatch({
				type: CUSTOMER_ADDING_FAIL,
			})
			notifyError("Customer Adding Failed");
		}
	}
	catch (e) {
		console.log(e)
		dispatch({
			type: CUSTOMER_ADDING_FAIL,
		})
		notifyError("Customer Adding Failed");
	}
}

export const editCustomer = (id, name, phone) => async (dispatch) => {
	try {
		dispatch({
			type: CUSTOMER_EDIT_REQUEST
		})
		const response = await fetch(`${host}/api/customer/updatecustomer/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			},
			body: JSON.stringify({ name, phone })
		});
		if (response.status === 401) {
			notifyUnAuthorized("Not Authorized, Login Again ");
			dispatch({
				type: CUSTOMER_EDIT_FAIL,
				payload: "Not Authorized, Login Again ",
			});
			dispatch(handleLogout());
		}
		else if (response.status === 404) {
			dispatch({
				type: CUSTOMER_EDIT_FAIL,
				payload: "No Customer found with this name"
			})
			notifyWarning("No Customer found with this name")
		}
		else if (response.status === 409) {
			dispatch({
				type: CUSTOMER_EDIT_FAIL,
				payload: "Customer with given Phone number  already exist"
			})
			notifyError("Customer with given Phone number  already exist")
		}
		else if (response.status === 200) {
			// console.log(id, title, name, phone)
			dispatch({ type: CUSTOMER_EDIT_SUCCESS })
			dispatch({ type: CUSTOMER_UPDATE_SUCCESS, payload: { id, name, phone } })
			dispatch({ type: SINGLE_CUSTOMER_DETAILS_UPDATE_SUCCESS, payload: { id, name, phone } });
			notifySuccess("Customer Details Updated  Succcessfully")
		}
		else {
			dispatch({
				type: CUSTOMER_EDIT_FAIL,
				payload: "CUSTOMER UPDATION FAILED"
			})
			notifyError("CUSTOMER UPDATION FAILED");
		}
	}
	catch (e) {
		console.log(e);
		dispatch({
			type: CUSTOMER_EDIT_FAIL,
			payload: "CUSTOMER UPDATION FAILED"
		})
		notifyError("CUSTOMER UPDATION FAILED");
	}
}

export const deleteCustomer = (id, history) => async (dispatch) => {
	try {
		dispatch({ type: CUSTOMER_DELETE_REQUEST })
		const response = await fetch(`${host}/api/customer/deletecustomer/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			}
		});
		// console.log("response code is", response.status);
		if (response.status === 400 || response.status === 401) {
			notifyUnAuthorized("Not Authorized, Login Again");
			dispatch({
				type: CUSTOMER_DELETE_FAIL,
				payload: "Not Authorized, Login Again",
			});
			dispatch(handleLogout());
		}
		else if (response.status === 404) {
			dispatch({
				type: CUSTOMER_DELETE_FAIL,
				payload: "No Customer found with this name",
			});
			notifyWarning("No Customer found with this name")
		}
		else if (response.status === 200) {
			// console.log("dispatch CUSTOMER_DELETE_SUCCESS starts")
			dispatch({ type: CUSTOMER_DELETE_SUCCESS })
			// console.log("dispatch CUSTOMER_DELETE_SUCCESS ends")
			// console.log("dispatch CUSTOMER_REMOVE_SUCCESS starts")
			dispatch({ type: CUSTOMER_REMOVE_SUCCESS, payload: id })
			// console.log("dispatch CUSTOMER_REMOVE_SUCCESS ends")
			// console.log("dispatch SINGLE_CUSTOMER_DETAILS_DELETE_SUCCESS starts")
			dispatch({ type: SINGLE_CUSTOMER_DETAILS_DELETE_SUCCESS });
			// console.log("dispatch SINGLE_CUSTOMER_DETAILS_DELETE_SUCCESS ends")
			notifySuccess("Customer Deleted Succcessfully")
			history.push('/customers');
		}
		else {
			dispatch({
				type: CUSTOMER_DELETE_FAIL,
				payload: "Customer Deletion Failed",
			});
			notifyError("Customer Deletion Failed");
		}
	}
	catch (e) {
		dispatch({
			type: CUSTOMER_DELETE_FAIL,
			payload: "Customer Deletion Failed",
		});
		notifyError("Customer Deletion Failed");
	}

}

export const getSingleCustomerDetail = (id) => async (dispatch) => {
	try {
		dispatch({ type: SINGLE_CUSTOMER_DETAILS_FETCH_REQUEST });
		const response = await fetch(`${host}/api/customer/getSingleCustomerDetail/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			}
		});
		if (response.status === 404) {
			dispatch({
				type: SINGLE_CUSTOMER_DETAILS_FETCH_ERROR,
				payload: "No Customer found with this name"
			});
			notifyWarning("No Customer found with this name")
		}
		else if (response.status === 401) {
			dispatch({
				type: SINGLE_CUSTOMER_DETAILS_FETCH_ERROR,
				payload: "Not Authorized, Login Again"
			});
			notifyUnAuthorized("Not Authorized, Login Again ");
			dispatch(handleLogout());
		}
		else if (response.status === 200) {
			const json = await response.json();
			dispatch({ type: SINGLE_CUSTOMER_DETAILS_FETCH_SUCCESS, payload: json })

		}
		else {
			dispatch({ type: SINGLE_CUSTOMER_DETAILS_FETCH_ERROR, payload: "Fetching Customer Details Failed" });
			notifyError("Fetching Customer Details Failed");
		}
	} catch (e) {
		dispatch({ type: SINGLE_CUSTOMER_DETAILS_FETCH_ERROR, payload: "Fetching Customer Details Failed" });
		notifyError("Fetching Customer Details Failed");
	}

}

export const getSingleCustomerTransactions = (id) => async (dispatch) => {
	try {
		dispatch({ type: SINGLE_CUSTOMER_TRANSACTION_GET_REQUEST });
		const response = await fetch(`${host}/api/customer/getCustomerTransactions/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')

			}
		});
		if (response.status === 400 || response.status === 401) {
			dispatch({
				type: SINGLE_CUSTOMER_TRANSACTION_GET_FAIL,
				payload: "Not Authorized, Login Again"
			});
			notifyUnAuthorized("Not Authorized, Login Again");
			dispatch(handleLogout());
		}
		else if (response.status === 200) {
			const json = await response.json()
			dispatch({
				type: SINGLE_CUSTOMER_TRANSACTION_GET_SUCCESS,
				payload: json
			});
		}
		else {
			dispatch({
				type: SINGLE_CUSTOMER_TRANSACTION_GET_FAIL,
				payload: "Fetching Customer Transaction Failed",
			});
			notifyError("Fetching Customer Transaction Failed");
		}
	}
	catch (e) {
		dispatch({
			type: SINGLE_CUSTOMER_TRANSACTION_GET_FAIL,
			payload: "Fetching Customer Transaction Failed",
		});
		notifyError("Fetching Customer Transaction Failed");
	}

}

export const addSingleCustomerTransaction = (history, id, lendamount_singleCustomer, takeamount_singleCustomer, billDetails, billNo, date) => async (dispatch) => {
	try {
		if (billDetails === "")
			billDetails = null
		if (billNo === "")
			billNo = null
		dispatch({ type: SINGLE_CUSTOMER_TRANSACTION_ADDING_REQUEST })
		const response = await fetch(`${host}/api/customer/addCustomerTransaction/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			},
			body: JSON.stringify({ lendamount_singleCustomer, takeamount_singleCustomer, billDetails, billNo, date })
		});
		if (response.status === 400 || response.status === 401) {
			dispatch({
				type: SINGLE_CUSTOMER_TRANSACTION_ADDING_FAIL,
				payload: "Not Authorized, Login Again"
			})
			notifyUnAuthorized("Not Authorized, Login Again ");
			dispatch(handleLogout());
		}
		else if (response.status === 200) {
			const newCustomertransaction = await response.json();
			dispatch({ type: SINGLE_CUSTOMER_TRANSACTION_ADDING_SUCCESS })
			dispatch({
				type: SINGLE_CUSTOMER_TRANSACTION_APPEND_SUCCESS,
				payload: newCustomertransaction
			})
			notifySuccess("Customer Transaction Added Succcessfully")
			history.push('/singlecustomer')
		}
		else {
			dispatch({
				type: SINGLE_CUSTOMER_TRANSACTION_ADDING_FAIL,
				payload: "Transaction Adding Failed"
			})
			notifyError("Transaction Adding Failed");
		}
	}
	catch (e) {
		dispatch({
			type: SINGLE_CUSTOMER_TRANSACTION_ADDING_FAIL,
			payload: "Transaction Adding Failed"
		})
		notifyError("Transaction Adding Failed");
	}
}

export const updateCustomerTransaction = (history, transactionid, singlecustomerid, lendamount_singleCustomer, takeamount_singleCustomer, billdetails, billNo, date) => async (dispatch) => {
	try {
		dispatch({ type: SINGLE_CUSTOMER_TRANSACTION_EDIT_REQUEST })
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
			// console.log(response.status)
			dispatch({ type: SINGLE_CUSTOMER_TRANSACTION_EDIT_SUCCESS })
			// console.log("hihihi")
			dispatch({ type: SINGLE_CUSTOMER_TRANSACTION_UPDATE_SUCCESS, payload: { transactionid, lendamount_singleCustomer, takeamount_singleCustomer, billdetails, billNo, date } })
			// console.log("hohoho")
			notifySuccess("Customer Transaction  Updated Succcessfully")
			history.push('/singlecustomer');
		}
		else if (response.status === 400 || response.status === 401) {
			dispatch({ type: SINGLE_CUSTOMER_TRANSACTION_EDIT_FAIL })
			notifyUnAuthorized("Not Authorized, Login Again");
			dispatch(handleLogout());
		}
		else {
			dispatch({
				type: SINGLE_CUSTOMER_TRANSACTION_EDIT_FAIL,
				payload: "Customer Transaction Updation Failed"
			})
			notifyError("Customer Transaction Updation Failed");
		}
	}
	catch (error) {
		console.log(error);
		dispatch({
			type: SINGLE_CUSTOMER_TRANSACTION_EDIT_FAIL,
			payload: "Customer Transaction Updation Failed"
		})
		notifyError("Customer Transaction Updation Failed");
	}
}

export const getCustomerBalance = () => async (dispatch) => {
	try {
		dispatch({ type: CUSTOMERS_BALANCE_GET_REQUEST });
		const response = await fetch(`${host}/api/customer/getCustomerBalance`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')

			}
		});
		if (response.status === 401) {
			dispatch({ type: CUSTOMERS_BALANCE_GET_FAIL, payload: "Not Authorized, Login Again" });
			notifyUnAuthorized("Not Authorized, Login Again");
			dispatch(handleLogout());
		}
		else if (response.status === 200) {
			const data = await response.json();
			dispatch({ type: CUSTOMERS_BALANCE_GET_SUCCESS, payload: data })
		}
		else {
			dispatch({
				type: CUSTOMERS_BALANCE_GET_FAIL,
				payload: "Customer Balance Fetching Failed"
			})
			notifyError("Customer Balance Fetching Failed");
		}
	}
	catch (error) {
		dispatch({
			type: CUSTOMERS_BALANCE_GET_FAIL,
			payload: "Customer Balance Fetching Failed"
		})
		notifyError("Customer Balance Fetching Failed");
	}
}
