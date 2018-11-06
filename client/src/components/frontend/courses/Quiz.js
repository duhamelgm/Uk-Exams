import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getQuiz } from "../../../actions/quizActions";
import classnames from "classnames";
import Spinner from "../../common/Spinner";
import { Accordion } from "../../common/Accordion";

class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      quiz: [],
      currentQuestion: 0,
      answers: ["", "", "", "", ""]
    };
  }

  componentDidMount() {
    this.props.getQuiz(this.props.match.params.handle);
  }

  componentDidUpdate(prevProps) {
    if (this.props.quiz !== prevProps.quiz) {
      this.setState({ quiz: this.props.quiz.quiz });
    }
  }

  onRadioChange = e => {
    let current = this.state.currentQuestion;
    let answers = this.state.answers;

    answers[current] = e.target.value;

    this.setState({
      answers: answers
    });
  };

  nextQuestion = e => {
    e.preventDefault();

    let current = this.state.currentQuestion;

    current++;
    this.setState({
      currentQuestion: current
    });
  };

  prevQuestion = e => {
    e.preventDefault();

    let current = this.state.currentQuestion;
    current--;
    this.setState({
      currentQuestion: current
    });
  };

  getResults = () => {
    let { answers } = this.state;
    let results = {
      correct: 0,
      incorrect: 0
    };

    for (let i = 0; i < 5; i++) {
      if (answers[i] === this.state.quiz[i].answerOption) {
        results.correct++;
      } else {
        results.incorrect++;
      }
    }

    return results;
  };

  render() {
    let { quiz, currentQuestion, answers } = this.state;
    let optionSelected = answers[currentQuestion];

    if (Array.isArray(this.state.quiz)) {
      if (quiz[currentQuestion]) {
        let question = quiz[currentQuestion];
        quiz = (
          <div className="card">
            <div className="card-header" style={{ borderBottom: "0" }}>
              <h3 className="card-title">{question.question}</h3>
            </div>

            <div className="list-group list-group-flush">
              <input
                className="d-none"
                type="radio"
                name="RadioInputName"
                value="A"
                id="optionA"
                onChange={this.onRadioChange}
                checked={optionSelected === "A"}
              />
              <label
                className={classnames("list-group-item", {
                  active: optionSelected === "A"
                })}
                htmlFor="optionA"
              >
                {question.optionA}
              </label>

              <input
                className="d-none"
                type="radio"
                name="RadioInputName"
                value="B"
                id="optionB"
                onChange={this.onRadioChange}
                checked={optionSelected === "B"}
              />
              <label
                className={classnames("list-group-item", {
                  active: optionSelected === "B"
                })}
                htmlFor="optionB"
              >
                {question.optionB}
              </label>

              <input
                className="d-none"
                type="radio"
                name="RadioInputName"
                value="C"
                id="optionC"
                onChange={this.onRadioChange}
                checked={optionSelected === "C"}
              />
              <label
                className={classnames("list-group-item", {
                  active: optionSelected === "C"
                })}
                htmlFor="optionC"
              >
                {question.optionC}
              </label>

              <input
                className="d-none"
                type="radio"
                name="RadioInputName"
                value="D"
                id="optionD"
                onChange={this.onRadioChange}
                checked={optionSelected === "D"}
              />
              <label
                className={classnames("list-group-item", {
                  active: optionSelected === "D"
                })}
                htmlFor="optionD"
              >
                {question.optionD}
              </label>

              <input
                className="d-none"
                type="radio"
                name="RadioInputName"
                value="E"
                id="optionE"
                onChange={this.onRadioChange}
                checked={optionSelected === "E"}
              />
              <label
                className={classnames("list-group-item", {
                  active: optionSelected === "E"
                })}
                htmlFor="optionE"
              >
                {question.optionE}
              </label>
            </div>
            <div className="card-body d-flex justify-content-between">
              {quiz[currentQuestion - 1] ? (
                <button
                  type="button"
                  className="card-link btn btn-primary"
                  onClick={this.prevQuestion}
                >
                  Previous
                </button>
              ) : (
                <button
                  type="button"
                  className="card-link btn btn-primary"
                  onClick={this.prevQuestion}
                  disabled
                >
                  Previous
                </button>
              )}

              <button
                type="submit"
                className="card-link btn btn-primary"
                onClick={this.nextQuestion}
              >
                Next
              </button>
            </div>
          </div>
        );
      } else if (currentQuestion === 5) {
        let results = this.getResults();
        quiz = (
          <div className="results">
            <div>
              <h1 className="display-4">Results</h1>
              <p>You get {results.correct} questions right</p>
            </div>
            <h2>Feedback</h2>
            <Accordion>
              {quiz.map((question, id) => (
                <Accordion.Item key={id}>
                  <Accordion.Header>{question.question}</Accordion.Header>

                  <Accordion.Body>
                    <ul className="list-group">
                      <li
                        className={classnames("list-group-item", {
                          "list-group-item-success":
                            question.answerOption === "A",
                          "list-group-item-danger":
                            answers[id] === "A" && question.answerOption !== "A"
                        })}
                      >
                        {question.optionA}
                      </li>
                      <li
                        className={classnames("list-group-item", {
                          "list-group-item-success":
                            question.answerOption === "B",
                          "list-group-item-danger":
                            answers[id] === "B" && question.answerOption !== "B"
                        })}
                      >
                        {question.optionB}
                      </li>
                      <li
                        className={classnames("list-group-item", {
                          "list-group-item-success":
                            question.answerOption === "C",
                          "list-group-item-danger":
                            answers[id] === "C" && question.answerOption !== "C"
                        })}
                      >
                        {question.optionC}
                      </li>
                      <li
                        className={classnames("list-group-item", {
                          "list-group-item-success":
                            question.answerOption === "D",
                          "list-group-item-danger":
                            answers[id] === "D" && question.answerOption !== "D"
                        })}
                      >
                        {question.optionD}
                      </li>
                      <li
                        className={classnames("list-group-item", {
                          "list-group-item-success":
                            question.answerOption === "E",
                          "list-group-item-danger":
                            answers[id] === "E" && question.answerOption !== "E"
                        })}
                      >
                        {question.optionE}
                      </li>
                    </ul>
                    <p className="card-text my-4">
                      {question.answerDescription}
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        );
      } else {
        quiz = <Spinner />;
      }
    } else {
      quiz = <Spinner />;
    }

    return (
      <div className="container">
        <div className="row my-4">
          <div className="col-lg-8">{quiz}</div>
        </div>
      </div>
    );
  }
}

Quiz.propTypes = {
  getQuiz: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  quiz: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  course: state.course,
  quiz: state.quiz
});

export default connect(
  mapStateToProps,
  { getQuiz }
)(Quiz);
