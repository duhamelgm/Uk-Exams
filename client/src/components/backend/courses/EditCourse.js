import React, { Component } from "react";
import { connect } from "react-redux";
import TextFieldGroup from "../../common/TextFieldGroup";
import PropTypes from "prop-types";
import {
  updateCourse,
  getCourse,
  addCourse,
  resetMsg
} from "../../../actions/courseActions";

import * as XLSX from "xlsx";

import { CustomInput, Form, FormGroup, Label, Input } from "reactstrap";

class EditCourse extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      handle: "",
      plans: [
        {
          title: "",
          subscription: "",
          price: ""
        }
      ],
      quiz: [{}],
      msg: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getCourse(this.props.match.params.handle);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.course !== prevProps.course) {
      if (this.props.course.course !== prevProps.course.course) {
        let newPlans = this.props.course.course.plans.map(plan => {
          return {
            title: plan.title,
            subscription: plan.subscription,
            price: plan.price
          };
        });

        this.setState({
          handle: this.props.course.course.handle,
          title: this.props.course.course.title,
          description: this.props.course.course.description,
          plans: newPlans
        });
      }

      if (this.props.course.msg === "updated") {
        this.props.resetMsg(() => {
          alert("The course was successfully updated");
        });
      } else if (this.props.course.msg === "created") {
        this.props.resetMsg(() => {
          alert("The course was successfully created");
          this.props.history.push("/courses");
        });
      }
    }

    if (this.props.errors !== prevProps.errors) {
      this.setState({
        errors: this.props.errors
      });
    }
  }

  handleFileUpload = e => {
    const f = e.target.files[0];

    const reader = new FileReader();
    reader.onload = evt => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, {});
      /* Update state */
      console.log(data);

      this.setState({ quiz: data });
    };
    reader.readAsBinaryString(f);
  };

  addSubscription = e => {
    this.setState({
      plans: this.state.plans.concat([
        {
          title: "",
          subscription: "",
          price: ""
        }
      ])
    });
  };

  removeSubscription = id => () => {
    this.setState({
      plans: this.state.plans.filter((s, sid) => id !== sid)
    });
  };

  onChangePlan = id => e => {
    const newPlans = this.state.plans.map((plan, idx) => {
      if (id !== idx) return plan;
      return { ...plan, [e.target.name]: e.target.value };
    });

    this.setState({ plans: newPlans });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newCourse = {
      title: this.state.title,
      description: this.state.description,
      handle: this.state.handle,
      plans: this.state.plans,
      quiz: this.state.quiz
    };

    if (this.props.match.params.handle) {
      this.props.updateCourse(newCourse, this.props.match.params.handle);
    } else {
      this.props.addCourse(newCourse);
    }
  };

  render() {
    const { errors } = this.state;
    let planErrors = [];

    if (this.state.msg === "updated") {
      console.log("hola");
      this.props.course.msg = "";
    }

    return (
      <div className="container my-4">
        <div className="row">
          <div className="col-lg-8">
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                name="title"
                placeholder="Title of the course"
                value={this.state.title}
                onChange={this.onChange}
                error={errors.title}
              />

              <TextFieldGroup
                type="textarea"
                name="description"
                placeholder="Small description"
                value={this.state.description}
                onChange={this.onChange}
                error={errors.description}
                info={
                  "A small description that will be displayed on the home page"
                }
              />

              <TextFieldGroup
                type="textarea"
                name="smalldescription"
                placeholder="Description"
                value={this.state.description}
                onChange={this.onChange}
                error={errors.description}
              />

              <TextFieldGroup
                name="handle"
                placeholder="Handle of the course"
                value={this.state.handle}
                onChange={this.onChange}
                error={errors.handle}
              />
              <div className="form-group">
                <div className="accordion">
                  {this.state.plans.map((plan, id) => {
                    planErrors.push({});
                    if (Array.isArray(errors.plans)) {
                      if (
                        errors.plans.length >= id &&
                        errors.plans[id] !== undefined
                      ) {
                        planErrors[id] = errors.plans[id];
                      }
                    }

                    return (
                      <div className="card" key={id}>
                        <div className="card-header d-flex justify-content-between">
                          <h5 className="mb-0">
                            {plan.title ? plan.title : "New plan"}
                          </h5>
                          <button
                            type="button"
                            className="close"
                            onClick={this.removeSubscription(id)}
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="collapse show">
                          <div className="card-body">
                            <TextFieldGroup
                              name="title"
                              placeholder="Title of this plan"
                              value={plan.title}
                              onChange={this.onChangePlan(id)}
                              error={planErrors[id].title}
                            />

                            <TextFieldGroup
                              name="subscription"
                              placeholder="Type of subscription"
                              value={plan.subscription}
                              onChange={this.onChangePlan(id)}
                              error={planErrors[id].subscription}
                            />

                            <TextFieldGroup
                              name="price"
                              placeholder="Price of this plan"
                              value={plan.price}
                              onChange={this.onChangePlan(id)}
                              error={planErrors[id].price}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="card">
                    <div className="card-header d-flex justify-content-center align-items-center flex-column">
                      <h5 className="text-danger">{errors.plan}</h5>
                      <button
                        className="btn btn-info"
                        onClick={this.addSubscription}
                        type="button"
                      >
                        Add new Subscription plan
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="card">
                  <div className="card-header">
                    <h5 className="text-danger">{errors.quiz}</h5>
                    <h5 className="mb-0">Add a quiz to the course</h5>
                  </div>
                  <div className="card-body">
                    <CustomInput type="file" onChange={this.handleFileUpload} />
                  </div>
                </div>
              </div>

              <button className="btn btn-lg btn-secondary" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

EditCourse.propTypes = {
  updateCourse: PropTypes.func.isRequired,
  getCourse: PropTypes.func.isRequired,
  addCourse: PropTypes.func.isRequired,
  resetMsg: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProptypes = state => ({
  auth: state.auth,
  course: state.course,
  errors: state.errors
});

export default connect(
  mapStateToProptypes,
  { updateCourse, getCourse, addCourse, resetMsg }
)(EditCourse);
