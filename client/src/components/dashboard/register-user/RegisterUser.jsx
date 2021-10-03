import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RegisterUser.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const RegisterUser = (props) => {
  const [access_token, setAccessToken] = useState(
    localStorage.getItem("token")
  );
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("");
  const [roles, setRoles] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const { firstName, lastName, username, roleId, password } = this.state;
    await axios
      .post("http://localhost:3001/users/register", {
        firstName,
        lastName,
        roleId,
        username,
        password,
      })
      .then((res) => {
        props.history.push("/users");
        toast.success("User has been registered!");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const getRoles = () => {
    axios
      .get("http://localhost:3001/roles")
      .then((res) => {
        // this.setState({ roles: res.data });
        setRoles(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  useEffect(() => {
    getRoles();
  }, []);

  return (
    <div className="row">
      <div className="col-md-6">
        <h1>Register User</h1>
        <form onSubmit={this.handleSubmit}>
          <label className="d-flex flex-column align-items-start">
            First Name:
            <input
              type="text"
              name="firstName"
              className="form-control"
              onChange={(e) => setFirstname(e.target.value)}
            />
          </label>
          <label className="d-flex flex-column align-items-start">
            Last Name:
            <input
              type="text"
              name="lastName"
              className="form-control"
              onChange={(e) => setLastname(e.target.value)}
            />
          </label>
          <label className="d-flex flex-column align-items-start">
            Username:
            <input
              type="text"
              name="username"
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label className="d-flex flex-column align-items-start">
            Password:
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className="d-flex align-items-center">
            <label className="d-flex flex-column align-items-start">
              Role:
              <select
                className="form-select"
                name="roleId"
                aria-label="Default select example"
                onChange={(e) => setRoleId(e.target.value)}
              >
                <option disabled selected>
                  Select one role
                </option>
                {this.state.roles.map((userRole) => (
                  <option value={userRole._id} key={userRole._id}>
                    {userRole.role}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <input
            type="submit"
            className="btn btn-primary mt-2"
            value="Submit"
          />
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
