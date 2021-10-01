import React from "react";
import { Link } from "react-router-dom";
import "./RolePage.scss";

const RolePage = () => {
  return (
    <div className="row">
      <div className="container role-content">
        <h1 className="mb-5">Start using our platform as</h1>
        <div className="role-links">
          <Link to={"/entry-quiz"} className="nav-link">
            Student
          </Link>
          <Link to={"/login"} className="nav-link">
            Mentor
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RolePage;
