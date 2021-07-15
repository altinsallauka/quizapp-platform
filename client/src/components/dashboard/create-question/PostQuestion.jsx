import React from "react";
import axios from "axios";
import "./PostQuestion.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default class PostQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: localStorage.getItem("token"),
      description: "",
      option_one: "",
      option_two: "",
      option_three: "",
      option_four: "",
      correct: "",
      categoryId: "",
      categories: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {
      description,
      correct,
      option_one,
      option_two,
      option_three,
      option_four,
      categoryId,
    } = this.state;
    await axios
      .post(
        "http://localhost:3001/questions",
        {
          description,
          correct,
          option_one,
          option_two,
          option_three,
          option_four,
          categoryId,
        },
        {
          headers: {
            Authorization: `Bearer ${this.state.access_token}`,
          },
        }
      )
      .then((res) => {
        this.props.history.push("/questions");
        toast.success("New question has been added!");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }
  getCategories() {
    axios
      .get("http://localhost:3001/categories", {
        headers: {
          Authorization: `Bearer ${this.state.access_token}`,
        },
      })
      .then((res) => {
        this.setState({ categories: res.data });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }
  componentDidMount() {
    this.getCategories();
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <h1>Create question</h1>
          <form onSubmit={this.handleSubmit}>
            <label className="d-flex flex-column align-items-start">
              Description:
              <input
                type="text"
                name="description"
                className="form-control"
                onChange={this.handleChange}
              />
            </label>
            <div className="d-flex align-items-center">
              <label className="d-flex flex-column align-items-start">
                First option:
                <input
                  type="text"
                  name="option_one"
                  className="form-control"
                  onChange={this.handleChange}
                />
              </label>
              <input
                type="radio"
                name="correct"
                value="0"
                className="form-check-input post-r-input"
                onChange={this.handleChange}
              />
            </div>
            <div className="d-flex align-items-center">
              <label className="d-flex flex-column align-items-start">
                Second option:
                <input
                  type="text"
                  name="option_two"
                  className="form-control"
                  onChange={this.handleChange}
                />
              </label>
              <input
                type="radio"
                name="correct"
                value="1"
                className="form-check-input post-r-input"
                onChange={this.handleChange}
              />
            </div>
            <div className="d-flex align-items-center">
              <label className="d-flex flex-column align-items-start">
                Third option:
                <input
                  type="text"
                  name="option_three"
                  className="form-control"
                  onChange={this.handleChange}
                />
              </label>
              <input
                type="radio"
                name="correct"
                value="2"
                className="form-check-input post-r-input"
                onChange={this.handleChange}
              />
            </div>
            <div className="d-flex align-items-center">
              <label className="d-flex flex-column align-items-start">
                Forth option:
                <input
                  type="text"
                  name="option_four"
                  className="form-control"
                  onChange={this.handleChange}
                />
              </label>
              <input
                type="radio"
                name="correct"
                value="3"
                className="form-check-input post-r-input"
                onChange={this.handleChange}
              />
            </div>
            <div className="d-flex align-items-center">
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
                  {this.state.categories.map((ctg) => (
                    <option value={ctg._id} key={ctg._id}>
                      {ctg.categoryName}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <input
              type="submit"
              className="btn btn-primary mt-2"
              value="Submit"
            />
          </form>
        </div>
      </div>
    );
  }
}
