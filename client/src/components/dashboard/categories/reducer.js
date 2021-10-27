// import produce from "immer";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import {
  ADD_CATEGORY_ERROR,
  ADD_CATEGORY_LOADING,
  ADD_CATEGORY_SUCCESS,
  DELETE_CATEGORY_ERROR,
  DELETE_CATEGORY_LOADING,
  DELETE_CATEGORY_SUCCESS,
  EDIT_CATEGORY_ERROR,
  EDIT_CATEGORY_LOADING,
  EDIT_CATEGORY_SUCCESS,
  FETCH_CATEGORIES_ERROR,
  FETCH_CATEGORIES_LOADING,
  FETCH_CATEGORIES_SUCCESS,
  TOGGLE_DELETE,
  TOGGLE_UPDATE,
} from "./constants";

const initialState = {
  categories: [],
  error: null,
  isLoading: false,
  showHideDelete: false,
  showHideUpdate: false,
};
const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY_SUCCESS:
      return { ...state, categories: [...state.categories, action.payload] };
    case ADD_CATEGORY_ERROR:
      return { ...state, error: action.payload };
    case DELETE_CATEGORY_SUCCESS:
      const filteredCategories = state.categories.filter(
        (category) => category._id !== action.payload._id
      );
      return { ...state, categories: filteredCategories };
    case DELETE_CATEGORY_ERROR:
      return { ...state, error: action.payload };
    case EDIT_CATEGORY_SUCCESS:
      const updatedCategories = state.categories.filter(
        (category) => category._id != action.payload._id
      );
      return { ...state, categories: [...updatedCategories, action.payload] };
    case EDIT_CATEGORY_ERROR:
      return { ...state, error: action.payload };
    case FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload };
    case FETCH_CATEGORIES_LOADING:
      return { ...state, isLoading: action.payload };
    case FETCH_CATEGORIES_ERROR:
      return { ...state, error: action.payload };
    case TOGGLE_UPDATE:
      return {
        ...state,
        showHideUpdate: !state.showHideUpdate,
      };
    case TOGGLE_DELETE:
      return {
        ...state,
        showHideDelete: !state.showHideDelete,
      };
    default:
      return state;
  }
};

export default categoriesReducer;
