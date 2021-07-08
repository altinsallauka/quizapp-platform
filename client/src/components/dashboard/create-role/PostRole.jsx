import React from "react";
import "./PostRole.scss";
import axios from "axios";

export default class PostRole extends React.Component {
  constructor(props) {
    super(props);
    this.state = { role: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  async handleSubmit(event) {
    event.preventDefault();
    const { role } = this.state;
    const { data } = await axios.post("http://localhost:3001/roles", {
      role,
    });
    console.log(data.data);
    this.props.history.push("/users");
  }
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="container">
            <div className="col-md-6">
              <form onSubmit={this.handleSubmit}>
                <div className="mb-3">
                  <h1>Create Role</h1>
                  <label for="roleNameInput" className="form-label">
                    Role name
                  </label>
                  <input
                    type="text"
                    name="role"
                    className="form-control"
                    id="roleNameInput"
                    onChange={this.handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
