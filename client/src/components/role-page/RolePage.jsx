import React from "react";
import { Link } from "react-router-dom";
import "./RolePage.scss";

export default class RolePage extends React.Component {
  state = {};
  render() {
    return (
      <div className="row">
        <div className="container">
          <h1>RolePage</h1>
          <Link to={"/#"} className="nav-link">
            Student
          </Link>
          <Link to={"/login"} className="nav-link">
            Mentor
          </Link>
        </div>
      </div>
    );
  }
}
