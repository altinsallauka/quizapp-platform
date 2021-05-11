import "./QuestionsList.scss";
import { Link } from "react-router-dom";

const QuestionsList = () => {
  return (
    <div>
      <h1 className="mt-4">Questions List</h1>
      <div className="row mt-4">
        <div className="col">
          <div className="row bd-box shadow-sm">
            <div className="col-md-8">
              <h2>Number of questions</h2>
            </div>
            <div className="col-md-4 num-bx">
              <h1>20</h1>
              <span>
                <Link to={"/create-question"} className="nav-link">
                  Create question
                </Link>
              </span>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="row bd-box shadow-sm">
            <div className="col-md-8">
              <h2>Number of categories</h2>
            </div>
            <div className="col-md-4 num-bx">
              <h1>4</h1>
              <span>
                <Link to={"/create-question"} className="nav-link">
                  Create category
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionsList;
