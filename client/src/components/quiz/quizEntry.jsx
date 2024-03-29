import React, { useEffect, useState } from "react";
import "./quizEntry.scss";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CryptoJS from "crypto-js";

const QuizEntry = (props) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const getCategories = async (event) => {
    // this.setState({ isLoading: true });
    setIsLoading(true);
    await axios
      .get("http://localhost:3001/categories")
      .then((res) => {
        setCategories(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .get(`http://localhost:3001/questions/${categoryId}/${studentName}`)
      .then((res) => {
        const questions10 = res.data;
        localStorage.setItem(
          "quiz-user-data",
          CryptoJS.AES.encrypt(
            JSON.stringify({
              user: studentName,
              questions: questions10,
              score: 0,
            }),
            "secretkey3ncrvpt@"
          ).toString()
        );
        localStorage.setItem("categoryId", categoryId);
        props.history.push("/start-quiz");
      })
      .catch((err) => {
        console.log(err.response);
        // toast.error(err.response.data.message);
      });
  };

  const dataCondition = () => {
    if (localStorage.getItem("quiz-user-data"))
      props.history.push("/start-quiz");
    else getCategories();
  };

  const goBack = () => {
    props.history.push("/");
  };

  useEffect(() => {
    dataCondition();
  }, []);

  return (
    <div className="mt-5">
      <h3>Take quiz</h3>
      <span>
        Start a quiz, by selecting a quiz category, and writing your name
      </span>
      <form onSubmit={handleSubmit} className="mt-4">
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

          <label className="d-flex flex-column align-items-start">
            Name:
            <input
              type="text"
              name="studentName"
              className="form-control"
              onChange={(e) => setStudentName(e.target.value)}
            />
          </label>
        </div>
        <input
          type="submit"
          className="btn btn-primary mt-2"
          value="Find me a quiz!"
        />
      </form>
      <h5 onClick={(e) => goBack()} className="cancelEntry">
        Go back
      </h5>
    </div>
  );
};

export default QuizEntry;
