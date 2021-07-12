import React from "react";
import axios from "axios";
import "./QuestionsList.scss";
import { Link } from "react-router-dom";
// import editImageSrc from "../../../assets/edit.png";
// import deleteImageSrc from "../../../assets/delete.png";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
// import * as ReactBootStrap from "react-bootstrap";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default class QuestionsList extends React.Component {
  constructor() {
    super();
    this.state = {
      rowId: "",
      questions: [],
      numberOfQuestions: "",
      numberOfCategories: "",
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
                onClick={() => this.handleModalUpdate(row._id)}
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
      toUpdate: {
        _id: "",
        categoryId: "",
        option_one: "",
        correct: -1,
        option_two: "",
        option_three: "",
        option_four: "",
        description: "",
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleChange2(event) {
    this.setState({
      toUpdate: {
        ...this.state.toUpdate,
        [event.target.name]: event.target.value,
      },
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {
      toUpdate: {
        option_one,
        correct,
        option_two,
        option_three,
        option_four,
        description,
        _id,
        categoryId,
      },
    } = this.state;

    const valuesTochange = {
      description,
      alternatives: [
        { text: option_one, isCorrect: false },
        { text: option_two, isCorrect: false },
        { text: option_three, isCorrect: false },
        { text: option_four, isCorrect: false },
      ],
      _id,
      categoryId,
    };
    valuesTochange.alternatives[correct].isCorrect = true;
    await axios
      .put(
        `http://localhost:3001/questions/${this.state.rowId}`,
        valuesTochange
      )
      .then((res) => {
        this.getQuestions();
        this.setState({ showHideUpdate: !this.state.showHideUpdate });
        toast.success("Question has been updated!");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });

    // this.props.history.push("/questions");
  }
  handleModalDelete() {
    this.setState({ showHideDelete: !this.state.showHideDelete });
  }
  handleModalUpdate(id) {
    this.setState({ showHideUpdate: !this.state.showHideUpdate });
    axios
      .get(`http://localhost:3001/questions/${id}`)
      .then((res) => {
        const { description, categoryId, alternatives } = res.data;
        this.setState({
          toUpdate: {
            description,
            option_one: alternatives[0].text,
            correct: alternatives.findIndex((item) => item.isCorrect),
            option_two: alternatives[1].text,
            option_three: alternatives[2].text,
            option_four: alternatives[3].text,
            _id: id,
            categoryId,
          },
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }
  getQuestions() {
    axios
      .get(`http://localhost:3001/questions`)
      .then((res) => {
        const questions = res.data;
        this.setState({ questions });
        const numberOfQuestions = res.data.length;
        this.setState({ numberOfQuestions });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }
  deleteRow(id) {
    axios
      .delete(`http://localhost:3001/questions/${id}`)
      .then((res) => {
        this.handleModalDelete();
        this.getQuestions();
        toast.warning("Question has been deleted!");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }
  componentDidMount() {
    this.getQuestions();
    axios
      .get(`http://localhost:3001/categories`)
      .then((res) => {
        const numberOfCategories = res.data.length;
        this.setState({ numberOfCategories });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }

  render() {
    // console.log(this.state.toUpdate.correct);
    return (
      <div>
        <div className="row mt-4 pt-4">
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
                <h1>{this.state.numberOfCategories}</h1>
                <span>
                  <Link to={"/categories"} className="nav-link">
                    Categories
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <h3>List of questions</h3>
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
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <Modal.Header
                closeButton
                onClick={() => this.handleModalUpdate()}
              >
                <Modal.Title>Edit question</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <label className="d-flex flex-column align-items-start">
                  Description:
                  <input
                    type="text"
                    name="description"
                    value={this.state.toUpdate.description}
                    className="form-control"
                    onChange={this.handleChange2}
                  />
                </label>
                <div className="d-flex align-items-center">
                  <label className="d-flex flex-column align-items-start">
                    First option:
                    <input
                      type="text"
                      name="option_one"
                      value={this.state.toUpdate.option_one}
                      className="form-control"
                      onChange={this.handleChange2}
                    />
                  </label>
                  <input
                    type="radio"
                    name="correct"
                    value="0"
                    checked={+this.state.toUpdate.correct === 0}
                    className="form-check-input"
                    onChange={this.handleChange2}
                  />
                </div>
                <div className="d-flex align-items-center">
                  <label className="d-flex flex-column align-items-start">
                    Second option:
                    <input
                      type="text"
                      name="option_two"
                      value={this.state.toUpdate.option_two}
                      className="form-control"
                      onChange={this.handleChange2}
                    />
                  </label>
                  <input
                    type="radio"
                    name="correct"
                    value="1"
                    checked={+this.state.toUpdate.correct === 1}
                    className="form-check-input"
                    onChange={this.handleChange2}
                  />
                </div>
                <div className="d-flex align-items-center">
                  <label className="d-flex flex-column align-items-start">
                    Third option:
                    <input
                      type="text"
                      name="option_three"
                      value={this.state.toUpdate.option_three}
                      className="form-control"
                      onChange={this.handleChange2}
                    />
                  </label>
                  <input
                    type="radio"
                    name="correct"
                    value="2"
                    checked={+this.state.toUpdate.correct === 2}
                    className="form-check-input"
                    onChange={this.handleChange2}
                  />
                </div>
                <div className="d-flex align-items-center">
                  <label className="d-flex flex-column align-items-start">
                    Forth option:
                    <input
                      type="text"
                      name="option_four"
                      value={this.state.toUpdate.option_four}
                      className="form-control"
                      onChange={this.handleChange2}
                    />
                  </label>
                  <input
                    type="radio"
                    name="correct"
                    value="3"
                    checked={+this.state.toUpdate.correct === 3}
                    className="form-check-input"
                    onChange={this.handleChange2}
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => this.handleModalUpdate()}
                >
                  Cancel
                </Button>
                <Button type="submit" value="submit" variant="primary">
                  Update
                </Button>
              </Modal.Footer>
            </form>
          </Modal>
        </div>
      </div>
    );
  }
}
