import React from "react";
import "./NavBar.scss";
import { Link } from "react-router-dom";
export default class NavBar extends React.Component {
  state = {};
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-primary">
          <div className="container">
            <a href="/home" className="navbar-brand">
              .Quest
            </a>
            {/* <div className="navbar-nav mr-auto"> */}
            <div className="navbar-nav">
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
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
