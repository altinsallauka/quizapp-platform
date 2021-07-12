import React from "react";
import "./NavBar.scss";
import { Link } from "react-router-dom";
// import "../node_modules/jquery/dist/jquery.min.js";
// import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
// import "../../../../node_modules/jquery/dist/jquery.min.js";
import "../../../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default class NavBar extends React.Component {
  state = {};
  logOut() {
    localStorage.removeItem("token");
    toast.success("You have been logged out!");
    // this.props.history.push("/role");
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a href="/home" className="navbar-brand">
            Quizapp MERN
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
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
                <Link to={"/users"} className="nav-link">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/my-profile"} className="nav-link">
                  My Profile
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
            </ul>
          </div>
        </div>
      </nav>
      // <div>
      //   <nav className="navbar navbar-expand navbar-dark bg-primary">
      //     <div className="container">
      //       <a href="/home" className="navbar-brand">
      //         Quizapp MERN
      //       </a>
      //       {/* <div className="navbar-nav mr-auto"> */}
      //       <div className="navbar-nav">
      //         <li className="nav-item">
      //           <Link to={"/questions"} className="nav-link">
      //             Questions
      //           </Link>
      //         </li>
      //         <li className="nav-item">
      //           <Link to={"/categories"} className="nav-link">
      //             Categories
      //           </Link>
      //         </li>
      //         <li className="nav-item">
      //           <Link to={"/users"} className="nav-link">
      //             Users
      //           </Link>
      //         </li>
      //         <li className="nav-item">
      //           <Link to={"/my-profile"} className="nav-link">
      //             My Profile
      //           </Link>
      //         </li>
      //         <li className="nav-item">
      //           <Link
      //             to={"/role"}
      //             className="nav-link"
      //             onClick={() => this.logOut()}
      //           >
      //             Log out
      //           </Link>
      //         </li>
      //       </div>
      //     </div>
      //   </nav>
      // </div>
    );
  }
}
