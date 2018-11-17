import React from "react";
import PropTypes from "prop-types";

import classnames from "classnames";

import {
  ListGroup,
  ListGroupItem,
  Badge,
  CustomInput,
  Form,
  FormGroup,
  Button,
  Row,
  Col
} from "reactstrap";

const Menu = ({
  info,
  request,
  amountQuestions,
  onChangeRequest,
  onChange,
  sendExamRequest
}) => {
  return (
    <Row>
      <Col lg="8">
        <h1>Menu</h1>
        <Form onSubmit={sendExamRequest}>
          <FormGroup>
            <ListGroup>
              {info.map((row, id) => {
                return (
                  <ListGroupItem
                    tag="button"
                    className="justify-content-between cursor-pointer"
                    onClick={onChangeRequest(id)}
                    key={id}
                    color={request[id][row.id] === true ? "info" : ""}
                    action
                  >
                    <div className="custom-control custom-checkbox cursor-pointer">
                      <input
                        type="checkbox"
                        className="custom-control-input cursor-pointer"
                        id={`InfoLabel${id}`}
                        checked={request[id][row.id]}
                        readOnly
                      />
                      <label
                        className="custom-control-label cursor-pointer"
                        htmlFor={`InfoLabel${id}`}
                      >
                        {row.title} <Badge pill>{row.questionsAmount}</Badge>
                      </label>
                    </div>
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          </FormGroup>
          <FormGroup>
            <CustomInput
              id="amount-questions"
              type="select"
              name="amountQuestions"
              value={amountQuestions}
              onChange={onChange}
              className="custom-select custom-select-lg"
            >
              <option value="">Select</option>
              <option>5</option>
              <option>10</option>
              <option>20</option>
            </CustomInput>
          </FormGroup>
          <FormGroup>
            <Button type="submit">Start the exam</Button>
          </FormGroup>
        </Form>
      </Col>
    </Row>
  );
};

Menu.propTypes = {
  info: PropTypes.array.isRequired,
  request: PropTypes.array.isRequired,
  amountQuestions: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeRequest: PropTypes.func.isRequired,
  sendExamRequest: PropTypes.func.isRequired
};

export default Menu;
