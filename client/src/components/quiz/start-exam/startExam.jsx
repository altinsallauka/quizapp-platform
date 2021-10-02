import React, { useEffect, useState } from "react";
import "./startExam.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CryptoJS from "crypto-js";

const StartExam = (props) => {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [user, setUser] = useState("");
  const [finishedQuiz, setFinishedQuiz] = useState(false);
  const [noQuestions, setNoQuestions] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const getCategoryById = async (event) => {
    const categoryId = localStorage.getItem("categoryId");
    await axios
      .get(`http://localhost:3001/categories/${categoryId}`)
      .then((res) => {
        const { categoryName } = res.data;
        setCategoryName(categoryName);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const clearStorage = () => {
    localStorage.removeItem("categoryId");
    localStorage.removeItem("quiz-user-data");
  };

  const onAnswer = (e, answer) => {
    // let { score, user } = this.state;
    let scoreInc = score;
    if (answer.isCorrect) {
      e.target.classList.remove("btn-primary");
      e.target.classList.add("btn-success");
      // score = this.state.score + 1;
      scoreInc = score + 1;
      setScore(scoreInc);
      // toast.success("Congrats. You've choosed the right answer!");
    } else {
      e.target.classList.remove("btn-primary");
      e.target.classList.add("btn-danger");
      // toast.error("The answer is not correct!");
    }

    setTimeout(async () => {
      const questionsArray = Array.from(questions);
      questionsArray.pop();

      // this.setState({ questionsArray, score, user });
      setQuestions(questionsArray);
      // setScore(score);
      setUser(user);
      const localStorage_data = JSON.stringify({ user, score, questionsArray });
      const encryptAgainQuizData = CryptoJS.AES.encrypt(
        localStorage_data,
        "secretkey3ncrvpt@"
      ).toString();
      localStorage.setItem("quiz-user-data", encryptAgainQuizData);

      e.target.classList.remove("btn-success");
      e.target.classList.remove("btn-danger");
      e.target.classList.add("btn-primary");
      if (!questionsArray.length) {
        // this.setState({ finishedQuiz: true });
        setFinishedQuiz(true);
        // save user data
        await axios
          .post("http://localhost:3001/results", {
            studentName: user,
            score: scoreInc,
          })
          .then((res) => {
            toast.success("Quiz results have been recorded!");
            // this.props.history.push("/categories");
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
        // Send score and user to backend and save to database
      }
    }, 1000);
  };
  const goBack = () => {
    props.history.push("/entry-quiz");
    clearStorage();
  };

  useEffect(() => {
    const questions_local = localStorage.getItem("quiz-user-data");
    // Decrypt
    var bytes = CryptoJS.AES.decrypt(questions_local, "secretkey3ncrvpt@");
    var decryptedQuizUserData = bytes.toString(CryptoJS.enc.Utf8);

    console.log(decryptedQuizUserData); // 'my message'
    const { questions, score, user } = JSON.parse(decryptedQuizUserData);
    if (questions_local) {
      // this.setState({ questions, score, user });
      setQuestions(questions);
      setScore(score);
      setUser(user);
    }
    if (!questions.length) {
      // this.setState({ noQuestions: true });
      setNoQuestions(true);
    }
    getCategoryById();
  }, []);

  // const { questions, score, user, finishedQuiz, noQuestions } = this.state;
  const question = questions.length ? questions[questions.length - 1] : null;
  const answers = question ? question.alternatives : null;
  return noQuestions ? (
    <div className="text-primary mt-4">
      <h2>:)</h2>
      <span>No questions found for this category for the moment. Sorry!</span>
      <h3 onClick={(e) => goBack()} className="backBtn">
        Go back
      </h3>
    </div>
  ) : (
    <div className="mt-4">
      <div>
        <div>
          <div className="quiz-info bg-primary text-light shadow p-3 mb-3 rounded">
            <span>{user}</span>
            <span>Score: {score}</span>
          </div>
          <h3 className="text-primary">Quiz from {categoryName} category</h3>
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
                  onClick={(e) => clearStorage()}
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
                      onClick={(e) => onAnswer(e, answers[0])}
                    >
                      {answers[0].text}
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={(e) => onAnswer(e, answers[1])}
                    >
                      {answers[1].text}
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={(e) => onAnswer(e, answers[2])}
                    >
                      {answers[2].text}
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={(e) => onAnswer(e, answers[3])}
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
};

export default StartExam;
