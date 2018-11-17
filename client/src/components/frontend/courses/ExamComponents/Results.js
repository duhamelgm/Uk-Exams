import React from "react";

import { Doughnut } from "react-chartjs-2";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  ListGroup,
  ListGroupItem,
  CustomInput
} from "reactstrap";
import { Accordion } from "../../../common/Accordion";
import { getExamQuestions } from "../../../../actions/courseActions";

const Results = ({ results, exam, answers, returnToMenu }) => {
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
  const percent =
    (results.correct /
      (results.incorrect + results.unanswered + results.correct)) *
    100;
  return (
    <Row>
      <Col lg="8">
        <h2>Overview</h2>
        <div className="d-flex">
          {percent > 50 ? (
            <i className="far fa-check-circle text-success display-2" />
          ) : (
            <i className="far fa-times-circle text-danger display-2" />
          )}
          <div className="mx-4">
            <p className="lead">You had {results.correct} questions right</p>
            <p className="lead">
              With a score of {percent}% of correct answers
            </p>
          </div>
        </div>
        <Button color="primary" block className="my-2" onClick={returnToMenu}>
          Return to course menu
        </Button>
        <hr />
        <h2>Feedback</h2>
        <Accordion>
          {exam.map((question, id) => {
            let optionSelected = answers[id];
            let icon;

            if (!optionSelected) {
              icon = <i className="fas fa-exclamation text-info" />;
            } else {
              if (optionSelected === question.answerOption) {
                icon = <i class="fas fa-check text-success" />;
              } else {
                icon = <i class="fas fa-times text-danger" />;
              }
            }

            return (
              <Accordion.Item key={id}>
                <Accordion.Header className="d-flex justify-content-between">
                  <div>{id + 1}.- Question</div>
                  <div>{icon}</div>
                </Accordion.Header>
                <Accordion.Body>
                  <h3>{question.question}</h3>
                  <ListGroup>
                    <ListGroupItem
                      className="d-flex justify-content-start"
                      color={
                        question.answerOption === "A"
                          ? "success"
                          : optionSelected === "A"
                          ? "danger"
                          : ""
                      }
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
                      color={
                        question.answerOption === "B"
                          ? "success"
                          : optionSelected === "B"
                          ? "danger"
                          : ""
                      }
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
                      color={
                        question.answerOption === "C"
                          ? "success"
                          : optionSelected === "C"
                          ? "danger"
                          : ""
                      }
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
                      color={
                        question.answerOption === "D"
                          ? "success"
                          : optionSelected === "D"
                          ? "danger"
                          : ""
                      }
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
                      color={
                        question.answerOption === "E"
                          ? "success"
                          : optionSelected === "E"
                          ? "danger"
                          : ""
                      }
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
                  <p>{question.answerDescription}</p>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
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

export default Results;
