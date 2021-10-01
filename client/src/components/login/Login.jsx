import React, { useState } from "react";
import axios from "axios";
import "./Login.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Link } from "react-router-dom";

const LoginComponent = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:3001/users/authenticate", { username, password })
      .then((res) => {
        const data = res.data;
        toast.success("Successfully logged in!");
        console.log("data", data);
        // this.setState({ token: res.data.token });
        setToken({ token: res.data.token });
        localStorage.setItem("token", res.data.token);
        props.history.push("/home");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        // toast.error(
        //   "Oops, something went wrong!  " + err.response.data.message
        // );
        toast.error(err.response.data.message);
      });
  };
  return (
    <React.Fragment>
      <div className="row">
        <div className="container login-view">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                  aria-describedby="emailHelp"
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  id="exampleInputPassword1"
                />
              </div>
              {/* <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={this.handleChange}
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Check me out
                  </label>
                </div> */}
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            {/* <h6 className="text-primary mt-3">
                <Link to={"/sign-up"} className="sign-up">
                  You don't have an account? Sign Up!
                </Link>
              </h6> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginComponent;
