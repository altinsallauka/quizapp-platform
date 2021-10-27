import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserHistory } from "history";
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
const BASE_URL = "http://localhost:3001/categories";
const history = createBrowserHistory({ forceRefresh: true });
const access_token = localStorage.getItem("token");
//CREATE---------------------------------------------------------------

export const createCategorySuccess = (data) => {
  return {
    type: ADD_CATEGORY_SUCCESS,
    payload: data,
  };
};

export const createCategoryError = (data) => {
  return {
    type: ADD_CATEGORY_ERROR,
    payload: data,
  };
};

export const createCategory = (category) => {
  const data = {
    categoryName: category,
  };

  return (dispatch) => {
    return axios
      .post(
        "http://localhost:3001/categories",
        {
          categoryName: category,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((response) => {
        const id = response.data._id;
        axios
          .get(`${BASE_URL}/${id}`)
          .then((response) => {
            const data = response.data;
            console.log(category.categoryName);
            const normalizedData = {
              _id: data._id,
              categoryName: data.categoryName,
            };

            dispatch(createCategorySuccess(normalizedData));
            history.push("/categories");
          })
          .catch((error) => {
            const errorPayload = {};

            errorPayload["message"] = error.response.data;
            errorPayload["status"] = error.response.status;

            dispatch(createCategoryError(errorPayload));
          });
      })
      .catch((error) => {
        const errorPayload = {};

        errorPayload["message"] = error.response.data.message;
        errorPayload["status"] = error.response.status;

        dispatch(createCategoryError(errorPayload));
      });
  };
};

//EDIT-----------------------------------------------------------------

export const editCategoryError = (data) => {
  return {
    type: EDIT_CATEGORY_ERROR,
    payload: data,
  };
};

export const editCategorySuccess = (data) => {
  return {
    type: EDIT_CATEGORY_SUCCESS,
    payload: data,
  };
};

export const editCategory = (data) => {
  const id = data._id;
  console.log("data", data);
  return async (dispatch) => {
    return axios
      .put(`${BASE_URL}/${id}`, data, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          // "Content-Type": "text/plain",
        },
      })
      .then(() => {
        dispatch(editCategorySuccess(data));
        // toast.success("This category has been updated!");
        // axios
        //   .get(`${BASE_URL}/${id}`)
        //   .then((response) => {
        //     const data = response.data;

        //     dispatch(editCategorySuccess(data));
        //     // dispatch(toggleUpdate());
        //     // handleModalDelete
        //     // history.push("/categories");
        //   })
        //   .catch((error) => {
        //     const errorPayload = {};

        //     errorPayload["message"] = error.response.data;
        //     errorPayload["status"] = error.response.status;

        //     dispatch(createCategoryError(errorPayload));
        //   });
      })
      .catch((error) => {
        const errorPayload = {};

        errorPayload["message"] = error.response.data.message;
        errorPayload["status"] = error.response.status;

        dispatch(editCategoryError(errorPayload));
      });
  };
};

//DELETE---------------------------------------------------------------

export const deleteCategorySuccess = (_id) => {
  return {
    type: DELETE_CATEGORY_SUCCESS,
    payload: {
      _id: _id,
    },
  };
};

export const deleteCategoryError = (data) => {
  return {
    type: DELETE_CATEGORY_ERROR,
    payload: data,
  };
};

export const deleteCategory = (id) => {
  return (dispatch) => {
    axios
      .delete(`${BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        dispatch(deleteCategorySuccess(id));
        // handleModalDelete();
        // // props.onFetch();
        // dispatch(fetchCategories());

        // getCategories();
        toast.warning("This category has been deleted!");
      })
      .catch((error) => {
        // toast.error(err.response.data.message);
        const errorPayload = {};
        errorPayload["message"] = error.response.data.message;
        errorPayload["status"] = error.response.status;
        dispatch(deleteCategoryError(errorPayload));
        toast.error(errorPayload);
      });
    // return axios
    //   .delete(`${url}/${id}`)
    //   .then(() => {
    //     dispatch(deleteBookSuccess(id));
    //   })
    //   .catch((error) => {
    //     const errorPayload = {};
    //     errorPayload["message"] = error.response.data.message;
    //     errorPayload["status"] = error.response.status;
    //     dispatch(deleteBookError(errorPayload));
    //   });
  };
};

// Fetch-----------------------------------------
export const fetchCategoriesSuccess = (data) => {
  return {
    type: FETCH_CATEGORIES_SUCCESS,
    payload: data,
  };
};

export const fetchCategoriesLoading = (data) => {
  return {
    type: FETCH_CATEGORIES_LOADING,
    payload: data,
  };
};

export const fetchCategoriesError = (data) => {
  return {
    type: FETCH_CATEGORIES_ERROR,
    payload: data,
  };
};

export const fetchCategories = () => {
  let isLoading = true;
  return (dispatch) => {
    dispatch(fetchCategoriesLoading(isLoading));
    return axios
      .get(BASE_URL)
      .then((res) => {
        const data = res.data;
        dispatch(fetchCategoriesSuccess(data));
        isLoading = false;
        dispatch(fetchCategoriesLoading(isLoading));
      })
      .catch((err) => {
        const errorPayload = {};
        errorPayload["message"] = err.response.data.message;
        errorPayload["status"] = err.response.status;
        dispatch(fetchCategoriesError(errorPayload));
        toast.error(errorPayload);
        isLoading = false;
        dispatch(fetchCategoriesLoading(isLoading));
      });
  };
};

// Toggle Modals-----------------------------------------
export const toggleUpdate = () => {
  return {
    type: TOGGLE_UPDATE,
  };
};
export default fetchCategories;
