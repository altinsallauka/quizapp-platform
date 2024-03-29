import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RolesList.scss";
// import * as ReactBootStrap from "react-bootstrap";
import editImageSrc from "../../../assets/edit.png";
import deleteImageSrc from "../../../assets/delete.png";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RolesList = (props) => {
  const [access_token, setAccess_token] = useState(
    localStorage.getItem("token")
  );
  const [roles, setRoles] = useState([]);
  const [roleId, setRoleId] = useState("");
  const [role, setRole] = useState("");
  const [showHideDelete, setShowHideDelete] = useState(false);
  const [showHideUpdate, setShowHideUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [_id, set_Id] = useState("");

  const handleModalDelete = (id) => {
    // this.setState({
    //   showHideDelete: !this.state.showHideDelete,
    //   roleId: id,
    // });
    setShowHideDelete(!showHideDelete);
    setRoleId(id);
  };
  const handleModalUpdate = (id) => {
    // this.setState({
    //   showHideUpdate: !this.state.showHideUpdate,
    //   roleId: id,
    // });
    setShowHideUpdate(!showHideUpdate);
    setRoleId(id);
    axios
      .get(`http://localhost:3001/roles/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        const { role } = res.data;
        // this.setState({
        //   _id: id,
        //   role,
        // });
        // set_Id(id);
        setRoleId(id);
        setRole(role);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleSubmit = async (event, id) => {
    event.preventDefault();
    // const { roleId, role } = this.state;
    await axios
      .put(
        `http://localhost:3001/roles/${id}`,
        {
          _id: roleId,
          role: role,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      // role: role,
      .then((res) => {
        toast.success("Successfully updated Role!");
        getRoles();
        setShowHideUpdate(!showHideUpdate);
        // this.setState({ showHideUpdate: !this.state.showHideUpdate });
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.data.message);
      });
  };
  const getRoles = () => {
    // this.setState({ isLoading: true });
    setIsLoading(true);
    axios
      .get("http://localhost:3001/roles")
      .then((res) => {
        // this.setState({ roles: res.data, isLoading: false });
        setRoles(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const deleteRow = (id) => {
    axios
      .delete(`http://localhost:3001/roles/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        handleModalDelete();
        // getRoles();
        const index = roles.findIndex((role) => role._id === id);
        setRoles([...roles.slice(0, index), ...roles.slice(index + 1)]);
        toast.warning("Role has been deleted!");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  useEffect(() => {
    getRoles();
  }, []);

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
            {roles.map((userRoles) => (
              <div className="rolesBox shadow-sm p-3 mb-5 bg-body rounded">
                <span key={userRoles._id}>{userRoles.role}</span>
                <div className="roleIcons">
                  <button
                    className="btn btn-primary btn-xs"
                    onClick={() => handleModalUpdate(userRoles._id)}
                  >
                    <img src={editImageSrc} alt="Edit Icon" />
                  </button>
                  <button
                    className="btn btn-primary btn-xs"
                    // onClick={() => console.log("updated", row._id)}
                    onClick={() => handleModalDelete(userRoles._id)}
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
            Do you really want to delete this role? This process cannot be
            undone.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleModalDelete()}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => deleteRow(roleId)}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Update */}
        <Modal show={showHideUpdate}>
          <form onSubmit={(e) => handleSubmit(e, roleId)}>
            <Modal.Header onClick={() => handleModalUpdate()}>
              <Modal.Title>Edit role</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label className="d-flex flex-column align-items-start">
                Name:
                <input
                  type="text"
                  name="role"
                  value={role}
                  className="form-control"
                  onChange={(e) => setRole(e.target.value)}
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

export default RolesList;
