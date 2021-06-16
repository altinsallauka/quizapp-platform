import React from "react";
import axios from "axios";
import "./UsersList.scss";
// import editImageSrc from "../../../assets/edit.png";
// import deleteImageSrc from "../../../assets/delete.png";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
// import * as ReactBootStrap from "react-bootstrap";
// import { Button, Modal } from "react-bootstrap";
export default class UsersList extends React.Component {
  constructor() {
    super();
    this.state = {
      rowId: "",
      users: [],
      numberOfusers: "",
      columns: [
        // {
        //   dataField: "_id",
        //   text: "ID",
        // },
        { dataField: "description", text: "User" },
        {
          dataField: "update",
          text: "Update",
          editable: false,
          formatter: (cellContent, row) => {
            this.setState({ rowId: row._id });
            return (
              <button
                className="btn btn-primary btn-xs"
                // onClick={() => console.log("updated", row._id)}
                onClick={() => this.handleModalUpdate()}
              >
                Edit
              </button>
            );
          },
        },
        {
          dataField: "delete",
          text: "Delete",
          editable: false,
          formatter: (cellContent, row) => {
            this.setState({ rowId: row._id });
            return (
              <button
                className="btn btn-danger btn-xs"
                // onClick={() => console.log("deleted", row._id)}
                onClick={() => this.handleModalDelete()}
              >
                Delete
              </button>
            );
          },
        },
      ],
      showHideDelete: false,
      showHideUpdate: false,
      toUpdate: [],
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  // async handleSubmit(event) {
  //   event.preventDefault();
  //   const {
  //     description,
  //     correct,
  //     option_one,
  //     option_two,
  //     option_three,
  //     option_four,
  //   } = this.state;
  //   const { data } = await axios.put(
  //     `http://localhost:3001/users/${this.state.rowId}`,
  //     {
  //       description,
  //       correct,
  //       option_one,
  //       option_two,
  //       option_three,
  //       option_four,
  //     }
  //   );
  //   console.log(data.data);
  //   this.props.history.push("/users");
  // }
  // handleModalDelete() {
  //   this.setState({ showHideDelete: !this.state.showHideDelete });
  // }
  // handleModalUpdate() {
  //   this.setState({ showHideUpdate: !this.state.showHideUpdate });
  //   // axios
  //   //   .get(`http://localhost:3001/users/${this.state.rowId}`)
  //   //   .then((res) => {
  //   //     console.log("question", res.data);
  //   //     this.setState({ toUpdate: res.data });
  //   //   });
  // }
  getusers() {
    axios.get(`http://localhost:3001/users`).then((res) => {
      const users = res.data;
      this.setState({ users });
      const numberOfusers = res.data.length;
      this.setState({ numberOfusers });
    });
  }
  deleteRow(id) {
    axios.delete(`http://localhost:3001/users/${id}`).then((res) => {
      this.handleModalDelete();
      this.getusers();
    });
  }
  componentDidMount() {
    this.getusers();
  }

  render() {
    return (
      <div>
        <h1 className="mt-4"></h1>
        <div className="row mt-3">
          <caption>List of users</caption>
          <BootstrapTable
            keyField="_id"
            data={this.state.users}
            columns={this.state.columns}
            pagination={paginationFactory()}
          />
          {/* Delete */}
          {/* <Modal show={this.state.showHideDelete}>
            <Modal.Header closeButton onClick={() => this.handleModalDelete()}>
              <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you really want to delete this question? This process cannot be
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
                onClick={() => this.deleteRow(this.state.rowId)}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal> */}

          {/* Update */}
          {/* <Modal show={this.state.showHideUpdate}>
            <form onSubmit={this.handleSubmit}>
              <Modal.Header
                closeButton
                onClick={() => this.handleModalUpdate()}
              >
                <Modal.Title>Edit question</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <label className="d-flex flex-column align-items-start">
                  Description:
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    onChange={this.handleChange}
                  />
                </label>
                <div className="d-flex align-items-center">
                  <label className="d-flex flex-column align-items-start">
                    First option:
                    <input
                      type="text"
                      name="option_one"
                      className="form-control"
                      onChange={this.handleChange}
                    />
                  </label>
                  <input
                    type="radio"
                    name="correct"
                    value="0"
                    className="form-check-input"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="d-flex align-items-center">
                  <label className="d-flex flex-column align-items-start">
                    Second option:
                    <input
                      type="text"
                      name="option_two"
                      className="form-control"
                      onChange={this.handleChange}
                    />
                  </label>
                  <input
                    type="radio"
                    name="correct"
                    value="1"
                    className="form-check-input"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="d-flex align-items-center">
                  <label className="d-flex flex-column align-items-start">
                    Third option:
                    <input
                      type="text"
                      name="option_three"
                      className="form-control"
                      onChange={this.handleChange}
                    />
                  </label>
                  <input
                    type="radio"
                    name="correct"
                    value="2"
                    className="form-check-input"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="d-flex align-items-center">
                  <label className="d-flex flex-column align-items-start">
                    Forth option:
                    <input
                      type="text"
                      name="option_four"
                      className="form-control"
                      onChange={this.handleChange}
                    />
                  </label>
                  <input
                    type="radio"
                    name="correct"
                    value="3"
                    className="form-check-input"
                    onChange={this.handleChange}
                  />
                </div>
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
          </Modal> */}
        </div>
      </div>
    );
  }
}
