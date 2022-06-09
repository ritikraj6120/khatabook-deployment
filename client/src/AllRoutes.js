import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux'
import Notes from './components/Notes/Notes';
import Important from './components/Notes/Important.js';
import Completed from './components/Notes/Completed.js';
import About from './components/About';
import User from './components/User';
import Signup from './components/Signup';
import Login from './components/Login';
import Error from './components/Error';
import Suppliers from './components/khatabook/Supplier/Suppliers'
import Customers from './components/khatabook/Customer/Customers'
import AddCustomer from './components/khatabook/Customer/AddCustomer';
import AddNewTransactionForCustomerGave from './components/khatabook/Customer/AddNewTransactionForCustomerGave';
import AddNewTransactionForCustomerGet from './components/khatabook/Customer/AddNewTransactionForCustomerGet';
import AddNewTransactionForSupplierPayment from './components/khatabook/Supplier/AddNewTransactionForSupplierpayment'
import AddNewTransactionForSupplierPurchase from './components/khatabook/Supplier/AddNewTransactionForSupplierpurchase'
import AddSupplier from './components/khatabook/Supplier/AddSupplier';
import SingleCustomer from './components/khatabook/Customer/SingleCustomer';
import SingleSupplier from './components/khatabook/Supplier/SingleSupplier';
import SingleCustomerReport from './components/khatabook/Customer/SingleCustomerReport';
import Reminder from './components/khatabook/Customer/Reminder';
import SingleSupplierReport from './components/khatabook/Supplier/SingleSupplierReport';
import EditSingleCustomerTransactionForGaveAmount from './components/khatabook/Customer/EditSingleCustomerTransactionForGaveAmount';
import EditSingleCustomerTransactionForGetAmount from './components/khatabook/Customer/EditSingleCustomerTransactionForGetAmount';
import EditSingleSupplierTransactionForPayment from './components/khatabook/Supplier/EditSingleSupplierTransactionForPayment';
import EditSingleSupplierTransactionForPurchase from './components/khatabook/Supplier/EditSingleSupplierTransactionForPurchase';

const KhataBookRouterapp = () => {
	// const { userloggedin } = useContext(UserContext);
	// let currentloggedin = false;
	// if (userloggedin === true) {
	// 	currentloggedin = true;
	// }
	// else if (userloggedin === false && localStorage.getItem('token') !== null) {
	// 	currentloggedin = true;
	// }
	// console.log(currentloggedin);
	const userLoginState = useSelector(state => state.userLogin)
	const currentloggedin = userLoginState.userInfo === null ? false : true
	return (
		<Switch>
			<Route exact path="/">
				<Redirect to="/customers" />
			</Route>
			<Route exact path="/notes">
				{
					currentloggedin ?
						<Notes /> :
						<Redirect to="/login" />
				}
			</Route>
			<Route exact path="/importantNotes">
				{
					currentloggedin ?
						<Important /> :
						<Redirect to="/login" />
				}
			</Route>
			<Route exact path="/completedNotes">
				{
					currentloggedin ?
						<Completed /> :
						<Redirect to="/login" />
				}
			</Route>
			<Route exact path="/about">
				<About />
			</Route>
			<Route exact path="/login">
				{
					currentloggedin ?
						<Redirect to="/customers" /> :
						<Login />
				}
			</Route>
			<Route exact path="/signup">
				{
					currentloggedin ?
						<Redirect to="/customers" /> :
						<Signup />
				}
			</Route>
			<Route exact path="/userdetail">
				{
					currentloggedin ?
						<User /> :
						<Redirect to="/login" />
				}
			</Route>
			<Route exact path="/addNewTransactionForCustomerGave">
				{
					currentloggedin ?
						<AddNewTransactionForCustomerGave /> :
						<Redirect to="/login" />
				}

			</Route>
			<Route exact path="/addNewTransactionForCustomerGet">
				{
					currentloggedin ?
						<AddNewTransactionForCustomerGet /> :
						<Redirect to="/login" />
				}

			</Route>
			<Route exact path="/addNewTransactionForSupplierPayment">
				{
					currentloggedin ?
						<AddNewTransactionForSupplierPayment /> :
						<Redirect to="/login" />
				}
			</Route>
			<Route exact path="/addNewTransactionForSupplierPurchase">
				{
					currentloggedin ?
						<AddNewTransactionForSupplierPurchase /> :
						<Redirect to="/login" />
				}
			</Route>
			<Route exact path="/customers">
				{
					currentloggedin === true ?
						<Customers /> :
						<Redirect to="/login" />
				}
			</Route>
			<Route exact path="/suppliers">
				{
					currentloggedin ?
						<Suppliers /> :
						<Redirect to="/login" />
				}
			</Route>
			<Route exact path="/addsupplier">
				{
					currentloggedin ?
						<AddSupplier /> :
						<Redirect to="/login" />
				}
			</Route>
			<Route exact path="/addcustomer">
				{
					currentloggedin ?
						<AddCustomer /> :
						<Redirect to="/login" />
				}
			</Route>
			<Route exact path="/singlecustomer">
				{
					currentloggedin ?
						<SingleCustomer /> :
						<Redirect to="/login" />
				}
			</Route>
			<Route exact path="/singlesupplier">
				{
					currentloggedin ?
						<SingleSupplier /> :
						<Redirect to="/login" />
				}
			</Route>
			<Route exact path="/singleCustomerReport">
				{
					currentloggedin ?
						<SingleCustomerReport /> :
						<Redirect to="/login" />
				}
			</Route>
			<Route exact path="/reminder">
				{
					currentloggedin ?
						<Reminder /> :
						<Redirect to="/login" />
				}
			</Route>
			<Route exact path="/singlesupplierReport">
				{
					currentloggedin ?
						<SingleSupplierReport /> :
						<Redirect to="/login" />
				}
			</Route>
			<Route exact path="/editcustomertransactionforgetamount"  >
				{
					currentloggedin ?
						<EditSingleCustomerTransactionForGetAmount /> :
						<Redirect to="/login" />
				}
			</Route>
			<Route exact path="/editcustomertransactionforgaveamount"  >
				{
					currentloggedin ?
						<EditSingleCustomerTransactionForGaveAmount /> :
						<Redirect to="/login" />
				}
			</Route>
			<Route exact path="/editsinglesuppliertransactionforpayment" >
				{
					currentloggedin ?
						<EditSingleSupplierTransactionForPayment /> :
						<Redirect to="/login" />
				}
			</Route>
			<Route exact path="/editsinglesuppliertransactionforpurchase" >
				{
					currentloggedin ?
						<EditSingleSupplierTransactionForPurchase /> :
						<Redirect to="/login" />
				}
			</Route>

			<Route>
				<Error />
			</Route>
		</Switch>
	);
}

export default KhataBookRouterapp;


