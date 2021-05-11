import "./QuestionsList.scss";

const QuestionsList = () => {
  return (
    <div>
      <h1>Questions List</h1>
      <div className="row">
        <div className="col">
          <div className="bd-box shadow-sm">
            <h2>Number of questions</h2>
            <h1>20</h1>
          </div>
        </div>
        <div className="col">
          <div className="bd-box shadow-sm">
            <h2>Number of categories</h2>
            <h1>4</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionsList;
