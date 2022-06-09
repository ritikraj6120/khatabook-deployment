import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./reducers/rootReducer.js";
const userInfoFromStorage = localStorage.getItem("token")
	? localStorage.getItem("token")
	: null;

const initialState = {
	userLogin: { userInfo: userInfoFromStorage },
};
const store = createStore(rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(thunk)));
export default store; 