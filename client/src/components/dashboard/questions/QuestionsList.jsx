import React from "react";
import axios from "axios";
import "./QuestionsList.scss";
import { Link } from "react-router-dom";
import editImageSrc from "../../../assets/edit.png";
import deleteImageSrc from "../../../assets/delete.png";
export default class QuestionsList extends React.Component {
  state = {
    questions: [],
    numberOfQuestions: "",
  };
  componentDidMount() {
    axios.get(`http://localhost:3001/questions`).then((res) => {
      const questions = res.data;
      this.setState({ questions });
    });
    axios.get(`http://localhost:3001/numberOfQuestions`).then((res) => {
      const numberOfQuestions = res.data;
      this.setState({ numberOfQuestions });
    });
  }
  render() {
    return (
      <div>
        <h1 className="mt-4"></h1>
        <div className="row mt-4">
          <div className="col">
            <div className="row bd-box shadow-sm">
              <div className="col-md-8">
                <h2>Number of questions</h2>
              </div>
              <div className="col-md-4 num-bx">
                <h1>{this.state.numberOfQuestions}</h1>
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
        <div className="container">
          <table className="table caption-top">
            <caption>List of questions</caption>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Question</th>
                <th scope="col">Delete</th>
                <th scope="col">Update</th>
              </tr>
            </thead>
            <tbody>
              {/* <th scope="row">1</th> */}
              {this.state.questions.map((question) => (
                <tr>
                  <td>{question._id}</td>
                  <td key="question._id">{question.description}</td>
                  <td>
                    <button>
                      <img src={deleteImageSrc} className="action-icon" />
                    </button>
                  </td>
                  <td>
                    <button>
                      <img src={editImageSrc} className="action-icon" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
