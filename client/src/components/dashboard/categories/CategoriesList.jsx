import React from "react";
import axios from "axios";
import "./CategoriesList.scss";
// import * as ReactBootStrap from "react-bootstrap";
import editImageSrc from "../../../assets/edit.png";
import deleteImageSrc from "../../../assets/delete.png";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default class CategoriesList extends React.Component {
  constructor() {
    super();
    this.state = {
      access_token: localStorage.getItem("token"),
      categories: [],
      categoryId: "",
      categoryName: "",
      showHideDelete: false,
      showHideUpdate: false,
      isLoading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    console.log(this.state);
    this.setState({ [event.target.name]: event.target.value });
  }

  handleModalDelete(id) {
    this.setState({
      showHideDelete: !this.state.showHideDelete,
      categoryId: id,
    });
  }
  handleModalUpdate(id) {
    this.setState({
      showHideUpdate: !this.state.showHideUpdate,
      categoryId: id,
    });
    axios
      .get(`http://localhost:3001/categories/${id}`)
      .then((res) => {
        const { categoryName } = res.data;
        this.setState({
          _id: id,
          categoryName,
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }
  async handleSubmit(event) {
    event.preventDefault();
    const { categoryId, categoryName } = this.state;
    await axios
      .put(
        `http://localhost:3001/categories/${categoryId}`,
        {
          _id: categoryId,
          categoryName,
        },
        {
          headers: {
            Authorization: `Bearer ${this.state.access_token}`,
          },
        }
      )
      .then((res) => {
        toast.success("This category has been updated!");
        this.getCategories();
        this.setState({ showHideUpdate: !this.state.showHideUpdate });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }
  getCategories() {
    this.setState({ isLoading: true });
    axios
      .get("http://localhost:3001/categories")
      .then((res) => {
        this.setState({ categories: res.data, isLoading: false });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }
  deleteRow(id) {
    axios
      .delete(`http://localhost:3001/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${this.state.access_token}`,
        },
      })
      .then((res) => {
        this.handleModalDelete();
        this.getCategories();
        toast.warning("This category has been deleted!");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }
  // createCategory(ctgParameter) {
  //   axios
  //     .post("http://localhost:3001/categories", {
  //       categoryName: "123sasdasdasdasdd4",
  //     })
  //     .then(function (response) {
  //       console.log(response);
  //     });
  // }
  componentDidMount() {
    this.getCategories();
  }
  render() {
    const { isLoading, categories } = this.state;
    if (isLoading) {
      return (
        <div className="mt-4">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <span class="text-primary ml-3">Loading categories...</span>
        </div>
      );
    } else if (categories.length <= 0) {
      return (
        <div className="mt-4">
          <div>
            {isLoading && (
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
                <Link to={"/create-Category"} className="nav-link">
                  +
                </Link>
              </h1>
            </div>
          </div>
          <div className="row">
            <caption>List of categories</caption>
            <div className="container ctg">
              {this.state.categories.map((ctg) => (
                <div className="categoryBox shadow-sm p-3 mb-5 bg-body rounded">
                  <span>{ctg.categoryName}</span>
                  <div className="ctgIcons">
                    <button
                      className="btn btn-primary btn-xs"
                      onClick={() => this.handleModalUpdate(ctg._id)}
                    >
                      <img src={editImageSrc} alt="Edit Icon" />
                    </button>
                    <button
                      className="btn btn-primary btn-xs"
                      // onClick={() => console.log("updated", row._id)}
                      onClick={() => this.handleModalDelete(ctg._id)}
                    >
                      <img src={deleteImageSrc} alt="Delete Icon" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Delete */}
          <Modal show={this.state.showHideDelete}>
            <Modal.Header closeButton onClick={() => this.handleModalDelete()}>
              <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you really want to delete this category? This process cannot be
              undone.
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => this.handleModalDelete()}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => this.deleteRow(this.state.categoryId)}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Update */}
          <Modal show={this.state.showHideUpdate}>
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <Modal.Header
                closeButton
                onClick={() => this.handleModalUpdate()}
              >
                <Modal.Title>Edit category</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <label className="d-flex flex-column align-items-start">
                  Name:
                  <input
                    type="text"
                    name="categoryName"
                    value={this.state.categoryName}
                    className="form-control"
                    onChange={this.handleChange}
                  />
                </label>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => this.handleModalUpdate()}
                >
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
  }
}
