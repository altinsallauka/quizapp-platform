import { React } from "react";
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
import RegisterUser from "./components/dashboard/register-user/RegisterUser";
import MyProfile from "./components/dashboard/my-profile/MyProfile";
import RolesList from "./components/dashboard/roles/RolesList";
import PostRole from "./components/dashboard/create-role/PostRole";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./utils/ProtectedRoute";
import QuizEntry from "./components/quiz/quizEntry";
import StartExam from "./components/quiz/start-exam/startExam";
import Results from "./components/dashboard/results/Results";
import { useSelector } from "react-redux";
// import deleteImgSrc from "../src/assets/delete.png";
// Call it once in your app. At the root of your app is the best place
toast.configure();
function App() {
  const state = useSelector((state) => state);
  // console.log("rootReducer", state);
  return (
    <Router>
      <Switch>
        <Route
          exact
          path={[
            "/",
            "/role",
            "/login",
            "/sign-up",
            "/start-quiz",
            "/entry-quiz",
          ]}
          component={null}
        />
        <Route component={NavBar} />
      </Switch>
      <div className="container">
        <Switch>
          <Route exact path={["/", "/role"]} component={RolePage} />
          <Route exact path="/login" component={LoginComponent} />
          <Route exact path="/entry-quiz" component={QuizEntry} />
          <Route exact path="/start-quiz" component={StartExam} />
          {/* <Route exact path="/sign-up" component={RegisterUser} /> */}
          <ProtectedRoute exact path="/home" component={DashboardComponent} />
          <ProtectedRoute
            exact
            path="/create-question"
            component={PostQuestion}
          />
          <ProtectedRoute exact path="/questions" component={QuestionsList} />
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
          <ProtectedRoute exact path="/results" component={Results} />
          <ProtectedRoute exact path="/create-role" component={PostRole} />
        </Switch>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
