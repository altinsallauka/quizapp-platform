import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import NavBar from "./components/dashboard/nav-bar/NavBar";
import UsersList from "./components/dashboard/users/UsersList";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={["/", "/role", "/login"]} component={null} />
        <Route component={NavBar} />
      </Switch>
      <div className="container">
        <Switch>
          <Route exact path={["/", "/role"]} component={RolePage} />
          <Route exact path="/login" component={LoginComponent} />
          <Route exact path="/home" component={DashboardComponent} />
          <Route exact path="/create-question" component={PostQuestion} />
          <Route exact path="/questions" component={QuestionsList} />
          <Route exact path="/users" component={UsersList} />
          <Route exact path="/categories" component={CategoriesList} />
          <Route exact path="/create-category" component={PostCategory} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
