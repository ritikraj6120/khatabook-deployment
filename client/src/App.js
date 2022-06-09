import './App.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from "react-router-dom";
import UserState from './context/UserState';
import NoteState from './context/NoteState';
import Navbar from './components/Navbar';
import KhataBookRouterapp from './AllRoutes';
const App = () => {
	return (
		<Router>
			<UserState>
				<NoteState>
						<Navbar />
						{/* <Alert /> */}
						<ToastContainer />
						{/* <div className="container"> */}
						<KhataBookRouterapp />
						{/* </div> */}
				</NoteState>
			</UserState>
		</Router>
	);
};
export default App;