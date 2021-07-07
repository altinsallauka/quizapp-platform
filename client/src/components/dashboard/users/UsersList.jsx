import React from "react";
import axios from "axios";
import "./UsersList.scss";
// import editImageSrc from "../../../assets/edit.png";
// import deleteImageSrc from "../../../assets/delete.png";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
// import * as ReactBootStrap from "react-bootstrap";
import { Button, Modal } from "react-bootstrap";
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
        // { dataField: "firstName", text: "Name" },
        // { dataField: "lastName", text: "Last Name" },
        { dataField: "username", text: "Username" },
        {
          dataField: "update",
          text: "Update",
          editable: false,
          formatter: (cellContent, row) => {
            this.setState({ rowId: row.id });
            return (
              <button
                className="btn btn-primary btn-xs"
                // onClick={() => console.log("updated", row._id)}
                onClick={() => this.handleModalUpdate(row.id)}
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
            this.setState({ rowId: row.id });
            return (
              <button
                className="btn btn-danger btn-xs"
                // onClick={() => console.log("deleted", row._id)}
                onClick={() => this.handleModalDelete(row.id)}
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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      toUpdate: {
        ...this.state.toUpdate,
        [event.target.name]: event.target.value,
      },
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    // const { firstName, lastName } = this.state;
    const access_token = localStorage.getItem("token");
    const updateUser = {
      firstName: this.state.toUpdate.firstName,
      lastName: this.state.toUpdate.lastName,
    };
    const { data } = await axios.put(
      `http://localhost:3001/users/${this.state.rowId}`,
      updateUser,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    this.getusers();
    this.setState({ showHideUpdate: !this.state.showHideUpdate });
    console.log(data.data);
    this.props.history.push("/users");
  }
  handleModalDelete(id) {
    this.setState({ showHideDelete: !this.state.showHideDelete, rowId: id });
  }
  handleModalUpdate(id) {
    this.setState({ showHideUpdate: !this.state.showHideUpdate, rowId: id });

    const access_token = localStorage.getItem("token");
    axios
      .get(`http://localhost:3001/users/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        console.log("user", res.data);
        this.setState({ toUpdate: res.data });
      });
  }
  getusers() {
    const access_token = localStorage.getItem("token");
    // axios.get(`http://localhost:3001/users`, token).then((res) => {
    //   const users = res.data;
    //   this.setState({ users });
    // });

    axios
      .get("http://localhost:3001/users", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        const users = res.data;
        this.setState({ users });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  deleteRow(id) {
    const access_token = localStorage.getItem("token");

    axios
      .delete(`http://localhost:3001/users/${this.state.rowId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
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
        <div className="row mt-3 pt-4">
          <Link to={"/register"} className="nav-link">
            <h2>Register User</h2>
          </Link>
          <hr />
          <h3>List of users</h3>
          <BootstrapTable
            keyField="id"
            data={this.state.users}
            columns={this.state.columns}
            pagination={paginationFactory()}
          />
          {/* Delete */}
          <Modal show={this.state.showHideDelete}>
            <Modal.Header closeButton onClick={() => this.handleModalDelete()}>
              <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you really want to delete this user? This process cannot be
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
          </Modal>

          {/* Update */}
          <Modal show={this.state.showHideUpdate}>
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <Modal.Header
                closeButton
                onClick={() => this.handleModalUpdate()}
              >
                <Modal.Title>Update user</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <label className="d-flex flex-column align-items-start">
                  First Name:
                  <input
                    type="text"
                    name="firstName"
                    value={this.state.toUpdate.firstName}
                    className="form-control"
                    onChange={this.handleChange}
                  />
                </label>
                <label className="d-flex flex-column align-items-start">
                  Last Name:
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    value={this.state.toUpdate.lastName}
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
      </div>
    );
  }
}
