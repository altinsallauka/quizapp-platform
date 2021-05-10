import React from "react";
import { BrowserRouter as Router, Switch, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import PostQuestion from "./components/PostQuestion.jsx";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand">
          asQuiz-app
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/tutorials"} className="nav-link">
              Quiz
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          {/* <Route exact path={["/", "/tutorials"]} component={} />
          <Route exact path="/" component={} />
          <Route path="/" component={} /> */}
          <PostQuestion />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
