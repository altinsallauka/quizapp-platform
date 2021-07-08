import React from "react";
import axios from "axios";
import "./MyProfile.scss";
import userImageSrc from "../../../assets/user.jpg";
export default class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value,
      },
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { user } = this.state;
    const access_token = localStorage.getItem("token");
    axios
      .put(`http://localhost:3001/users/${user.id}`, user, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        console.log("user", res.data);
        // this.setState({ user: res.data });
      });
    this.props.history.push("/users");
  }
  getCurrentUser() {
    const access_token = localStorage.getItem("token");

    axios
      .get("http://localhost:3001/users/current", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        const user = res.data;
        this.setState({ user });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  componentDidMount() {
    this.getCurrentUser();
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-6 mt-5">
          <h1>My Profile</h1>
          <hr />
          <div className="profile">
            <div>
              <img src={userImageSrc} alt="User profile" className="user-pic" />
            </div>
            <div>
              {/* <span>info</span> */}

              <form onSubmit={this.handleSubmit}>
                <label className="d-flex flex-column align-items-start">
                  First Name:
                  <input
                    type="text"
                    name="firstName"
                    value={this.state.user.firstName}
                    className="form-control"
                    onChange={this.handleChange}
                  />
                </label>
                <label className="d-flex flex-column align-items-start">
                  Last Name:
                  <input
                    type="text"
                    name="lastName"
                    value={this.state.user.lastName}
                    className="form-control"
                    onChange={this.handleChange}
                  />
                </label>
                <label className="d-flex flex-column align-items-start">
                  Username:
                  <input
                    type="text"
                    name="username"
                    value={this.state.user.username}
                    className="form-control"
                    onChange={this.handleChange}
                  />
                </label>
                <label className="d-flex flex-column align-items-start">
                  New Password:
                  <input
                    type="password"
                    name="password"
                    value={this.state.user.password}
                    className="form-control"
                    onChange={this.handleChange}
                  />
                </label>
                <input
                  type="submit"
                  className="btn btn-primary mt-2"
                  value="Submit"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}