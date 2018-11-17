import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { Doughnut } from "react-chartjs-2";

import {
  ListGroup,
  ListGroupItem,
  Badge,
  CustomInput,
  Form,
  FormGroup,
  Button,
  Progress,
  Col,
  Row,
  Card,
  CardHeader,
  CardTitle,
  CardBody
} from "reactstrap";

let answered = false;

const SingleQuestion = ({
  exam,
  answeredQuestions,
  amountQuestions,
  optionSelected,
  currentQuestion,
  results,
  prevQuestion,
  nextQuestion,
  checkQuestion,
  onAnswerChange,
  getResults
}) => {
  let answered = answeredQuestions[currentQuestion];
  let question = exam[currentQuestion];

  const data = {
    labels: ["Correct", "Incorrect", "Unanswered"],
    datasets: [
      {
        data: [results.correct, results.incorrect, results.unanswered],
        backgroundColor: ["#5cb85c", "#d9534f", "#5bc0de"],
        hoverBackgroundColor: ["#5cb85c", "#d9534f", "#5bc0de"]
      }
    ]
  };
  const legend = {
    display: true,
    position: "left",
    fullWidth: true,
    reverse: false,
    labels: {
      fontColor: "rgb(255, 99, 132)"
    }
  };

  return (
    <Row>
      <Col lg="8">
        <div className="text-center">{`${currentQuestion +
          1} of ${amountQuestions}`}</div>
        <Progress value={currentQuestion + 1} max={amountQuestions} />
        <div className="d-flex justify-content-between my-2">
          <button
            type="button"
            className="btn btn-primary"
            onClick={prevQuestion}
            disabled={currentQuestion === 0 ? true : false}
          >
            Previous
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={currentQuestion === 9 ? getResults : nextQuestion}
          >
            {currentQuestion === 9 ? "Results" : "Next"}
          </button>
        </div>
        <hr />
        <h3>{question.question}</h3>
        <ListGroup>
          <ListGroupItem
            className="d-flex justify-content-start"
            tag="button"
            color={
              answered
                ? question.answerOption === "A"
                  ? "success"
                  : optionSelected === "A"
                  ? "danger"
                  : ""
                : optionSelected === "A"
                ? "info"
                : ""
            }
            onClick={() => {
              if (!answered) onAnswerChange("A");
            }}
            disabled={
              answered
                ? question.answerOption === "A" || optionSelected === "A"
                  ? false
                  : true
                : false
            }
            action
          >
            <CustomInput
              type="radio"
              id="optionA"
              label={question.optionA}
              checked={optionSelected === "A"}
              readOnly
            />
          </ListGroupItem>

          <ListGroupItem
            className="d-flex justify-content-start"
            tag="button"
            color={
              answered
                ? question.answerOption === "B"
                  ? "success"
                  : optionSelected === "B"
                  ? "danger"
                  : ""
                : optionSelected === "B"
                ? "info"
                : ""
            }
            onClick={() => {
              if (!answered) onAnswerChange("B");
            }}
            disabled={
              answered
                ? question.answerOption === "B" || optionSelected === "B"
                  ? false
                  : true
                : false
            }
            action
          >
            <CustomInput
              type="radio"
              id="optionB"
              label={question.optionB}
              checked={optionSelected === "B"}
              readOnly
            />
          </ListGroupItem>

          <ListGroupItem
            className="d-flex justify-content-start"
            tag="button"
            color={
              answered
                ? question.answerOption === "C"
                  ? "success"
                  : optionSelected === "C"
                  ? "danger"
                  : ""
                : optionSelected === "C"
                ? "info"
                : ""
            }
            onClick={() => {
              if (!answered) onAnswerChange("C");
            }}
            disabled={
              answered
                ? question.answerOption === "C" || optionSelected === "C"
                  ? false
                  : true
                : false
            }
            action
          >
            <CustomInput
              type="radio"
              id="optionC"
              label={question.optionC}
              checked={optionSelected === "C"}
              readOnly
            />
          </ListGroupItem>

          <ListGroupItem
            className="d-flex justify-content-start"
            tag="button"
            color={
              answered
                ? question.answerOption === "D"
                  ? "success"
                  : optionSelected === "D"
                  ? "danger"
                  : ""
                : optionSelected === "D"
                ? "info"
                : ""
            }
            onClick={() => {
              if (!answered) onAnswerChange("D");
            }}
            disabled={
              answered
                ? question.answerOption === "D" || optionSelected === "D"
                  ? false
                  : true
                : false
            }
            action
          >
            <CustomInput
              type="radio"
              id="optionD"
              label={question.optionD}
              checked={optionSelected === "D"}
              readOnly
            />
          </ListGroupItem>

          <ListGroupItem
            className="d-flex justify-content-start"
            tag="button"
            color={
              answered
                ? question.answerOption === "E"
                  ? "success"
                  : optionSelected === "E"
                  ? "danger"
                  : ""
                : optionSelected === "E"
                ? "info"
                : ""
            }
            onClick={() => {
              if (!answered) onAnswerChange("E");
            }}
            disabled={
              answered
                ? question.answerOption === "E" || optionSelected === "E"
                  ? false
                  : true
                : false
            }
            action
          >
            <CustomInput
              type="radio"
              id="optionE"
              label={question.optionE}
              checked={optionSelected === "E"}
              readOnly
            />
          </ListGroupItem>
        </ListGroup>
        {!answered ? (
          <button
            type="button"
            className="btn btn-primary btn-lg btn-block my-3"
            onClick={checkQuestion}
          >
            Check
          </button>
        ) : (
          <p className="lead my-3">
            {!answered ? "" : question.answerDescription}
          </p>
        )}
      </Col>
      <Col lg="4">
        <Card>
          <CardHeader>Results</CardHeader>
          <CardBody>
            <Doughnut data={data} legend={legend} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

SingleQuestion.propTypes = {
  exam: PropTypes.array.isRequired,
  answeredQuestions: PropTypes.array.isRequired,
  amountQuestions: PropTypes.string.isRequired,
  optionSelected: PropTypes.string,
  currentQuestion: PropTypes.number.isRequired,
  results: PropTypes.object.isRequired,
  prevQuestion: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  checkQuestion: PropTypes.func.isRequired,
  onAnswerChange: PropTypes.func.isRequired,
  getResults: PropTypes.func.isRequired
};

export default SingleQuestion;
