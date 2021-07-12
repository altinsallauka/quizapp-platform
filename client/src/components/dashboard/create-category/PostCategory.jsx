import React from "react";
import "./PostCategory.scss";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default class PostCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = { categoryName: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  async handleSubmit(event) {
    event.preventDefault();
    const { categoryName } = this.state;
    await axios
      .post("http://localhost:3001/categories", {
        categoryName,
      })
      .then((res) => {
        toast.success("New category has been added");
        this.props.history.push("/categories");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="container">
            <div className="col-md-6">
              <form onSubmit={this.handleSubmit}>
                <div className="mb-3">
                  <h1>Create category</h1>
                  <label for="categoryNameInput" className="form-label">
                    Category name
                  </label>
                  <input
                    type="text"
                    name="categoryName"
                    className="form-control"
                    id="categoryNameInput"
                    onChange={this.handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
