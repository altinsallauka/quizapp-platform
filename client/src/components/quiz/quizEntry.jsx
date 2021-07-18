import React, { Component } from "react";
import "./quizEntry.scss";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default class QuizEntry extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      isLoading: false,
      studentName: "",
      categoryId: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(event.target.option);
  }
  getCategories() {
    this.setState({ isLoading: true });
    axios
      .get("http://localhost:3001/categories")
      .then((res) => {
        this.setState({ categories: res.data, isLoading: false });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }
  async handleSubmit(event) {
    event.preventDefault();
    const { studentName, categoryId } = this.state;

    console.log(studentName, categoryId);
    const all10Questions = await axios.get(
      `http://localhost:3001/questions/${this.state.categoryId}/${this.state.studentName}`
    );
    // toast.success("Quiz has started!");
    localStorage.setItem(
      "quiz-user-data",
      JSON.stringify({
        user: studentName,
        questions: all10Questions.data,
        score: 0,
      }),
      localStorage.setItem("categoryId", categoryId)
    );
    this.props.history.push("/start-quiz");
  }
  componentDidMount() {
    if (localStorage.getItem("quiz-user-data"))
      this.props.history.push("/start-quiz");
    else this.getCategories();
  }
  render() {
    const { isLoading, categories } = this.state;
    return (
      <div className="mt-5">
        <h3>Take quiz</h3>
        <span>
          Start a quiz, by selecting a quiz category, and writing your name
        </span>
        <form onSubmit={this.handleSubmit} className="mt-4">
          {isLoading && (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          <div className="entry-section">
            <label className="d-flex flex-column align-items-start">
              Category:
              <select
                className="form-select"
                name="categoryId"
                aria-label="Default select example"
                onChange={this.handleChange}
              >
                <option disabled selected>
                  Select one category
                </option>
                {categories.map((ctg) => (
                  <option value={ctg._id} key={ctg._id}>
                    {ctg.categoryName}
                  </option>
                ))}
              </select>
            </label>

            <label className="d-flex flex-column align-items-start">
              Name:
              <input
                type="text"
                name="studentName"
                className="form-control"
                onChange={this.handleChange}
              />
            </label>
          </div>
          <input
            type="submit"
            className="btn btn-primary mt-2"
            value="Find me a quiz!"
          />
        </form>
      </div>
    );
  }
}