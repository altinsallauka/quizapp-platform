import React from "react";
import axios from "axios";
import "./CategoriesList.scss";
// import * as ReactBootStrap from "react-bootstrap";
import editImageSrc from "../../../assets/edit.png";
import deleteImageSrc from "../../../assets/delete.png";
import { Button, Modal } from "react-bootstrap";
export default class CategoriesList extends React.Component {
  state = {
    categories: [],
    categoryId: "",
    showHideDelete: false,
    showHideUpdate: false,
  };
  componentDidMount() {
    this.getCategories();
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
  }
  getCategories() {
    axios.get("http://localhost:3001/categories").then((res) => {
      this.setState({ categories: res.data });
    });
  }
  deleteRow(id) {
    axios.delete(`http://localhost:3001/categories/${id}`).then((res) => {
      this.handleModalDelete();
      this.getCategories();
    });
  }
  createCategory(ctgParameter) {
    axios
      .post("http://localhost:3001/categories", {
        categoryName: "123sasdasdasdasdd4",
      })
      .then(function (response) {
        console.log(response);
      });
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="title-container">
            <h1>Categories</h1>
            <h1>+</h1>
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
          <form onSubmit={this.handleSubmit}>
            <Modal.Header closeButton onClick={() => this.handleModalUpdate()}>
              <Modal.Title>Edit category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label className="d-flex flex-column align-items-start">
                Name:
                <input
                  type="text"
                  name="description"
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
                onClick={() => this.handleSubmit()}
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