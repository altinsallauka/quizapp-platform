import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
// export default createStore(combineReducers(reducer));

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);
