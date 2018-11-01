import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getQuiz } from "../../../actions/quizActions";
import classnames from "classnames";

class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      quiz: [],
      currentQuestion: 0,
      optionSelected: ""
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
    this.setState({
      optionSelected: e.target.value
    });
  };

  checkQuestion = e => {
    e.preventDefault();

    if (
      this.state.optionSelected ===
      this.state.quiz[this.state.currentQuestion].answerOption
    ) {
      console.log("True");
    } else {
      console.log("false dud");
    }
  };

  render() {
    let quiz;

    if (Array.isArray(this.state.quiz)) {
      if (this.state.quiz[this.state.currentQuestion]) {
        let question = this.state.quiz[this.state.currentQuestion];
        quiz = (
          <div className="card">
            <div className="card-header" style={{ borderBottom: "0" }}>
              <h3 className="card-title">{question.question}</h3>
            </div>
            <form onSubmit={this.checkQuestion}>
              <div className="list-group list-group-flush">
                <input
                  className="d-none"
                  type="radio"
                  name="RadioInputName"
                  value="A"
                  id="optionA"
                  onChange={this.onRadioChange}
                />
                <label
                  className={classnames("list-group-item", {
                    "bg-info": this.state.optionSelected === "A"
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
                />
                <label
                  className={classnames("list-group-item", {
                    "bg-info": this.state.optionSelected === "B"
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
                />
                <label
                  className={classnames("list-group-item", {
                    "bg-info": this.state.optionSelected === "C"
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
                />
                <label
                  className={classnames("list-group-item", {
                    "bg-info": this.state.optionSelected === "D"
                  })}
                  htmlFor="optionD"
                >
                  {question.optionD}
                </label>
              </div>
              <div className="card-body d-flex justify-content-between">
                <button type="button" className="card-link">
                  Previous
                </button>
                <button type="submit" className="card-link">
                  Submit
                </button>
                <button type="button" className="card-link">
                  Skip
                </button>
              </div>
            </form>
          </div>
        );
      }
    } else {
      quiz = "Loading...";
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
