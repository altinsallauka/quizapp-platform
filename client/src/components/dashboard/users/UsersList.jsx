import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UsersList.scss";
// import editImageSrc from "../../../assets/edit.png";
// import deleteImageSrc from "../../../assets/delete.png";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
// import * as ReactBootStrap from "react-bootstrap";
import { Button, Modal } from "react-bootstrap";
// import RolesList from "../roles/RolesList";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// export default class UsersList extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       access_token: localStorage.getItem("token"),
//       rowId: "",
//       users: [],
//       numberOfusers: "",
//       adminColumns: [
//         // {
//         //   dataField: "_id",
//         //   text: "ID",
//         // },
//         // { dataField: "firstName", text: "Name" },
//         // { dataField: "lastName", text: "Last Name" },
//         {
//           dataField: "username",
//           text: "Username",
//           sort: true,
//           filter: textFilter(),
//         },
//         {
//           dataField: "update",
//           text: "Update",
//           editable: false,
//           formatter: (cellContent, row) => {
//             this.setState({ rowId: row.id });
//             return (
//               <button
//                 className="btn btn-primary btn-xs"
//                 // onClick={() => console.log("updated", row._id)}
//                 onClick={() => this.handleModalUpdate(row.id)}
//               >
//                 Edit
//               </button>
//             );
//           },
//         },
//         {
//           dataField: "delete",
//           text: "Delete",
//           editable: false,
//           formatter: (cellContent, row) => {
//             this.setState({ rowId: row.id });
//             return (
//               <button
//                 className="btn btn-danger btn-xs"
//                 // onClick={() => console.log("deleted", row._id)}
//                 onClick={() => this.handleModalDelete(row.id)}
//               >
//                 Delete
//               </button>
//             );
//           },
//         },
//       ],
//       notAdminColumns: [
//         {
//           dataField: "username",
//           text: "Username",
//           sort: true,
//           filter: textFilter(),
//         },
//       ],
//       showHideDelete: false,
//       showHideUpdate: false,
//       toUpdate: [],
//       roles: [],
//       isAdmin: false,
//       isLoading: false,
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//   handleChange(event) {
//     this.setState({
//       toUpdate: {
//         ...this.state.toUpdate,
//         [event.target.name]: event.target.value,
//       },
//     });
//   }
//   getCurrentUser() {
//     axios
//       .get("http://localhost:3001/users/current", {
//         headers: {
//           Authorization: `Bearer ${this.state.access_token}`,
//         },
//       })
//       .then((res) => {
//         console.log(res.data);
//         const user = res.data;
//         // this.setState({ user });
//         axios
//           .get(`http://localhost:3001/roles/${user.roleId}`, {
//             headers: {
//               Authorization: `Bearer ${this.state.access_token}`,
//             },
//           })
//           .then((response) => {
//             console.log("Role by ID", response.data);
//             if (response.data.role === "Admin") {
//               this.setState({ isAdmin: true });
//             } else {
//               this.setState({ isAdmin: false });
//             }
//           });
//         return true;
//       })
//       .catch((err) => {
//         toast.error(err.response.data.message);
//       });
//   }
//   async handleSubmit(event) {
//     event.preventDefault();
//     // const { firstName, lastName } = this.state;
//     const updateUser = {
//       firstName: this.state.toUpdate.firstName,
//       lastName: this.state.toUpdate.lastName,
//     };
//     await axios
//       .put(`http://localhost:3001/users/${this.state.rowId}`, updateUser, {
//         headers: {
//           Authorization: `Bearer ${this.state.access_token}`,
//         },
//       })
//       .then((res) => {
//         toast.success("Successfully updated user!");
//         this.getusers();
//         this.setState({ showHideUpdate: !this.state.showHideUpdate });
//         console.log(res.data);
//         this.props.history.push("/users");
//       })
//       .catch((err) => {
//         toast.error(err.response.data.message);
//       });
//   }
//   handleModalDelete(id) {
//     this.setState({ showHideDelete: !this.state.showHideDelete, rowId: id });
//   }
//   closeUpdateModal() {
//     this.setState({ showHideUpdate: !this.state.showHideUpdate });
//   }
//   handleModalUpdate(id) {
//     this.setState({ showHideUpdate: !this.state.showHideUpdate, rowId: id });

//     axios
//       .get(`http://localhost:3001/users/${id}`, {
//         headers: {
//           Authorization: `Bearer ${this.state.access_token}`,
//         },
//       })
//       .then((res) => {
//         console.log("user", res.data);
//         this.setState({ toUpdate: res.data });
//         this.getRoleById();
//       })
//       .catch((err) => {
//         toast.error(err.response.data.message);
//       });
//   }
//   getRoleById() {
//     axios
//       .get(`http://localhost:3001/roles/${this.state.toUpdate.roleId}`, {
//         headers: {
//           Authorization: `Bearer ${this.state.access_token}`,
//         },
//       })
//       .then((res) => {
//         console.log(res.data);
//         // const { roleId } = this.state;
//         this.setState({
//           roleId: res.data._id,
//         });
//       })
//       .catch((err) => {
//         toast.error(err.response.data.message);
//       });
//   }
//   getusers() {
//     this.setState({ isLoading: true });
//     axios
//       .get("http://localhost:3001/users", {
//         headers: {
//           Authorization: `Bearer ${this.state.access_token}`,
//         },
//       })
//       .then((res) => {
//         console.log(res.data);
//         const users = res.data;
//         this.setState({ users });
//         this.setState({ isLoading: false });
//       })
//       .catch((err) => {
//         toast.error(err.response.data.message);
//       });
//     // .finally(() => {
//     //   this.setState({ isLoading: false });
//     // });
//   }
//   deleteRow(id) {
//     axios
//       .delete(`http://localhost:3001/users/${this.state.rowId}`, {
//         headers: {
//           Authorization: `Bearer ${this.state.access_token}`,
//         },
//       })
//       .then((res) => {
//         this.handleModalDelete();
//         this.getusers();
//         toast.warning("User has been deleted!");
//       })
//       .catch((err) => {
//         toast.error(err.response.data.message);
//       });
//   }
//   getRoles() {
//     axios
//       .get("http://localhost:3001/roles", {
//         headers: {
//           Authorization: `Bearer ${this.state.access_token}`,
//         },
//       })
//       .then((res) => {
//         this.setState({ roles: res.data });
//       })
//       .catch((err) => {
//         toast.error(err.response.data.message);
//       });
//   }
//   componentDidMount() {
//     this.getusers();
//     this.getRoles();
//     this.getCurrentUser();
//   }

//   render() {
//     const { isLoading, users } = this.state;
//     // if (isLoading) {
//     //   return (
//     //     <div className="mt-4">
//     //       <div class="spinner-border text-primary" role="status">
//     //         <span class="visually-hidden">Loading...</span>
//     //       </div>
//     //       <span class="text-primary ml-3">Loading users...</span>
//     //     </div>
//     //   );
//     // } else if (users.length <= 0) {
//     //   // setTimeout(() => {
//     //   //   this.setState({ isLoading: true });
//     //   // }, 1000);
//     //   return (
//     //     <div className="mt-4">
//     //       <div>
//     //         {this.state.isAdmin ? (
//     //           <div>
//     //             <Link to={"/register"} className="nav-link">
//     //               <h2>Register User</h2>
//     //             </Link>
//     //             <hr className="text-primary" />
//     //           </div>
//     //         ) : null}
//     //       </div>
//     //       <div>
//     //         {isLoading && (
//     //           <div className="mt-4">
//     //             <div class="spinner-border text-primary" role="status">
//     //               <span class="visually-hidden">Loading...</span>
//     //             </div>
//     //             <span class="text-primary ml-3">Loading users...</span>
//     //           </div>
//     //         )}
//     //         <span className="text-primary">
//     //           No users found on the database...
//     //         </span>
//     //       </div>
//     //     </div>
//     //   );
//     // } else {
//     if (isLoading || users.length > 0) {
//       return (
//         <div>
//           <div className="row mt-3 pt-4">
//             {isLoading ? (
//               <div className="mt-4">
//                 <div class="spinner-border text-primary" role="status">
//                   <span class="visually-hidden">Loading...</span>
//                 </div>
//                 <span class="text-primary ml-3">Loading users...</span>
//               </div>
//             ) : (
//               <div>
//                 {this.state.isAdmin ? (
//                   <div>
//                     <Link to={"/register"} className="nav-link">
//                       <h2>Register User</h2>
//                     </Link>
//                     <hr className="text-primary" />
//                   </div>
//                 ) : null}
//                 {/* {this.state.isAdmin ? <span>Admin</span> : null} */}
//                 <h6>List of users</h6>
//                 {this.state.isAdmin ? (
//                   <BootstrapTable
//                     keyField="id"
//                     data={this.state.users}
//                     columns={this.state.adminColumns}
//                     pagination={paginationFactory()}
//                     filter={filterFactory()}
//                   />
//                 ) : (
//                   <BootstrapTable
//                     keyField="id"
//                     data={this.state.users}
//                     columns={this.state.notAdminColumns}
//                     pagination={paginationFactory()}
//                     filter={filterFactory()}
//                   />
//                 )}
//                 {/* {this.state.isAdmin ? (
//             <div className="mt-4">
//               <hr />
//               <RolesList />
//             </div>
//           ) : null} */}

//                 {/* Delete */}
//                 <Modal show={this.state.showHideDelete}>
//                   <Modal.Header
//                     closeButton
//                     onClick={() => this.handleModalDelete()}
//                   >
//                     <Modal.Title>Are you sure?</Modal.Title>
//                   </Modal.Header>
//                   <Modal.Body>
//                     Do you really want to delete this user? This process cannot
//                     be undone.
//                   </Modal.Body>
//                   <Modal.Footer>
//                     <Button
//                       variant="secondary"
//                       onClick={() => this.handleModalDelete()}
//                     >
//                       Cancel
//                     </Button>
//                     <Button
//                       variant="danger"
//                       onClick={() => this.deleteRow(this.state.rowId)}
//                     >
//                       Delete
//                     </Button>
//                   </Modal.Footer>
//                 </Modal>

//                 {/* Update */}
//                 <Modal show={this.state.showHideUpdate}>
//                   <form onSubmit={(e) => this.handleSubmit(e)}>
//                     <Modal.Header
//                       closeButton
//                       onClick={() => this.handleModalUpdate()}
//                     >
//                       <Modal.Title>Update user</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                       <label className="d-flex flex-column align-items-start">
//                         First Name:
//                         <input
//                           type="text"
//                           name="firstName"
//                           value={this.state.toUpdate.firstName}
//                           className="form-control"
//                           onChange={this.handleChange}
//                         />
//                       </label>
//                       <label className="d-flex flex-column align-items-start">
//                         Last Name:
//                         <input
//                           type="text"
//                           name="lastName"
//                           className="form-control"
//                           value={this.state.toUpdate.lastName}
//                           onChange={this.handleChange}
//                         />
//                       </label>
//                       <div className="d-flex align-items-center">
//                         <label className="d-flex flex-column align-items-start">
//                           Role:
//                           <select
//                             className="form-select"
//                             name="roleId"
//                             aria-label="Default select example"
//                             value={this.state.toUpdate.roleId}
//                             onChange={this.handleChange}
//                           >
//                             <option disabled selected>
//                               Select one role
//                             </option>
//                             {this.state.roles.map((userRole) => (
//                               <option value={userRole._id} key={userRole._id}>
//                                 {userRole.role}
//                               </option>
//                             ))}
//                           </select>
//                         </label>
//                       </div>
//                     </Modal.Body>
//                     <Modal.Footer>
//                       <Button
//                         variant="secondary"
//                         type="button"
//                         onClick={() => this.closeUpdateModal()}
//                       >
//                         Cancel
//                       </Button>
//                       <Button
//                         type="submit"
//                         value="submit"
//                         variant="primary"
//                         // onClick={() => this.deleteRow(this.state.rowId)}
//                         // onClick={() => this.handleSubmit()}
//                       >
//                         Update
//                       </Button>
//                     </Modal.Footer>
//                   </form>
//                 </Modal>
//               </div>
//             )}
//           </div>
//         </div>
//       );
//     } else if (users.length <= 0) {
//       return (
//         <div>
//           <div className="mt-4">
//             <div>
//               {/* {isLoading && (
//               <div className="mt-4">
//                 <div class="spinner-border text-primary" role="status">
//                   <span class="visually-hidden">Loading...</span>
//                 </div>
//                 <span class="text-primary ml-3">Loading questions...</span>
//               </div>
//             )} */}
//               <span className="text-primary">
//                 No users found on the database...
//               </span>
//             </div>
//           </div>
//         </div>
//       );
//     }
//   }
// }

const UsersList = (props) => {
  const [access_token, setAccess_token] = useState(
    localStorage.getItem("token")
  );
  const [rowId, setRowId] = useState("");
  const [users, setUsers] = useState([]);
  const [numberOfUsers, setNumberOfUsers] = useState("");
  const [adminColumns, setAdminColumns] = useState([
    // {
    //   dataField: "_id",
    //   text: "ID",
    // },
    // { dataField: "firstName", text: "Name" },
    // { dataField: "lastName", text: "Last Name" },
    {
      dataField: "username",
      text: "Username",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "update",
      text: "Update",
      editable: false,
      formatter: (cellContent, row) => {
        setRowId(row.id);
        return (
          <button
            className="btn btn-primary btn-xs"
            // onClick={() => console.log("updated", row._id)}
            onClick={() => handleModalUpdate(row.id)}
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
        setRowId(row.id);
        return (
          <button
            className="btn btn-danger btn-xs"
            // onClick={() => console.log("deleted", row._id)}
            onClick={() => handleModalDelete(row.id)}
          >
            Delete
          </button>
        );
      },
    },
  ]);
  const [notAdminColumns, setNotAdminColumns] = useState([
    {
      dataField: "username",
      text: "Username",
      sort: true,
      filter: textFilter(),
    },
  ]);
  const [showHideDelete, setShowHideDelete] = useState(false);
  const [showHideUpdate, setShowHideUpdate] = useState(false);
  const [toUpdate, setToUpdate] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [roleId, setRoleId] = useState("");

  const getCurrentUser = () => {
    axios
      .get("http://localhost:3001/users/current", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        const user = res.data;
        axios
          .get(`http://localhost:3001/roles/${user.roleId}`, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          })
          .then((response) => {
            console.log("Role by ID", response.data);
            if (response.data.role === "Admin") {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
          });
        return true;
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updateUser = {
      firstName: toUpdate.firstName,
      lastName: toUpdate.lastName,
      roleId: toUpdate.roleId,
    };
    await axios
      .put(`http://localhost:3001/users/${rowId}`, updateUser, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        toast.success("Successfully updated user!");
        getusers();
        // this.setState({ showHideUpdate: !this.state.showHideUpdate });
        setShowHideUpdate(!showHideUpdate);
        console.log(res.data);
        // props.history.push("/users");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const handleModalDelete = (id) => {
    // this.setState({ showHideDelete: !this.state.showHideDelete, rowId: id });
    setShowHideDelete(!showHideDelete);
  };
  const closeUpdateModal = () => {
    setShowHideUpdate(!showHideUpdate);
  };

  const handleModalUpdate = async (id) => {
    // this.setState({ showHideUpdate: !this.state.showHideUpdate, rowId: id });
    setShowHideUpdate(!showHideUpdate);
    setRowId(id);

    await axios
      .get(`http://localhost:3001/users/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        console.log("user", res.data);
        setToUpdate(res.data);
        getRoleById();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const getRoleById = async () => {
    await axios
      .get(`http://localhost:3001/roles/${toUpdate.roleId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        // const { roleId } = this.state;
        // this.setState({
        //   roleId: res.data._id,
        // });
        setRoleId({ roleId: res.data._id });
        console.log("roleID", roleId);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const getusers = () => {
    setIsLoading(true);
    axios
      .get("http://localhost:3001/users", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        const users = res.data;
        setUsers(users);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        // toast.error(err.response.data.message);
      });
    // .finally(() => {
    //   this.setState({ isLoading: false });
    // });
  };

  const deleteRow = (id) => {
    axios
      .delete(`http://localhost:3001/users/${rowId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        handleModalDelete();
        getusers();
        toast.warning("User has been deleted!");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const getRoles = () => {
    axios
      .get("http://localhost:3001/roles", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        setRoles(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    getusers();
    getRoles();
    getCurrentUser();
  }, []);

  if (isLoading || users.length > 0) {
    return (
      <div>
        <div className="row mt-3 pt-4">
          {isLoading ? (
            <div className="mt-4">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <span class="text-primary ml-3">Loading users...</span>
            </div>
          ) : (
            <div>
              {isAdmin ? (
                <div>
                  <Link to={"/register"} className="nav-link">
                    <h2>Register User</h2>
                  </Link>
                  <hr className="text-primary" />
                </div>
              ) : null}
              {/* {this.state.isAdmin ? <span>Admin</span> : null} */}
              <h6>List of users</h6>
              {isAdmin ? (
                <BootstrapTable
                  keyField="id"
                  data={users}
                  columns={adminColumns}
                  pagination={paginationFactory()}
                  filter={filterFactory()}
                />
              ) : (
                <BootstrapTable
                  keyField="id"
                  data={users}
                  columns={notAdminColumns}
                  pagination={paginationFactory()}
                  filter={filterFactory()}
                />
              )}
              {/* {this.state.isAdmin ? (
          <div className="mt-4">
            <hr />
            <RolesList />
          </div>
        ) : null} */}

              {/* Delete */}
              <Modal show={showHideDelete}>
                <Modal.Header onClick={() => handleModalDelete()}>
                  <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Do you really want to delete this user? This process cannot be
                  undone.
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => handleModalDelete()}
                  >
                    Cancel
                  </Button>
                  <Button variant="danger" onClick={() => deleteRow(rowId)}>
                    Delete
                  </Button>
                </Modal.Footer>
              </Modal>

              {/* Update */}
              <Modal show={showHideUpdate}>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <Modal.Header onClick={() => handleModalUpdate()}>
                    <Modal.Title>Update user</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <label className="d-flex flex-column align-items-start">
                      First Name:
                      <input
                        type="text"
                        name="firstName"
                        value={toUpdate.firstName}
                        className="form-control"
                        onChange={(e) =>
                          // setToUpdate(...toUpdate, {
                          //   firstName: e.target.value,
                          // })
                          setToUpdate({
                            ...toUpdate,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </label>
                    <label className="d-flex flex-column align-items-start">
                      Last Name:
                      <input
                        type="text"
                        name="lastName"
                        className="form-control"
                        value={toUpdate.lastName}
                        onChange={(e) =>
                          setToUpdate({
                            ...toUpdate,
                            lastName: e.target.value,
                          })
                        }
                      />
                    </label>
                    <div className="d-flex align-items-center">
                      <label className="d-flex flex-column align-items-start">
                        Role:
                        <select
                          className="form-select"
                          name="roleId"
                          aria-label="Default select example"
                          value={toUpdate.roleId}
                          onChange={(e) =>
                            setToUpdate({
                              ...toUpdate,
                              roleId: e.target.value,
                            })
                          }
                        >
                          <option disabled>Select one role</option>
                          {roles.map((userRole) => (
                            <option value={userRole._id} key={userRole._id}>
                              {userRole.role}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      type="button"
                      onClick={() => closeUpdateModal()}
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
          )}
        </div>
      </div>
    );
  } else if (users.length <= 0) {
    return (
      <div>
        <div className="mt-4">
          <div>
            {/* {isLoading && (
            <div className="mt-4">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <span class="text-primary ml-3">Loading questions...</span>
            </div>
          )} */}
            <span className="text-primary">
              No users found on the database...
            </span>
          </div>
        </div>
      </div>
    );
  }
};

export default UsersList;
