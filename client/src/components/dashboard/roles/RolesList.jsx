import React from "react";
import axios from "axios";
import "./RolesList.scss";
// import * as ReactBootStrap from "react-bootstrap";
import editImageSrc from "../../../assets/edit.png";
import deleteImageSrc from "../../../assets/delete.png";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default class RolesList extends React.Component {
  constructor() {
    super();
    this.state = {
      roles: [],
      roleId: "",
      role: "",
      showHideDelete: false,
      showHideUpdate: false,
      isLoading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleModalDelete(id) {
    this.setState({
      showHideDelete: !this.state.showHideDelete,
      roleId: id,
    });
  }
  handleModalUpdate(id) {
    this.setState({
      showHideUpdate: !this.state.showHideUpdate,
      roleId: id,
    });
    axios
      .get(`http://localhost:3001/roles/${id}`)
      .then((res) => {
        const { role } = res.data;
        this.setState({
          _id: id,
          role,
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }
  async handleSubmit(event) {
    event.preventDefault();
    const { roleId, role } = this.state;
    await axios
      .put(`http://localhost:3001/roles/${roleId}`, {
        _id: roleId,
        role: role,
      })
      .then((res) => {
        toast.success("Successfully updated Role!");
        this.getRoles();
        this.setState({ showHideUpdate: !this.state.showHideUpdate });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }
  getRoles() {
    this.setState({ isLoading: true });
    axios
      .get("http://localhost:3001/roles")
      .then((res) => {
        this.setState({ roles: res.data, isLoading: false });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }
  deleteRow(id) {
    axios
      .delete(`http://localhost:3001/roles/${id}`)
      .then((res) => {
        this.handleModalDelete();
        this.getRoles();
        toast.warning("Role has been deleted!");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }
  componentDidMount() {
    this.getRoles();
  }
  render() {
    const { isLoading, roles } = this.state;
    if (isLoading) {
      return (
        <div className="mt-4">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <span class="text-primary ml-3">Loading roles...</span>
        </div>
      );
    } else if (roles.length <= 0) {
      return (
        <div className="mt-4">
          <div>
            {isLoading && (
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            )}
            <span className="text-primary">
              No roles found on the database...
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="row">
            <div className="title-container mt-4">
              <h1>Roles</h1>
              <h1>
                <Link to={"/create-role"} className="nav-link">
                  +
                </Link>
              </h1>
            </div>
          </div>
          <div className="row">
            <h6>List of Roles</h6>
            <div className="container role">
              {this.state.roles.map((userRoles) => (
                <div className="rolesBox shadow-sm p-3 mb-5 bg-body rounded">
                  <span key={userRoles._id}>{userRoles.role}</span>
                  <div className="roleIcons">
                    <button
                      className="btn btn-primary btn-xs"
                      onClick={() => this.handleModalUpdate(userRoles._id)}
                    >
                      <img src={editImageSrc} alt="Edit Icon" />
                    </button>
                    <button
                      className="btn btn-primary btn-xs"
                      // onClick={() => console.log("updated", row._id)}
                      onClick={() => this.handleModalDelete(userRoles._id)}
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
              Do you really want to delete this role? This process cannot be
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
                onClick={() => this.deleteRow(this.state.roleId)}
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
                <Modal.Title>Edit role</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <label className="d-flex flex-column align-items-start">
                  Name:
                  <input
                    type="text"
                    name="role"
                    value={this.state.role}
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
