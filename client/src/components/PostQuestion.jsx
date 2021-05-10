import React from "react";
import axios from "axios";

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
          <form onSubmit={this.handleSubmit}>
            <label className="d-flex flex-column align-items-start">
              Description:
              <input
                type="text"
                name="description"
                onChange={this.handleChange}
              />
            </label>
            <div className="d-flex align-items-center">
              <label className="d-flex flex-column align-items-start">
                First option:
                <input
                  type="text"
                  name="option_one"
                  onChange={this.handleChange}
                />
              </label>
              <input
                type="radio"
                name="correct"
                value="0"
                onChange={this.handleChange}
              />
            </div>
            <div className="d-flex align-items-center">
              <label className="d-flex flex-column align-items-start">
                Second option:
                <input
                  type="text"
                  name="option_two"
                  onChange={this.handleChange}
                />
              </label>
              <input
                type="radio"
                name="correct"
                value="1"
                onChange={this.handleChange}
              />
            </div>
            <div className="d-flex align-items-center">
              <label className="d-flex flex-column align-items-start">
                Third option:
                <input
                  type="text"
                  name="option_three"
                  onChange={this.handleChange}
                />
              </label>
              <input
                type="radio"
                name="correct"
                value="2"
                onChange={this.handleChange}
              />
            </div>
            <div className="d-flex align-items-center">
              <label className="d-flex flex-column align-items-start">
                Forth option:
                <input
                  type="text"
                  name="option_four"
                  onChange={this.handleChange}
                />
              </label>
              <input
                type="radio"
                name="correct"
                value="3"
                onChange={this.handleChange}
              />
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}
