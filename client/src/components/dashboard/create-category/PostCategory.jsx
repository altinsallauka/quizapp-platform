import React, { useState } from "react";
import "./PostCategory.scss";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostCategory = (props) => {
  const [access_token, setAccess_token] = useState(
    localStorage.getItem("token")
  );
  const [categoryName, setCategoryName] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    // const { categoryName } = this.state;
    await axios
      .post(
        "http://localhost:3001/categories",
        {
          categoryName,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((res) => {
        toast.success("New category has been added");
        props.history.push("/categories");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <React.Fragment>
      <div className="row">
        <div className="container">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
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
                  onChange={(e) => setCategoryName(e.target.value)}
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
};

export default PostCategory;
