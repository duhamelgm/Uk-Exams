import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import TextFieldGroup from "../../../common/TextFieldGroup";
import { Accordion } from "../../../common/Accordion";
import { Label, FormGroup, CustomInput, Input } from "reactstrap";

const CoursePlans = ({
  state,
  errors,
  onChangePlan,
  removeSubscription,
  addSubscription
}) => {
  let planErrors = [];

  return (
    <div className="form-group">
      <Accordion>
        {state.plans.map((plan, id) => {
          planErrors.push({});
          if (Array.isArray(errors.plans)) {
            if (errors.plans.length >= id && errors.plans[id] !== undefined) {
              planErrors[id] = errors.plans[id];
            }
          }

          return (
            <Accordion.Item key={id}>
              <Accordion.Header className="d-flex justify-content-between card-title mb-0">
                {plan.title ? plan.title : "New plan"}
              </Accordion.Header>

              <Accordion.Body>
                <TextFieldGroup
                  label="The title of this plan"
                  name="title"
                  placeholder="Great Plan"
                  value={plan.title}
                  onChange={onChangePlan(id)}
                  error={planErrors[id].title}
                />

                <FormGroup>
                  <Label for="exampleCustomSelect">
                    Frequency of payments of the plan
                  </Label>
                  <CustomInput
                    id={`frequency${id}`}
                    type="select"
                    name="frequency"
                    value={plan.frequency}
                    onChange={onChangePlan(id)}
                    className="custom-select custom-select-lg"
                  >
                    <option value="">Select</option>
                    <option>Month</option>
                  </CustomInput>
                  <small className="form-text text-muted" />
                  <div className="invalid-feedback">
                    {planErrors[id].frequency}
                  </div>
                </FormGroup>

                <TextFieldGroup
                  label="Interval of payments"
                  name="interval"
                  placeholder="X"
                  value={plan.interval}
                  onChange={onChangePlan(id)}
                  error={planErrors[id].interval}
                  info="If the option is 'X' the plan will renew each X Months (Must be a number between 1 and 12)"
                />

                <FormGroup>
                  <Label>Price for each interval of the plan</Label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">&pound;</span>
                    </div>
                    <Input
                      type="text"
                      name="price"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": planErrors[id].price
                      })}
                      placeholder="00"
                      value={plan.price}
                      onChange={onChangePlan(id)}
                    />
                    <div className="invalid-feedback">
                      {planErrors[id].price}
                    </div>
                  </div>
                </FormGroup>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
      <div className="card">
        <div className="card-header d-flex justify-content-center align-items-center flex-column">
          <h5 className="text-danger">{errors.plan}</h5>
          <button
            className="btn btn-info"
            onClick={addSubscription}
            type="button"
          >
            Add new subscription plan
          </button>
        </div>
      </div>
    </div>
  );
};

CoursePlans.propTypes = {
  state: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onChangePlan: PropTypes.func.isRequired,
  removeSubscription: PropTypes.func.isRequired,
  addSubscription: PropTypes.func.isRequired
};

export default CoursePlans;
