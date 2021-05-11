import React from "react";
import axios from "axios";
import "./PostQuestion.scss";
export default class PostQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      option_one: "",
      option_two: "",
      option_three: "",
      option_four: "",
      correct: "",
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
    } = this.state;
    const { data } = await axios.post("http://localhost:3001/questions", {
      description,
      correct,
      option_one,
      option_two,
      option_three,
      option_four,
    });
    console.log(data.data);
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
                className="form-check-input"
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
                className="form-check-input"
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
                className="form-check-input"
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
                className="form-check-input"
                onChange={this.handleChange}
              />
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
