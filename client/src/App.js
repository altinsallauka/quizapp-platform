import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import PostQuestion from "./components/dashboard/create-question/PostQuestion.jsx";
import QuestionsList from "./components/dashboard/questions/QuestionsList";
import LoginComponent from "./components/login/Login";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import CategoriesList from "./components/dashboard/categories/CategoriesList";
import PostCategory from "./components/dashboard/create-category/PostCategory";
import RolePage from "./components/role-page/RolePage";
import DashboardComponent from "./components/dashboard/Dashboard";
function App() {
  return (
    //   <nav className="navbar navbar-expand navbar-dark bg-primary">
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
      <div className="">
        <Switch>
          <Route exact path={["/", "/role"]} component={RolePage} />
          <Route exact path="/login" component={LoginComponent} />
          <Route exact path="/home" component={DashboardComponent} />
          <Route exact path="/create-question" component={PostQuestion} />
          <Route exact path="/questions" component={QuestionsList} />
          <Route exact path="/categories" component={CategoriesList} />
          <Route exact path="/create-category" component={PostCategory} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
