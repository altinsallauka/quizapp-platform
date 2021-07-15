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
import PostRole from "./create-role/PostRole";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./../../utils/ProtectedRoute";
// Call it once in your app. At the root of your app is the best place
toast.configure();
function DashboardComponent() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <ProtectedRoute
            exact
            path={["/home", "/questions"]}
            component={QuestionsList}
          />
          <Route exact path="/login" component={LoginComponent} />
          {/* <Route exact path="/dashboard" component={DashboardComponent} /> */}
          <ProtectedRoute
            exact
            path="/create-question"
            component={PostQuestion}
          />
          {/* <Route exact path="/questions" component={QuestionsList} /> */}
          <ProtectedRoute exact path="/categories" component={CategoriesList} />
          <ProtectedRoute
            exact
            path="/create-category"
            component={PostCategory}
          />
          <ProtectedRoute exact path="/users" component={UsersList} />
          <ProtectedRoute exact path="/my-profile" component={MyProfile} />
          <ProtectedRoute exact path="/register" component={RegisterUser} />
          <ProtectedRoute exact path="/roles" component={RolesList} />
          <ProtectedRoute exact path="/create-role" component={PostRole} />
        </Switch>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default DashboardComponent;
