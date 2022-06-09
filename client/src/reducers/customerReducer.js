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

export const getCustomersReducer = (state = { loading: true, customers: [], error: null }, action) => {
	switch (action.type) {

		case CUSTOMER_GET_REQUEST:
			return { ...state, loading: true, customers: null, error: null };

		case CUSTOMER_GET_SUCCESS:
			return { ...state, loading: false, customers: action.payload, error: null };

		case CUSTOMER_APPEND_SUCCESS:
			let x = state.customers
			x.push(action.payload)
			// console.log(x);
			return {
				...state, customers: x
			};

		case CUSTOMER_UPDATE_SUCCESS:
			let { id,  name, phone } = action.payload
			let y = state.customers
			for (let index = 0; index < y.length; index++) {
				const element = y[index];
				if (element._id === id) {
					y[index].name = name;
					y[index].phone = phone;
					break;
				}
			}
			console.log(y)
			return {
				...state, customers: y
			};


		// return {
		// 	...state,
		// 	customers: state.customers.map(customer => {
		// 		if (customer._id !== id) {
		// 			return customer
		// 		}
		// 		return {
		// 			...customer,
		// 			title: title,
		// 			name: name,
		// 			phone: phone,
		// 		}
		// 	})
		// }


		// let { id, title, name, phone } = action.payload

		// state.customers.map((customer) => {
		// 	if (id === customer._id) {
		// 		customer.title = title;
		// 		customer.name = name;
		// 		customer.phone = phone;
		// 	}
		// 	return customer;
		// })
		// return state;

		case CUSTOMER_REMOVE_SUCCESS:
			const newCustomers = state.customers.filter((customer) => customer._id !== action.payload)
			return { ...state, customers: newCustomers };

		case CUSTOMER_GET_FAIL:
			return { ...state, loading: false, customers: null, error: action.payload };
		default:
			return state;
	}
};

export const addCustomerReducer = (state = {}, action) => {
	switch (action.type) {
		case CUSTOMER_ADDING_REQUEST:
			return { ...state, loading: true, success: false, error: null };
		case CUSTOMER_ADDING_SUCCESS:
			return { ...state, loading: false, success: true, error: null };
		case CUSTOMER_ADDING_FAIL:
			return { ...state, loading: false, success: false, error: action.payload };
		default:
			return state;
	}
};

export const editCustomerReducer = (state = {}, action) => {
	switch (action.type) {
		case CUSTOMER_EDIT_REQUEST:
			return { ...state, loading: true, success: false, error: null };
		case CUSTOMER_EDIT_SUCCESS:
			return { ...state, loading: false, success: true, error: null };
		case CUSTOMER_EDIT_FAIL:
			return { ...state, loading: false, success: false, error: action.payload };
		default:
			return state;
	}
};

export const deleteCustomerReducer = (state = {}, action) => {
	switch (action.type) {
		case CUSTOMER_DELETE_REQUEST:
			return { ...state, loading: true, success: false, error: null };
		case CUSTOMER_DELETE_SUCCESS:
			return { ...state, loading: false, success: true, error: null };
		case CUSTOMER_DELETE_FAIL:
			return { ...state, loading: false, success: false, error: action.payload };
		default:
			return state;
	}
};

export const getSingleCustomerDetailReducer = (state = { loading: true, singleCustomer: null, error: null }, action) => {

	switch (action.type) {
		case SINGLE_CUSTOMER_DETAILS_FETCH_REQUEST:
			return { ...state, loading: true, singleCustomer: null, error: null };
		case SINGLE_CUSTOMER_DETAILS_FETCH_SUCCESS:
			return { ...state, loading: false, singleCustomer: action.payload, error: null };
		case SINGLE_CUSTOMER_DETAILS_FETCH_ERROR:
			return { ...state, loading: false, singleCustomer: null, error: action.payload };
		case SINGLE_CUSTOMER_DETAILS_UPDATE_SUCCESS:
			let x = state.singleCustomer;
			let { title, name, phone } = action.payload;
			console.log(title, name, phone)
			x.title = title;
			x.name = name;
			x.phone = phone;
			console.log("shyam")
			console.log(action.payload);
			console.log(x)
			return { ...state, singleCustomer: x };

		case SINGLE_CUSTOMER_DETAILS_DELETE_SUCCESS:
			return { ...state, loading: true, singleCustomer: null, error: null };
		default:
			return state;
	}

}

export const singleCustomerTransactionsReducer = (state = { loading: true, SingleCustomerTransaction: [], error: null }, action) => {
	switch (action.type) {

		case SINGLE_CUSTOMER_TRANSACTION_GET_REQUEST:
			return { ...state, loading: true, SingleCustomerTransaction: null, error: null };

		case SINGLE_CUSTOMER_TRANSACTION_GET_SUCCESS:
			return { ...state, loading: false, SingleCustomerTransaction: action.payload, error: null };

		case SINGLE_CUSTOMER_TRANSACTION_GET_FAIL:
			return { ...state, loading: false, SingleCustomerTransaction: null, error: action.payload };

		case SINGLE_CUSTOMER_TRANSACTION_APPEND_SUCCESS:
			let x = state.SingleCustomerTransaction
			x.push(action.payload)

			return {
				...state, SingleCustomerTransaction: x
			};


		case SINGLE_CUSTOMER_TRANSACTION_UPDATE_SUCCESS:

			let { transactionid, lendamount_singleCustomer, takeamount_singleCustomer, billdetails, billNo, date } = action.payload
			let y = state.SingleCustomerTransaction
			// console.log("wala wala")
			for (let index = 0; index < y.length; index++) {
				const element = y[index];
				if (element._id === transactionid) {
					if (date)
						y[index].date = date;
					if (lendamount_singleCustomer)
						y[index].lendamount_singleCustomer = lendamount_singleCustomer;
					if (takeamount_singleCustomer)
						y[index].takeamount_singleCustomer = takeamount_singleCustomer;
					if (billdetails)
						y[index].billdetails = billdetails;
					if (billNo)
						y[index].billNo = billNo;
					break;
				}
			}
			// console.log(y)
			return {
				...state, SingleCustomerTransaction: y
			};
		// state.SingleCustomerTransaction.map((element) => {
		// 	if (transactionid === element._id) {
		// 		if (date)
		// 			element.date = date;
		// 		if (lendamount_singleCustomer)
		// 			element.lendamount_singleCustomer = lendamount_singleCustomer;
		// 		if (takeamount_singleCustomer)
		// 			element.takeamount_singleCustomer = takeamount_singleCustomer;
		// 		if (billdetails)
		// 			element.billdetails = billdetails;
		// 		if (billNo)
		// 			element.billNo = billNo;
		// 	}
		// 	return element;
		// })
		// return { ...state, SingleCustomerTransaction: [...state.SingleCustomerTransaction] };
		default:
			return state;
	}
}

export const addSingleCustomerTransactionReducer = (state = {}, action) => {
	switch (action.type) {
		case SINGLE_CUSTOMER_TRANSACTION_ADDING_REQUEST:
			return { ...state, loading: true, success: false, error: null };
		case SINGLE_CUSTOMER_TRANSACTION_ADDING_SUCCESS:
			return { ...state, loading: false, success: true, error: null };
		case SINGLE_CUSTOMER_TRANSACTION_ADDING_FAIL:
			return { ...state, loading: false, success: false, error: action.payload };
		default:
			return state;
	}
}

export const updateCustomerTransactionReducer = (state = {}, action) => {
	switch (action.type) {
		case SINGLE_CUSTOMER_TRANSACTION_EDIT_REQUEST:
			return { ...state, loading: true, success: false, error: null };
		case SINGLE_CUSTOMER_TRANSACTION_EDIT_SUCCESS:
			return { ...state, loading: false, success: true, error: null };
		case SINGLE_CUSTOMER_TRANSACTION_EDIT_FAIL:
			return { ...state, loading: false, success: false, error: action.payload };
		default:
			return state;
	}
}

export const getCustomerBalanceReducer = (state = { loading: true, customerBalance: null, error: null }, action) => {
	switch (action.type) {
		case CUSTOMERS_BALANCE_GET_REQUEST:
			return {
				...state, loading: true, customerBalance: null, error: null
			}
		case CUSTOMERS_BALANCE_GET_SUCCESS:
			return {
				...state, loading: false, customerBalance: action.payload, error: null
			}
		case CUSTOMERS_BALANCE_GET_FAIL:
			return {
				...state, loading: false, customerBalance: null, error: action.payload
			}
		default:
			return state;
	}
}


export const selectCustomerById = (state, userId) =>
	state.getCustomers.customers.find(customer => customer._id === userId)