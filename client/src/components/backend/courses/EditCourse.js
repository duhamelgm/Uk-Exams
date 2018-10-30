import React, { Component } from "react";
import { connect } from "react-redux";
import TextFieldGroup from "../../common/TextFieldGroup";
import PropTypes from "prop-types";
import {
  updateCourse,
  getCourse,
  addCourse
} from "../../../actions/courseActions";

import * as XLSX from "xlsx";

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
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getCourse(this.props.match.params.handle);
  }

  componentDidUpdate(prevProps) {
    if (this.props.course !== prevProps.course) {
      console.log(this.props.course);

      let newPlans = this.props.course.course.plans.map(plan => {
        return {
          title: plan.title,
          subscription: plan.subscription,
          price: plan.price
        };
      });

      this.setState({
        handle: this.props.match.params.handle,
        title: this.props.course.course.title,
        description: this.props.course.course.description,
        plans: newPlans
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
      console.log(wb);
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      console.log(ws);
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
    console.log(e.target.name);
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

    console.log(newCourse);

    if (this.props.match.params.handle) {
      this.props.updateCourse(newCourse, this.props.match.params.handle);
    } else {
      this.props.addCourse(newCourse);
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container my-4">
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            name="title"
            placeholder="Title of the course"
            value={this.state.title}
            onChange={this.onChange}
            error={errors.title}
          />

          <TextFieldGroup
            name="description"
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

          <div className="accordion">
            {this.state.plans.map((plan, id) => (
              <div className="form-group" key={id}>
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">
                      {plan.title ? plan.title : "New plan"}
                    </h5>
                  </div>
                  <div className="collapse show">
                    <div className="card-body">
                      <TextFieldGroup
                        name="title"
                        placeholder="Title of this plan"
                        value={plan.title}
                        onChange={this.onChangePlan(id)}
                        error={errors.title}
                      />

                      <TextFieldGroup
                        name="subscription"
                        placeholder="Type of subscription"
                        value={plan.subscription}
                        onChange={this.onChangePlan(id)}
                        error={errors.subscription}
                      />

                      <TextFieldGroup
                        name="price"
                        placeholder="Price of this plan"
                        value={plan.price}
                        onChange={this.onChangePlan(id)}
                        error={errors.price}
                      />

                      <div className="form-group">
                        <button
                          className="btn btn-danger"
                          onClick={this.removeSubscription(id)}
                          type="button"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="form-group">
            <button
              className="btn btn-info btn-lg"
              onClick={this.addSubscription}
              type="button"
            >
              Add
            </button>
          </div>

          <div className="form-group">
            <input type="file" onChange={this.handleFileUpload} />
          </div>

          <button className="btn btn-lg btn-secondary" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

EditCourse.propTypes = {
  updateCourse: PropTypes.func.isRequired,
  getCourse: PropTypes.func.isRequired,
  addCourse: PropTypes.func.isRequired,
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
  { updateCourse, getCourse, addCourse }
)(EditCourse);
