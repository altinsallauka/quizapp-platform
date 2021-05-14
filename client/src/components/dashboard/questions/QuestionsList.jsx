import React from "react";
import axios from "axios";
import "./QuestionsList.scss";
import { Link } from "react-router-dom";
import editImageSrc from "../../../assets/edit.png";
import deleteImageSrc from "../../../assets/delete.png";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import * as ReactBootStrap from "react-bootstrap";

export default class QuestionsList extends React.Component {
  state = {
    questions: [],
    numberOfQuestions: "",
    columns: [
      // {
      //   dataField: "_id",
      //   text: "ID",
      // },
      { dataField: "description", text: "Question" },
      {
        dataField: "update",
        text: "Update",
        editable: false,
        formatter: (cellContent, row) => {
          return (
            <button
              className="btn btn-primary btn-xs"
              onClick={() => console.log("updated", row._id)}
            >
              Edit
            </button>
          );
        },
      },
      {
        dataField: "delete",
        text: "Delete",
        editable: false,
        formatter: (cellContent, row) => {
          return (
            <button
              className="btn btn-danger btn-xs"
              onClick={() => console.log("deleted", row._id)}
            >
              Delete
            </button>
          );
        },
      },
    ],
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

    // const columns = [{ dataField: "description", text: "Question" }];
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
          {/* <table className="table caption-top">
            <caption>List of questions</caption>
            <thead>
              <tr>
                <th scope="col">Question</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.questions.map((question) => (
                <tr>
                  <td key="question._id">{question.description}</td>
                  <td>
                    <button>
                      <img src={editImageSrc} className="action-icon" />
                    </button>
                  </td>
                  <td>
                    <button>
                      <img src={deleteImageSrc} className="action-icon" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
          <BootstrapTable
            keyField="_id"
            data={this.state.questions}
            columns={this.state.columns}
            pagination={paginationFactory()}
          />
        </div>
      </div>
    );
  }
}
