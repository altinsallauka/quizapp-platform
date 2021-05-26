import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.scss";
// import DashboardComponent from "./components/dashboard/Dashboard.jsx";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import CategoriesList from "./categories/CategoriesList";
// import RolePage from "./../role-page/RolePage";/
import LoginComponent from "./../login/Login";
import PostQuestion from "./create-question/PostQuestion";
import QuestionsList from "./questions/QuestionsList";
import PostCategory from "./create-category/PostCategory";
import NavBar from "./nav-bar/NavBar";
function DashboardComponent() {
  return (
    // <nav className="navbar navbar-expand navbar-dark bg-primary">
    //   <div className="container">
    //     <a href="/home" className="navbar-brand">
    //       .Quest
    //     </a>
    //     {/* <div className="navbar-nav mr-auto"> */}
    //     <div className="navbar-nav">
    //       <li className="nav-item">
    //         <Link to={"/questions"} className="nav-link">
    //           Questions
    //         </Link>
    //       </li>
    //       <li className="nav-item">
    //         <Link to={"/categories"} className="nav-link">
    //           Categories
    //         </Link>
    //       </li>
    //       <li className="nav-item">
    //         <Link to={"/login"} className="nav-link">
    //           Login
    //         </Link>
    //       </li>
    //     </div>
    //   </div>
    // </nav>
    <Router>
      <NavBar />
      <div className="container">
        <Switch>
          <Route
            exact
            path={["/home", "/questions"]}
            component={QuestionsList}
          />
          <Route exact path="/login" component={LoginComponent} />
          {/* <Route exact path="/dashboard" component={DashboardComponent} /> */}
          <Route exact path="/create-question" component={PostQuestion} />
          {/* <Route exact path="/questions" component={QuestionsList} /> */}
          <Route exact path="/categories" component={CategoriesList} />
          <Route exact path="/create-category" component={PostCategory} />
        </Switch>
      </div>
    </Router>
  );
}

export default DashboardComponent;
