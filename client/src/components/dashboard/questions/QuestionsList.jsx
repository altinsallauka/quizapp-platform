import React from "react";
import axios from "axios";
import "./QuestionsList.scss";
import { Link } from "react-router-dom";
// import editImageSrc from "../../../assets/edit.png";
// import deleteImageSrc from "../../../assets/delete.png";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import * as ReactBootStrap from "react-bootstrap";
import { Button, Modal } from "react-bootstrap";
export default class QuestionsList extends React.Component {
  constructor() {
    super();
    this.state = {
      rowId: "",
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
            this.setState({ rowId: row._id });
            return (
              <button
                className="btn btn-primary btn-xs"
                // onClick={() => console.log("updated", row._id)}
                onClick={() => this.handleModalUpdate()}
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
            this.setState({ rowId: row._id });
            return (
              <button
                className="btn btn-danger btn-xs"
                // onClick={() => console.log("deleted", row._id)}
                onClick={() => this.handleModalDelete()}
              >
                Delete
              </button>
            );
          },
        },
      ],
      showHideDelete: false,
      showHideUpdate: false,
    };
  }
  handleModalDelete() {
    this.setState({ showHideDelete: !this.state.showHideDelete });
  }
  handleModalUpdate() {
    this.setState({ showHideUpdate: !this.state.showHideUpdate });
  }
  componentDidMount() {
    this.getQuestions();
  }
  getQuestions() {
    axios.get(`http://localhost:3001/questions`).then((res) => {
      const questions = res.data;
      this.setState({ questions });
      const numberOfQuestions = res.data.length;
      this.setState({ numberOfQuestions });
    });
    // axios.get(`http://localhost:3001/numberOfQuestions`).then((res) => {
    //   const numberOfQuestions = res.data;
    //   this.setState({ numberOfQuestions });
    // });
  }
  deleteRow(id) {
    axios.delete(`http://localhost:3001/questions/${id}`).then((res) => {
      this.handleModalDelete();
      this.getQuestions();
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
        <div className="row mt-3">
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
          <caption>List of questions</caption>
          <BootstrapTable
            keyField="_id"
            data={this.state.questions}
            columns={this.state.columns}
            pagination={paginationFactory()}
          />
          {/* Delete */}
          <Modal show={this.state.showHideDelete}>
            <Modal.Header closeButton onClick={() => this.handleModalDelete()}>
              <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you really want to delete this question? This process cannot be
              undone.
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => this.handleModalDelete()}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => this.deleteRow(this.state.rowId)}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Update */}
          <Modal show={this.state.showHideUpdate}>
            <Modal.Header closeButton onClick={() => this.handleModalUpdate()}>
              <Modal.Title>Edit question</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you really want to delete this question? This process cannot be
              undone.
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => this.handleModalUpdate()}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => this.deleteRow(this.state.rowId)}
              >
                Update
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}
