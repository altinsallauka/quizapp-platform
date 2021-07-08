import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import UsersList from "./users/UsersList";
import RegisterUser from "./register-user/RegisterUser";
import MyProfile from "./my-profile/MyProfile";
import RolesList from "./roles/RolesList";
function DashboardComponent() {
  return (
    <Router>
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
          <Route exact path="/users" component={UsersList} />
          <Route exact path="/my-profile" component={MyProfile} />
          <Route exact path="/register" component={RegisterUser} />
          <Route exact path="/roles" component={RolesList} />
        </Switch>
      </div>
    </Router>
  );
}

export default DashboardComponent;
