import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import PostQuestion from "./components/dashboard/create-question/PostQuestion.jsx";
import DashboardComponent from "./components/dashboard/Dashboard.jsx";
import QuestionsList from "./components/dashboard/questions/QuestionsList";
import LoginComponent from "./components/login/Login";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import CategoriesList from "./components/dashboard/categories/CategoriesList";
function App() {
  return (
    <Router>
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
              <Link to={"/create-question"} className="nav-link">
                Create question
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

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/login"]} component={LoginComponent} />
          <Route exact path="/create-question" component={PostQuestion} />
          <Route exact path="/questions" component={QuestionsList} />
          <Route exact path="/categories" component={CategoriesList} />
          <Route exact path="/home" component={DashboardComponent} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
