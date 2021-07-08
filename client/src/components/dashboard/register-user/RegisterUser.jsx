import React from "react";
import axios from "axios";
import "./RegisterUser.scss";
export default class RegisterUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      roleId: "",
      roles: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { firstName, lastName, username, roleId, password } = this.state;
    const { data } = await axios.post("http://localhost:3001/users/register", {
      firstName,
      lastName,
      roleId,
      username,
      password,
    });
    console.log(data.data);
    this.props.history.push("/users");
  }
  getRoles() {
    axios.get("http://localhost:3001/roles").then((res) => {
      this.setState({ roles: res.data });
    });
  }
  componentDidMount() {
    this.getRoles();
  }
  render() {
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
                onChange={this.handleChange}
              />
            </label>
            <label className="d-flex flex-column align-items-start">
              Last Name:
              <input
                type="text"
                name="lastName"
                className="form-control"
                onChange={this.handleChange}
              />
            </label>
            <label className="d-flex flex-column align-items-start">
              Username:
              <input
                type="text"
                name="username"
                className="form-control"
                onChange={this.handleChange}
              />
            </label>
            <label className="d-flex flex-column align-items-start">
              Password:
              <input
                type="password"
                name="password"
                className="form-control"
                onChange={this.handleChange}
              />
            </label>
            <div className="d-flex align-items-center">
              <label className="d-flex flex-column align-items-start">
                Role:
                <select
                  className="form-select"
                  name="roleId"
                  aria-label="Default select example"
                  onChange={this.handleChange}
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
  }
}
