import React, { Component } from "react";
import "./startExam.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default class StartExam extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      score: 0,
      user: "",
      finishedQuiz: false,
      noQuestions: false,
      categoryName: "",
    };
    this.onAnswer = this.onAnswer.bind(this);
    this.clearStorage = this.clearStorage.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  getCategoryById() {
    const categoryId = localStorage.getItem("categoryId");
    axios
      .get(`http://localhost:3001/categories/${categoryId}`)
      .then((res) => {
        const { categoryName } = res.data;
        this.setState({
          categoryName,
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }

  clearStorage() {
    localStorage.removeItem("categoryId");
    localStorage.removeItem("quiz-user-data");
  }

  onAnswer(e, answer) {
    let { score, user } = this.state;
    if (answer.isCorrect) {
      e.target.classList.remove("btn-primary");
      e.target.classList.add("btn-success");
      score = this.state.score + 1;
      // toast.success("Congrats. You've choosed the right answer!");
    } else {
      e.target.classList.remove("btn-primary");
      e.target.classList.add("btn-danger");
      // toast.error("The answer is not correct!");
    }

    setTimeout(() => {
      const questions = Array.from(this.state.questions);
      questions.pop();

      this.setState({ questions, score, user });
      const localStorage_data = JSON.stringify({ user, score, questions });
      localStorage.setItem("quiz-user-data", localStorage_data);

      e.target.classList.remove("btn-success");
      e.target.classList.remove("btn-danger");
      e.target.classList.add("btn-primary");
      if (!questions.length) {
        this.setState({ finishedQuiz: true });
        // save user data
        // Send score and user to backend and save to database
      }
    }, 1000);
  }
  componentDidMount() {
    const questions_local = localStorage.getItem("quiz-user-data");
    const { questions, score, user } = JSON.parse(questions_local);
    if (questions_local) {
      this.setState({ questions, score, user });
    }
    if (!questions.length) {
      this.setState({ noQuestions: true });
    }
    this.getCategoryById();
  }
  render() {
    const { questions, score, user, finishedQuiz, noQuestions } = this.state;
    const question = questions.length ? questions[questions.length - 1] : null;
    const answers = question ? question.alternatives : null;
    if (noQuestions) {
      return (
        <div className="text-primary mt-4">
          <h2>:)</h2>
          <span>
            No questions found for this category for the moment. Sorry!
          </span>
        </div>
      );
    } else {
      return (
        <div className="mt-4">
          <div>
            <div>
              <div className="quiz-info bg-primary text-light shadow p-3 mb-3 rounded">
                <span>{user}</span>
                <span>Score: {score}</span>
              </div>
              <h3 className="text-primary">
                Quiz from {this.state.categoryName} category
              </h3>
            </div>
            <div>
              {finishedQuiz ? (
                <div className="mt-4">
                  <span className="text-primary ml-3">
                    You finished this quiz. Your Score is: <b>{score}</b>
                  </span>
                  <h3>
                    <Link
                      to={"/role"}
                      className="nav-link"
                      onClick={(e) => this.clearStorage()}
                    >
                      Back to main page
                    </Link>
                  </h3>
                </div>
              ) : (
                <div>
                  <p>
                    Question number <b>{10 - (questions.length - 1)}</b>:{" "}
                    {question && question.description}
                  </p>
                  <div className="answer-btn">
                    <div className="mb-4">
                      <span>Select the right answer:</span>
                    </div>
                    {!!answers ? (
                      <>
                        <button
                          className="btn btn-primary"
                          onClick={(e) => this.onAnswer(e, answers[0])}
                        >
                          {answers[0].text}
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={(e) => this.onAnswer(e, answers[1])}
                        >
                          {answers[1].text}
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={(e) => this.onAnswer(e, answers[2])}
                        >
                          {answers[2].text}
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={(e) => this.onAnswer(e, answers[3])}
                        >
                          {answers[3].text}
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}
