import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CategoriesList.scss";
// import * as ReactBootStrap from "react-bootstrap";
import editImageSrc from "../../../assets/edit.png";
import deleteImageSrc from "../../../assets/delete.png";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  editCategory,
  fetchCategories,
  toggleUpdate,
  deleteCategory,
} from "./actions";
import categoriesReducer from "./reducer";
import { connect, useDispatch, useSelector } from "react-redux";
const CategoriesList = (props) => {
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state);
  let categories = globalState.categoriesData;
  let isLoading = globalState.categoriesData.isLoading;
  const [access_token, setAccess_token] = useState(
    localStorage.getItem("token")
  );
  // const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [showHideDelete, setShowHideDelete] = useState(false);
  const [showHideUpdate, setShowHideUpdate] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [_id, setId] = useState("");

  const handleModalDelete = (id) => {
    setShowHideDelete(!showHideDelete);
    setCategoryId(id);
  };
  const handleModalUpdate = async (id) => {
    setShowHideUpdate(!showHideUpdate);
    setCategoryId(id);
    await axios
      .get(`http://localhost:3001/categories/${id}`)
      .then((res) => {
        const { categoryName } = res.data;
        // this.setState({
        //   _id: id,
        //   categoryName,
        // });
        setId(id);
        setCategoryName(categoryName);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // const { categoryId, categoryName } = this.state;
    const data = {
      _id,
      categoryName,
    };
    dispatch(editCategory(data)).then(setShowHideUpdate(!showHideUpdate));
    // dispatch(editCategory(data));
    // props.onEdit(data).then(setShowHideUpdate(!showHideUpdate));
    // await axios
    //   .put(
    //     `http://localhost:3001/categories/${categoryId}`,
    //     {
    //       _id: categoryId,
    //       categoryName,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${access_token}`,
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     toast.success("This category has been updated!");
    //     // getCategories();
    //     // this.setState({ showHideUpdate: !this.state.showHideUpdate });
    //     setShowHideUpdate(!showHideUpdate);
    //   })
    //   .catch((err) => {
    //     toast.error(err.response.data.message);
    //   });
  };
  // const getCategories = () => {
  //   // this.setState({ isLoading: true });
  //   setIsLoading(true);
  //   axios
  //     .get("http://localhost:3001/categories")
  //     .then((res) => {
  //       // this.setState({ categories: res.data, isLoading: false });
  //       setCategories(res.data);
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       toast.error(err.response.data.message);
  //     });
  // };
  const deleteRow = async (e, id) => {
    e.preventDefault();
    dispatch(deleteCategory(id));
    handleModalDelete(id);

    // axios
    //   .delete(`http://localhost:3001/categories/${id}`, {
    //     headers: {
    //       Authorization: `Bearer ${access_token}`,
    //     },
    //   })
    //   .then((res) => {
    //     handleModalDelete();
    //     // props.onFetch();
    //     dispatch(fetchCategories());

    //     // getCategories();
    //     toast.warning("This category has been deleted!");
    //   })
    //   .catch((err) => {
    //     toast.error(err.response.data.message);
    //   });
  };
  // createCategory(ctgParameter) {
  //   axios
  //     .post("http://localhost:3001/categories", {
  //       categoryName: "123sasdasdasdasdd4",
  //     })
  //     .then(function (response) {
  //       console.log(response);
  //     });
  // }

  useEffect(() => {
    // getCategories();
    // props.onFetch();
    dispatch(fetchCategories());
  }, []);

  if (props.isLoading) {
    return (
      <div className="mt-4">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <span class="text-primary ml-3">Loading categories...</span>
      </div>
    );
  } else if (props.categories.length <= 0) {
    return (
      <div className="mt-4">
        <div>
          {props.isLoading && (
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          )}
          <span className="text-primary">
            No categories found on the database...
          </span>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="row">
          <div className="title-container mt-4">
            <h1>Categories</h1>
            <h1>
              <Link to={"/create-category"} className="nav-link">
                +
              </Link>
            </h1>
          </div>
        </div>
        <div className="row">
          <caption>List of categories</caption>
          <div className="container ctg">
            {props.categories.map((ctg) => (
              <div className="categoryBox shadow-sm p-3 mb-5 bg-body rounded">
                <span>{ctg.categoryName}</span>
                <div className="ctgIcons">
                  <button
                    className="btn btn-primary btn-xs"
                    onClick={() => handleModalUpdate(ctg._id)}
                  >
                    <img src={editImageSrc} alt="Edit Icon" />
                  </button>
                  <button
                    className="btn btn-primary btn-xs"
                    // onClick={() => console.log("updated", row._id)}
                    onClick={() => handleModalDelete(ctg._id)}
                  >
                    <img src={deleteImageSrc} alt="Delete Icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Delete */}
        <Modal show={showHideDelete}>
          <Modal.Header onClick={() => handleModalDelete()}>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Do you really want to delete this category? This process cannot be
            undone.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleModalDelete()}>
              Cancel
            </Button>
            <Button variant="danger" onClick={(e) => deleteRow(e, categoryId)}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Update */}
        <Modal show={showHideUpdate}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Modal.Header onClick={() => handleModalUpdate()}>
              <Modal.Title>Edit category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label className="d-flex flex-column align-items-start">
                Name:
                <input
                  type="text"
                  name="categoryName"
                  value={categoryName}
                  className="form-control"
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </label>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => handleModalUpdate()}>
                Cancel
              </Button>
              <Button
                type="submit"
                value="submit"
                variant="primary"
                // onClick={() => this.deleteRow(this.state.rowId)}
                // onClick={() => this.handleSubmit()}
              >
                Update
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  categories: state.categoriesData.categories || [],
  isLoading: state.categoriesData.isLoading,
  showHideUpdate: state.categoriesData.showHideUpdate,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onFetch: () => {
      dispatch(fetchCategories());
    },
    onEdit: (category) => {
      dispatch(editCategory(category));
    },
    onUpdate: () => {
      dispatch(toggleUpdate());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);
