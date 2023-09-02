import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducer";
import thunkMiddleware from "redux-thunk";

// ? Uncomment this to use redux developer tools and import => compose from "redux"
// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
);

// ? Change the second arg of createStore to this to work with redux developer tools
// composeEnhancer(applyMiddleware(thunkMiddleware))

export default store;