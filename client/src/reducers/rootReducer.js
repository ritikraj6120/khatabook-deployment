import { combineReducers } from "redux";

import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer
} from "./userReducer";

import {
	addCustomerReducer,
	getCustomersReducer,
	editCustomerReducer,
	deleteCustomerReducer,
	singleCustomerTransactionsReducer,
	addSingleCustomerTransactionReducer,
	updateCustomerTransactionReducer,
	getCustomerBalanceReducer,
	getSingleCustomerDetailReducer,
} from './customerReducer'

import{
	addSupplierReducer,
	getSuppliersReducer,
	editSupplierReducer,
	deleteSupplierReducer,
	singleSupplierTransactionsReducer,
	addSingleSupplierTransactionReducer,
	updateSupplierTransactionReducer,
	getSupplierBalanceReducer,
	getSingleSupplierDetailReducer,
}from './supplierReducer'

const rootReducer = combineReducers({
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	getCustomers: getCustomersReducer,
	addCustomer: addCustomerReducer,
	editCustomer: editCustomerReducer,
	deleteCustomer: deleteCustomerReducer,
	singleCustomerTransactions: singleCustomerTransactionsReducer,
	addSingleCustomerTransaction: addSingleCustomerTransactionReducer,
	updateCustomerTransaction: updateCustomerTransactionReducer,
	getCustomerBalance: getCustomerBalanceReducer,
	SingleCustomerDetail: getSingleCustomerDetailReducer,


	
	getSuppliers: getSuppliersReducer,
	addSupplier: addSupplierReducer,
	editSupplier: editSupplierReducer,
	deleteSupplier: deleteSupplierReducer,
	singleSupplierTransactions: singleSupplierTransactionsReducer,
	addSingleSupplierTransaction: addSingleSupplierTransactionReducer,
	updateSupplierTransaction: updateSupplierTransactionReducer,
	getSupplierBalance: getSupplierBalanceReducer,
	SingleSupplierDetail: getSingleSupplierDetailReducer,
});

export default rootReducer;
