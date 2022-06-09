import {
	SUPPLIER_GET_REQUEST,
	SUPPLIER_GET_SUCCESS,
	SUPPLIER_GET_FAIL,

	SUPPLIER_APPEND_SUCCESS,
	SUPPLIER_UPDATE_SUCCESS,
	SUPPLIER_REMOVE_SUCCESS,

	SUPPLIER_ADDING_REQUEST,
	SUPPLIER_ADDING_SUCCESS,
	SUPPLIER_ADDING_FAIL,

	SUPPLIER_EDIT_REQUEST,
	SUPPLIER_EDIT_SUCCESS,
	SUPPLIER_EDIT_FAIL,

	SUPPLIER_DELETE_REQUEST,
	SUPPLIER_DELETE_SUCCESS,
	SUPPLIER_DELETE_FAIL,

	SINGLE_SUPPLIER_TRANSACTION_GET_REQUEST,
	SINGLE_SUPPLIER_TRANSACTION_GET_SUCCESS,
	SINGLE_SUPPLIER_TRANSACTION_GET_FAIL,

	SINGLE_SUPPLIER_TRANSACTION_ADDING_REQUEST,
	SINGLE_SUPPLIER_TRANSACTION_ADDING_SUCCESS,
	SINGLE_SUPPLIER_TRANSACTION_ADDING_FAIL,

	SINGLE_SUPPLIER_TRANSACTION_APPEND_SUCCESS,
	SINGLE_SUPPLIER_TRANSACTION_UPDATE_SUCCESS,

	SINGLE_SUPPLIER_TRANSACTION_EDIT_REQUEST,
	SINGLE_SUPPLIER_TRANSACTION_EDIT_SUCCESS,
	SINGLE_SUPPLIER_TRANSACTION_EDIT_FAIL,

	SUPPLIERS_BALANCE_GET_REQUEST,
	SUPPLIERS_BALANCE_GET_SUCCESS,
	SUPPLIERS_BALANCE_GET_FAIL,

	SINGLE_SUPPLIER_DETAILS_FETCH_REQUEST,
	SINGLE_SUPPLIER_DETAILS_FETCH_SUCCESS,
	SINGLE_SUPPLIER_DETAILS_FETCH_ERROR,

	SINGLE_SUPPLIER_DETAILS_UPDATE_SUCCESS,
	SINGLE_SUPPLIER_DETAILS_DELETE_SUCCESS,

} from "../constants/supplierConstant";
import { handleLogout } from './userAction'
import { notifyError, notifySuccess, notifyUnAuthorized, notifyWarning } from '../alert';


// const host = "https://khatabook-app.herokuapp.com"
const host = "http://localhost:5000"

export const getSuppliers = () => async (dispatch) => {
	try {
		// console.log("starting dispatching get suppliers");
		dispatch({
			type: SUPPLIER_GET_REQUEST,
		});
		const response = await fetch(`${host}/api/supplier/getsuppliers`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			}
		});

		if (response.status === 401) {
			notifyUnAuthorized("Not Authorized, Login Again ");
			dispatch({
				type: SUPPLIER_GET_FAIL,
				payload: "Not Authorized, Login Again ",
			});
			dispatch(handleLogout());
		}
		else if (response.status === 200) {
			const json = await response.json()
			// console.log(json);
			dispatch({
				type: SUPPLIER_GET_SUCCESS,
				payload: json,
			});
		}
		else {
			dispatch({
				type: SUPPLIER_GET_FAIL,
				payload: "SUPPLIER FETCHING FAILED",
			});
			notifyError("SUPPLIER FETCHING FAILED");
		}
	} catch (error) {
		dispatch({
			type: SUPPLIER_GET_FAIL,
			payload: "FETCHING SUPPLIER FAILED"
		});
		notifyError("FETCHING SUPPLIER FAILED");
	}
};

export const addSupplier = (history, name, phone) => async (dispatch) => {
	try {
		dispatch({
			type: SUPPLIER_ADDING_REQUEST
		})
		const response = await fetch(`${host}/api/supplier/addsupplier`, {
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
				type: SUPPLIER_ADDING_FAIL,
				payload: "Not Authorized, Login Again",
			});
			dispatch(handleLogout());
		}

		else if (response.status === 409) {
			dispatch({
				type: SUPPLIER_ADDING_FAIL,
				payload: "Supplier Already Exists"
			});
			notifyWarning("Supplier Already Exists")
		}

		else if (response.status === 200) {
			const supplier = await response.json();

			dispatch({
				type: SUPPLIER_ADDING_SUCCESS,
			})
			dispatch({
				type: SUPPLIER_APPEND_SUCCESS,
				payload: supplier
			})
			localStorage.setItem("SingleSupplierId", supplier._id)
			notifySuccess("Supplier Added Succcessfully")
			history.push('/suppliers')
		}

		else {
			dispatch({
				type: SUPPLIER_ADDING_FAIL,
			})
			notifyError("Supplier Adding Failed");
		}
	}
	catch (e) {
		console.log(e)
		dispatch({
			type: SUPPLIER_ADDING_FAIL,
		})
		notifyError("Supplier Adding Failed");
	}
}

export const editSupplier = (id, name, phone) => async (dispatch) => {
	try {
		dispatch({
			type: SUPPLIER_EDIT_REQUEST
		})
		const response = await fetch(`${host}/api/supplier/updatesupplier/${id}`, {
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
				type: SUPPLIER_EDIT_FAIL,
				payload: "Not Authorized, Login Again ",
			});
			dispatch(handleLogout());
		}
		else if (response.status === 404) {
			dispatch({
				type: SUPPLIER_EDIT_FAIL,
				payload: "No Supplier found with this phone number"
			})
			notifyWarning("No Supplier found with this phone number")
		}
		else if (response.status === 409) {
			dispatch({
				type: SUPPLIER_EDIT_FAIL,
				payload: "Supplier with given Phone number  already exist"
			})
			notifyError("Supplier with given Phone number  already exist")
		}
		else if (response.status === 200) {
			// console.log(id, title, name, phone)
			dispatch({ type: SUPPLIER_EDIT_SUCCESS })
			dispatch({ type: SUPPLIER_UPDATE_SUCCESS, payload: { id, name, phone } })
			dispatch({ type: SINGLE_SUPPLIER_DETAILS_UPDATE_SUCCESS, payload: { id, name, phone } });
			notifySuccess("Supplier Details Updated  Succcessfully")
		}
		else {
			dispatch({
				type: SUPPLIER_EDIT_FAIL,
				payload: "Supplier UPDATION FAILED"
			})
			notifyError("Supplier UPDATION FAILED");
		}
	}
	catch (e) {
		console.log(e);
		dispatch({
			type: SUPPLIER_EDIT_FAIL,
			payload: "Supplier UPDATION FAILED"
		})
		notifyError("Supplier UPDATION FAILED");
	}
}

export const deleteSupplier = (id, history) => async (dispatch) => {
	try {
		dispatch({ type: SUPPLIER_DELETE_REQUEST })
		const response = await fetch(`${host}/api/supplier/deletesupplier/${id}`, {
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
				type: SUPPLIER_DELETE_FAIL,
				payload: "Not Authorized, Login Again",
			});
			dispatch(handleLogout());
		}
		else if (response.status === 404) {
			dispatch({
				type: SUPPLIER_DELETE_FAIL,
				payload: "No Supplier found with this phone number",
			});
			notifyWarning("No Supplier found with this phone number")
		}
		else if (response.status === 200) {
			// console.log("dispatch SUPPLIER_DELETE_SUCCESS starts")
			dispatch({ type: SUPPLIER_DELETE_SUCCESS })
			// console.log("dispatch SUPPLIER_DELETE_SUCCESS ends")
			// console.log("dispatch SUPPLIER_REMOVE_SUCCESS starts")
			dispatch({ type: SUPPLIER_REMOVE_SUCCESS, payload: id })
			// console.log("dispatch SUPPLIER_REMOVE_SUCCESS ends")
			// console.log("dispatch SINGLE_SUPPLIER_DETAILS_DELETE_SUCCESS starts")
			dispatch({ type: SINGLE_SUPPLIER_DETAILS_DELETE_SUCCESS });
			// console.log("dispatch SINGLE_SUPPLIER_DETAILS_DELETE_SUCCESS ends")
			notifySuccess("Supplier Deleted Succcessfully")
			history.push('/suppliers');
		}
		else {
			dispatch({
				type: SUPPLIER_DELETE_FAIL,
				payload: "Supplier Deletion Failed",
			});
			notifyError("Supplier Deletion Failed");
		}
	}
	catch (e) {
		dispatch({
			type: SUPPLIER_DELETE_FAIL,
			payload: "Supplier Deletion Failed",
		});
		notifyError("Supplier Deletion Failed");
	}

}

export const getSingleSupplierDetail = (id) => async (dispatch) => {
	try {
		dispatch({ type: SINGLE_SUPPLIER_DETAILS_FETCH_REQUEST });
		const response = await fetch(`${host}/api/supplier/getSingleSupplierDetail/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			}
		});
		if (response.status === 404) {
			dispatch({
				type: SINGLE_SUPPLIER_DETAILS_FETCH_ERROR,
				payload: "No Supplier found with this name"
			});
			notifyWarning("No Supplier found with this name")
		}
		else if (response.status === 401) {
			dispatch({
				type: SINGLE_SUPPLIER_DETAILS_FETCH_ERROR,
				payload: "Not Authorized, Login Again"
			});
			notifyUnAuthorized("Not Authorized, Login Again ");
			dispatch(handleLogout());
		}
		else if (response.status === 200) {
			const json = await response.json();
			dispatch({ type: SINGLE_SUPPLIER_DETAILS_FETCH_SUCCESS, payload: json })

		}
		else {
			dispatch({ type: SINGLE_SUPPLIER_DETAILS_FETCH_ERROR, payload: "Fetching Supplier Details Failed" });
			notifyError("Fetching Supplier Details Failed");
		}
	} catch (e) {
		dispatch({ type: SINGLE_SUPPLIER_DETAILS_FETCH_ERROR, payload: "Fetching Supplier Details Failed" });
		notifyError("Fetching Supplier Details Failed");
	}

}

export const getSingleSupplierTransactions = (id) => async (dispatch) => {
	try {
		dispatch({ type: SINGLE_SUPPLIER_TRANSACTION_GET_REQUEST });
		const response = await fetch(`${host}/api/supplier/getSupplierTransactions/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')

			}
		});
		if (response.status === 400 || response.status === 401) {
			dispatch({
				type: SINGLE_SUPPLIER_TRANSACTION_GET_FAIL,
				payload: "Not Authorized, Login Again"
			});
			notifyUnAuthorized("Not Authorized, Login Again");
			dispatch(handleLogout());
		}
		else if (response.status === 200) {
			const json = await response.json()
			dispatch({
				type: SINGLE_SUPPLIER_TRANSACTION_GET_SUCCESS,
				payload: json
			});
		}
		else {
			dispatch({
				type: SINGLE_SUPPLIER_TRANSACTION_GET_FAIL,
				payload: "Fetching Supplier Transaction Failed",
			});
			notifyError("Fetching Supplier Transaction Failed");
		}
	}
	catch (e) {
		dispatch({
			type: SINGLE_SUPPLIER_TRANSACTION_GET_FAIL,
			payload: "Fetching Supplier Transaction Failed",
		});
		notifyError("Fetching Supplier Transaction Failed");
	}

}

export const addSingleSupplierTransaction = (history, id, purchase_singleSupplier, payment_singleSupplier, billDetails, billNo, date) => async (dispatch) => {
	try {
		if (billDetails === "")
			billDetails = null
		if (billNo === "")
			billNo = null
		dispatch({ type: SINGLE_SUPPLIER_TRANSACTION_ADDING_REQUEST })
		const response = await fetch(`${host}/api/supplier/addSupplierTransaction/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			},
			body: JSON.stringify({ purchase_singleSupplier, payment_singleSupplier, billDetails, billNo, date })
		});
		console.log(response.status);
		if (response.status === 400 || response.status === 401) {
			dispatch({
				type: SINGLE_SUPPLIER_TRANSACTION_ADDING_FAIL,
				payload: "Not Authorized, Login Again"
			})
			notifyUnAuthorized("Not Authorized, Login Again ");
			dispatch(handleLogout());
		}
		else if (response.status === 200) {
			console.log("succesfully added transaction in database")
			const newSuppliertransaction = await response.json();
			console.log("now dispatching details in redux state")
			console.log(" dispatching SINGLE_SUPPLIER_TRANSACTION_ADDING_SUCCESS ")
			dispatch({ type: SINGLE_SUPPLIER_TRANSACTION_ADDING_SUCCESS })
			console.log(" Ending SINGLE_SUPPLIER_TRANSACTION_ADDING_SUCCESS ")
			console.log(" Dispatching SINGLE_SUPPLIER_TRANSACTION_APPEND_SUCCESS ")
			dispatch({
				type: SINGLE_SUPPLIER_TRANSACTION_APPEND_SUCCESS,
				payload: newSuppliertransaction
			})
			console.log(" Ending SINGLE_SUPPLIER_TRANSACTION_APPEND_SUCCESS ")
			notifySuccess("Transaction Added Succcessfully")
			history.push('/singlesupplier')
		}
		else {
			dispatch({
				type: SINGLE_SUPPLIER_TRANSACTION_ADDING_FAIL,
				payload: "Transaction Adding Failed"
			})
			notifyError("Transaction Adding Failed");
		}
	}
	catch (e) {
		console.log(e)
		dispatch({
			type: SINGLE_SUPPLIER_TRANSACTION_ADDING_FAIL,
			payload: "Transaction Adding Failed"
		})
		notifyError("Transaction Adding Failed");
	}
}

export const updateSupplierTransaction = (history, transactionid, singlesupplierid, purchase_singleSupplier, payment_singleSupplier, billdetails, billNo, date) => async (dispatch) => {
	try {
		console.log("dispatching request")
		dispatch({ type: SINGLE_SUPPLIER_TRANSACTION_EDIT_REQUEST })
		const response = await fetch(`${host}/api/supplier/updateSupplierTransaction/${transactionid}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token'),
				"supplier-token": singlesupplierid
			},
			body: JSON.stringify({ purchase_singleSupplier, payment_singleSupplier, billdetails, billNo, date })
		});
		console.log(response.status)
		if (response.status === 200) {
			console.log(response.status)
			dispatch({ type: SINGLE_SUPPLIER_TRANSACTION_EDIT_SUCCESS })
			console.log("hihihi")
			dispatch({ type: SINGLE_SUPPLIER_TRANSACTION_UPDATE_SUCCESS, payload: { transactionid, purchase_singleSupplier, payment_singleSupplier, billdetails, billNo, date } })
			console.log("hohoho")
			notifySuccess("Supplier Transaction  Updated Succcessfully")
			history.push('/singlesupplier');
		}
		else if (response.status === 400 || response.status === 401) {
			dispatch({ type: SINGLE_SUPPLIER_TRANSACTION_EDIT_FAIL })
			notifyUnAuthorized("Not Authorized, Login Again");
			dispatch(handleLogout());
		}
		else {
			dispatch({
				type: SINGLE_SUPPLIER_TRANSACTION_EDIT_FAIL,
				payload: "Supplier Transaction Updation Failed"
			})
			notifyError("Supplier Transaction Updation Failed");
		}
	}
	catch (error) {
		console.log(error);
		dispatch({
			type: SINGLE_SUPPLIER_TRANSACTION_EDIT_FAIL,
			payload: "Supplier Transaction Updation Failed"
		})
		notifyError("Supplier Transaction Updation Failed");
	}
}

export const getSupplierBalance = () => async (dispatch) => {
	try {
		// console.log("starting dispatching get suppliers");
		dispatch({ type: SUPPLIERS_BALANCE_GET_REQUEST });
		const response = await fetch(`${host}/api/supplier/getSupplierBalance`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')

			}
		});
		// console.log("ending dispatching get suppliers");
		// console.log("response code is ",response.status);
		if (response.status === 401) {
			dispatch({ type: SUPPLIERS_BALANCE_GET_FAIL, payload: "Not Authorized, Login Again" });
			notifyUnAuthorized("Not Authorized, Login Again");
			dispatch(handleLogout());
		}
		else if (response.status === 200) {
			const data = await response.json();
			// console.log(data);
			dispatch({ type: SUPPLIERS_BALANCE_GET_SUCCESS, payload: data })
		}
		else {
			dispatch({
				type: SUPPLIERS_BALANCE_GET_FAIL,
				payload: "Supplier Balance Fetching Failed"
			})
			notifyError("Supplier Balance Fetching Failed");
		}
	}
	catch (error) {
		dispatch({
			type: SUPPLIERS_BALANCE_GET_FAIL,
			payload: "Supplier Balance Fetching Failed"
		})
		notifyError("Supplier Balance Fetching Failed");
	}
}
