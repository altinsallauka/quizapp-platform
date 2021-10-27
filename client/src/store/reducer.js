import { combineReducers } from "redux";
import categoriesReducer from "../components/dashboard/categories/reducer";
const rootReducer = combineReducers({
  categoriesData: categoriesReducer,
});
export default rootReducer;
