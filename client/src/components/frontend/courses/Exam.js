import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getExamInfo, getExamQuestions } from "../../../actions/courseActions";
import classnames from "classnames";
import Spinner from "../../common/Spinner";
import { Accordion } from "../../common/Accordion";

import Menu from "./ExamComponents/Menu";
import SingleQuestion from "./ExamComponents/SingleQuestion";
import Results from "./ExamComponents/Results";

class Exam extends Component {
  constructor() {
    super();
    this.state = {
      position: "menu",
      info: [],
      request: [],
      amountQuestions: "",
      exam: [],
      currentQuestion: 0,
      answered: [],
      answers: [],
      results: {
        correct: 0,
        incorrect: 0,
        unanswered: 0
      }
    };
  }

  componentDidMount() {
    this.props.getExamInfo(this.props.match.params.handle);
  }

  componentDidUpdate(prevProps) {
    if (this.props.quiz !== prevProps.quiz) {
      this.setState({ quiz: this.props.quiz.quiz });
    }
    if (this.props.course !== prevProps.course) {
      // Info loaded in
      if (this.props.course.info !== prevProps.course.info) {
        let request = [];
        for (let i = 0; i < this.props.course.info.length; i++) {
          request.push({});
          request[i][this.props.course.info[i].id] = false;
        }

        this.setState({
          info: this.props.course.info,
          request: request
        });
      }

      // Exam loaded in
      if (this.props.course.exam !== prevProps.course.exam) {
        this.setState({
          position: "question",
          exam: this.props.course.exam,
          results: {
            correct: 0,
            incorrect: 0,
            unanswered: this.props.course.exam.length
          }
        });
      }
    }
  }

  // MENU FUNCTIONS

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeRequest = id => e => {
    e.preventDefault();

    let { request } = this.state;

    const newRequest = request.map((row, idx) => {
      if (id !== idx) return row;
      return {
        ...row,
        [this.state.info[idx].id]: !row[this.state.info[idx].id]
      };
    });

    this.setState({
      request: newRequest
    });
  };

  sendExamRequest = e => {
    e.preventDefault();

    const categories = this.state.request.map((row, id) => {
      if (row[this.state.info[id].id] === true) return this.state.info[id].id;
    });

    const examQueryRequest = {
      amountQuestions: this.state.amountQuestions,
      categories: categories
    };

    this.setState({
      exam: [],
      currentQuestion: 0,
      answered: [],
      answers: [],
      results: {
        correct: 0,
        incorrect: 0,
        unanswered: 0
      }
    });

    this.props.getExamQuestions(
      this.props.match.params.handle,
      examQueryRequest
    );
  };

  // EXAM FUNCTIONS

  onAnswerChange = option => {
    let current = this.state.currentQuestion;
    let answers = this.state.answers;

    answers[current] = option;

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

  checkQuestion = e => {
    e.preventDefault();

    let current = this.state.currentQuestion;
    let answers = this.state.answers;
    let answered = this.state.answered;
    let exam = this.state.exam;
    let results = this.state.results;

    answered[current] = true;

    if (exam[current].answerOption === answers[current]) {
      results.correct += 1;
      results.unanswered -= 1;
    } else {
      results.incorrect += 1;
      results.unanswered -= 1;
    }

    this.setState({
      answered: answered,
      results: results
    });
  };

  getResults = () => {
    let { results } = this.state;

    this.setState({
      position: "results"
    });
  };

  returnToMenu = () => {
    this.setState({
      position: "menu"
    });
  };

  render() {
    let {
      currentQuestion,
      answers,
      position,
      info,
      request,
      amountQuestions,
      exam,
      quiz,
      answered,
      results
    } = this.state;
    let optionSelected = answers[currentQuestion];
    let page;

    if (this.props.course.loading) {
      page = <Spinner />;
    } else if (position === "menu") {
      page = (
        <Menu
          info={info}
          request={request}
          amountQuestions={amountQuestions}
          onChangeRequest={id => this.onChangeRequest(id)}
          onChange={this.onChange}
          sendExamRequest={this.sendExamRequest}
        />
      );
    } else if (position === "question") {
      page = (
        <SingleQuestion
          exam={exam}
          currentQuestion={currentQuestion}
          amountQuestions={amountQuestions}
          answeredQuestions={answered}
          results={results}
          optionSelected={optionSelected}
          onAnswerChange={option => this.onAnswerChange(option)}
          prevQuestion={this.prevQuestion}
          nextQuestion={this.nextQuestion}
          checkQuestion={this.checkQuestion}
          getResults={this.getResults}
        />
      );
    } else if (position === "results") {
      page = (
        <Results
          results={results}
          exam={exam}
          answers={answers}
          returnToMenu={this.returnToMenu}
        />
      );
    }

    return (
      <div className="container">
        <div className="my-4">{page}</div>
      </div>
    );
  }
}

Exam.propTypes = {
  getExamInfo: PropTypes.func.isRequired,
  getExamQuestions: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  course: state.course
});

export default connect(
  mapStateToProps,
  { getExamInfo, getExamQuestions }
)(Exam);
