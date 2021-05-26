import React from "react";
import { Link } from "react-router-dom";
import "./RolePage.scss";
import axios from "axios";

export default class RolePage extends React.Component {
  state = {};
  render() {
    return (
      <div>
        <h1>RolePage</h1>
        <Link to={"/home"} className="nav-link">
          Home
        </Link>
        <Link to={"/login"} className="nav-link">
          Login
        </Link>
      </div>
    );
  }
}
