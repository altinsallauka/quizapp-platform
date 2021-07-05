import React from "react";
import "./NavBar.scss";
import { Link } from "react-router-dom";
export default class NavBar extends React.Component {
  state = {};
  logOut() {
    localStorage.removeItem("token");
    // this.props.history.push("/role");
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-primary">
          <div className="container">
            <a href="/home" className="navbar-brand">
              Quizapp MERN
            </a>
            {/* <div className="navbar-nav mr-auto"> */}
            <div className="navbar-nav">
              <li className="nav-item">
                <Link to={"/users"} className="nav-link">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/questions"} className="nav-link">
                  Questions
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/categories"} className="nav-link">
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={"/role"}
                  className="nav-link"
                  onClick={() => this.logOut()}
                >
                  Log out
                </Link>
              </li>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
