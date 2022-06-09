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

export const getSuppliersReducer = (state = { loading: true, suppliers: [], error: null }, action) => {
	switch (action.type) {

		case SUPPLIER_GET_REQUEST:
			return { ...state, loading: true, suppliers: null, error: null };

		case SUPPLIER_GET_SUCCESS:
			// console.log(state);
			// console.log(action.payload);
			return { ...state, loading: false, suppliers: action.payload, error: null };

		case SUPPLIER_APPEND_SUCCESS:
			let x = state.suppliers
			x.push(action.payload)
			// console.log(x);
			return {
				...state, suppliers: x
			};

		case SUPPLIER_UPDATE_SUCCESS:
			let { id, name, phone } = action.payload
			let y = state.suppliers
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
				...state, suppliers: y
			};


		// return {
		// 	...state,
		// 	suppliers: state.suppliers.map(customer => {
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

		// state.suppliers.map((customer) => {
		// 	if (id === customer._id) {
		// 		customer.title = title;
		// 		customer.name = name;
		// 		customer.phone = phone;
		// 	}
		// 	return customer;
		// })
		// return state;

		case SUPPLIER_REMOVE_SUCCESS:
			const newSuppliers = state.suppliers.filter((supplier) => supplier._id !== action.payload)
			return { ...state, suppliers: newSuppliers };

		case SUPPLIER_GET_FAIL:
			return { ...state, loading: false, suppliers: null, error: action.payload };
		default:
			return state;
	}
};

export const addSupplierReducer = (state = {}, action) => {
	switch (action.type) {
		case SUPPLIER_ADDING_REQUEST:
			return { ...state, loading: true, success: false, error: null };
		case SUPPLIER_ADDING_SUCCESS:
			return { ...state, loading: false, success: true, error: null };
		case SUPPLIER_ADDING_FAIL:
			return { ...state, loading: false, success: false, error: action.payload };
		default:
			return state;
	}
};

export const editSupplierReducer = (state = {}, action) => {
	switch (action.type) {
		case SUPPLIER_EDIT_REQUEST:
			return { ...state, loading: true, success: false, error: null };
		case SUPPLIER_EDIT_SUCCESS:
			return { ...state, loading: false, success: true, error: null };
		case SUPPLIER_EDIT_FAIL:
			return { ...state, loading: false, success: false, error: action.payload };
		default:
			return state;
	}
};

export const deleteSupplierReducer = (state = {}, action) => {
	switch (action.type) {
		case SUPPLIER_DELETE_REQUEST:
			return { ...state, loading: true, success: false, error: null };
		case SUPPLIER_DELETE_SUCCESS:
			return { ...state, loading: false, success: true, error: null };
		case SUPPLIER_DELETE_FAIL:
			return { ...state, loading: false, success: false, error: action.payload };
		default:
			return state;
	}
};

export const getSingleSupplierDetailReducer = (state = { loading: true, singleSupplier: null, error: null }, action) => {

	switch (action.type) {
		case SINGLE_SUPPLIER_DETAILS_FETCH_REQUEST:
			return { ...state, loading: true, singleSupplier: null, error: null };
		case SINGLE_SUPPLIER_DETAILS_FETCH_SUCCESS:
			return { ...state, loading: false, singleSupplier: action.payload, error: null };
		case SINGLE_SUPPLIER_DETAILS_FETCH_ERROR:
			return { ...state, loading: false, singleSupplier: null, error: action.payload };
		case SINGLE_SUPPLIER_DETAILS_UPDATE_SUCCESS:
			let x = state.singleSupplier;
			let { name, phone } = action.payload;
			// console.log(title, name, phone)
			x.name = name;
			x.phone = phone;
			// console.log("shyam")
			// console.log(action.payload);
			// console.log(x)
			return { ...state, singleSupplier: x };

		case SINGLE_SUPPLIER_DETAILS_DELETE_SUCCESS:
			return { ...state, loading: true, singleSupplier: null, error: null };
		default:
			return state;
	}

}

export const singleSupplierTransactionsReducer = (state = { loading: false, SingleSupplierTransaction: [], error: null }, action) => {
	switch (action.type) {

		case SINGLE_SUPPLIER_TRANSACTION_GET_REQUEST:
			return { ...state, loading: true, SingleSupplierTransaction: null, error: null };

		case SINGLE_SUPPLIER_TRANSACTION_GET_SUCCESS:
			return { ...state, loading: false, SingleSupplierTransaction: action.payload, error: null };

		case SINGLE_SUPPLIER_TRANSACTION_GET_FAIL:
			return { ...state, loading: false, SingleSupplierTransaction: null, error: action.payload };

		case SINGLE_SUPPLIER_TRANSACTION_APPEND_SUCCESS:
			let x = state.SingleSupplierTransaction
			console.log("array length")
			console.log(x.length)
			x.push(action.payload)

			return {
				...state, SingleSupplierTransaction: x
			};


		case SINGLE_SUPPLIER_TRANSACTION_UPDATE_SUCCESS:

			let { transactionid, purchase_singleSupplier, payment_singleSupplier, billdetails, billNo, date } = action.payload
			let y = state.SingleSupplierTransaction
			// console.log("wala wala")
			for (let index = 0; index < y.length; index++) {
				const element = y[index];
				if (element._id === transactionid) {
					if (date)
						y[index].date = date;
					if (purchase_singleSupplier)
						y[index].purchase_singleSupplier = purchase_singleSupplier;
					if (payment_singleSupplier)
						y[index].payment_singleSupplier = payment_singleSupplier;
					if (billdetails)
						y[index].billdetails = billdetails;
					if (billNo)
						y[index].billNo = billNo;
					break;
				}
			}
			// console.log(y)
			return {
				...state, SingleSupplierTransaction: y
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

export const addSingleSupplierTransactionReducer = (state = {}, action) => {
	switch (action.type) {
		case SINGLE_SUPPLIER_TRANSACTION_ADDING_REQUEST:
			return { ...state, loading: true, success: false, error: null };
		case SINGLE_SUPPLIER_TRANSACTION_ADDING_SUCCESS:
			return { ...state, loading: false, success: true, error: null };
		case SINGLE_SUPPLIER_TRANSACTION_ADDING_FAIL:
			return { ...state, loading: false, success: false, error: action.payload };
		default:
			return state;
	}
}

export const updateSupplierTransactionReducer = (state = {}, action) => {
	switch (action.type) {
		case SINGLE_SUPPLIER_TRANSACTION_EDIT_REQUEST:
			return { ...state, loading: true, success: false, error: null };
		case SINGLE_SUPPLIER_TRANSACTION_EDIT_SUCCESS:
			return { ...state, loading: false, success: true, error: null };
		case SINGLE_SUPPLIER_TRANSACTION_EDIT_FAIL:
			return { ...state, loading: false, success: false, error: action.payload };
		default:
			return state;
	}
}

export const getSupplierBalanceReducer = (state = { loading: true, supplierBalance: null, error: null }, action) => {
	switch (action.type) {
		case SUPPLIERS_BALANCE_GET_REQUEST:
			return {
				...state, loading: true, supplierBalance: null, error: null
			}
		case SUPPLIERS_BALANCE_GET_SUCCESS:
			console.log(action.payload)
			return {
				...state, loading: false, supplierBalance: action.payload, error: null
			}
		case SUPPLIERS_BALANCE_GET_FAIL:
			return {
				...state, loading: false, supplierBalance: null, error: action.payload
			}
		default:
			return state;
	}
}


export const selectSupplierById = (state, userId) =>
	state.getSuppliers.suppliers.find(supplier => supplier._id === userId)