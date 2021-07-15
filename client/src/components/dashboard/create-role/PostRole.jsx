import React from "react";
import "./PostRole.scss";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default class PostRole extends React.Component {
  constructor(props) {
    super(props);
    this.state = { role: "", access_token: localStorage.getItem("token") };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  async handleSubmit(event) {
    event.preventDefault();
    const { role } = this.state;
    await axios
      .post(
        "http://localhost:3001/roles",
        {
          role,
        },
        {
          headers: {
            Authorization: `Bearer ${this.state.access_token}`,
          },
        }
      )
      .then((res) => {
        toast.success("New role has been added!");
        this.props.history.push("/users");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
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
