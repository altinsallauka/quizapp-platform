import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default class startQuiz extends Component {
  constructor() {
    super();
    this.state = { questions: [], score: 0, user: "" };
    this.onAnswer = this.onAnswer.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  onAnswer(e, answer) {
    let { score, user } = this.state;
    if (answer.isCorrect) {
      e.target.classList.remove("btn-primary");
      e.target.classList.add("btn-success");
      score = this.state.score + 1;
    } else {
      e.target.classList.remove("btn-primary");
      e.target.classList.add("btn-danger");
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
        // save user data
        // Send score and user to backend and save to database
      }
    }, 1000);
  }
  componentDidMount() {
    const questions_local = localStorage.getItem("quiz-user-data");
    if (questions_local) {
      const { questions, score, user } = JSON.parse(questions_local);
      this.setState({ questions, score, user });
    }
  }
  render() {
    const { questions, score, user } = this.state;
    const question = questions.length ? questions[questions.length - 1] : null;
    const answers = question ? question.alternatives : null;
    return (
      <div>
        <h3>Quiz page</h3>
        <p>
          {user}, Score {score}
        </p>
        <p>{question && question.description}</p>
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
    );
  }
}
