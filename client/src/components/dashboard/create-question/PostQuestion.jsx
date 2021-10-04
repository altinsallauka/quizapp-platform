import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PostQuestion.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostQuestion = (props) => {
  const [access_token, setAccess_token] = useState(
    localStorage.getItem("token")
  );
  const [description, setDescription] = useState("");
  const [option_one, setOptionOne] = useState("");
  const [option_two, setOptionTwo] = useState("");
  const [option_three, setOptionThree] = useState("");
  const [option_four, setOptionFour] = useState("");
  const [correct, setCorrect] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  //   handleChange(event) {
  //     this.setState({ [event.target.name]: event.target.value });
  //   }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const {
    //   description,
    //   correct,
    //   option_one,
    //   option_two,
    //   option_three,
    //   option_four,
    //   categoryId,
    // } = this.state;
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
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((res) => {
        props.history.push("/questions");
        toast.success("New question has been added!");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const getCategories = () => {
    axios
      .get("http://localhost:3001/categories", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        // this.setState({ categories: res.data });
        setCategories(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="row">
      <div className="col-md-6">
        <h1>Create question</h1>
        <form onSubmit={handleSubmit}>
          <label className="d-flex flex-column align-items-start">
            Description:
            <input
              type="text"
              name="description"
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <div className="d-flex align-items-center">
            <label className="d-flex flex-column align-items-start">
              First option:
              <input
                type="text"
                name="option_one"
                className="form-control"
                onChange={(e) => setOptionOne(e.target.value)}
              />
            </label>
            <input
              type="radio"
              name="correct"
              value="0"
              className="form-check-input post-r-input"
              onChange={(e) => setCorrect(e.target.value)}
            />
          </div>
          <div className="d-flex align-items-center">
            <label className="d-flex flex-column align-items-start">
              Second option:
              <input
                type="text"
                name="option_two"
                className="form-control"
                onChange={(e) => setOptionTwo(e.target.value)}
              />
            </label>
            <input
              type="radio"
              name="correct"
              value="1"
              className="form-check-input post-r-input"
              onChange={(e) => setCorrect(e.target.value)}
            />
          </div>
          <div className="d-flex align-items-center">
            <label className="d-flex flex-column align-items-start">
              Third option:
              <input
                type="text"
                name="option_three"
                className="form-control"
                onChange={(e) => setOptionThree(e.target.value)}
              />
            </label>
            <input
              type="radio"
              name="correct"
              value="2"
              className="form-check-input post-r-input"
              onChange={(e) => setCorrect(e.target.value)}
            />
          </div>
          <div className="d-flex align-items-center">
            <label className="d-flex flex-column align-items-start">
              Forth option:
              <input
                type="text"
                name="option_four"
                className="form-control"
                onChange={(e) => setOptionFour(e.target.value)}
              />
            </label>
            <input
              type="radio"
              name="correct"
              value="3"
              className="form-check-input post-r-input"
              onChange={(e) => setCorrect(e.target.value)}
            />
          </div>
          <div className="d-flex align-items-center">
            <label className="d-flex flex-column align-items-start">
              Category:
              <select
                className="form-select"
                name="categoryId"
                aria-label="Default select example"
                onChange={(e) => setCategoryId(e.target.value)}
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
};

export default PostQuestion;
