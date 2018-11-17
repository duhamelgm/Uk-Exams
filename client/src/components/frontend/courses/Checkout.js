import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getCourse,
  buyCourseSubscription
} from "../../../actions/courseActions";
import { getCurrentProfile } from "../../../actions/profileActions";
import TextFieldGroup from "../../common/TextFieldGroup";

import { ListGroup, ListGroupItem } from "reactstrap";

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      plan: {},
      profile: {}
    };
  }

  componentDidMount() {
    this.props.getCourse(this.props.match.params.handle);
    this.props.getCurrentProfile();
  }

  componentDidUpdate(prevProps) {
    if (this.props.course !== prevProps.course) {
      if (this.props.course.course === null) {
        this.props.history.push("/");
      }

      let plan = false;

      for (let i = 0; i < this.props.course.course.plans.length; i++) {
        if (
          this.props.course.course.plans[i]._id ===
          this.props.match.params.planID
        ) {
          plan = i;
        }
      }

      if (plan !== false) {
        this.setState({
          plan: this.props.course.course.plans[plan]
        });
      }
    }

    if (this.props.profile !== prevProps.profile) {
      this.setState({
        profile: this.props.profile.profile
      });
    }
  }

  buyCourse = () => {
    const { profile, plan } = this.state;

    const data = {
      profile: profile,
      plan: plan
    };

    if (this.props.auth.isAuthenticated) {
      this.props.buyCourseSubscription(this.props.match.params.handle, data);
    } else {
      alert("Log in to buy a course");
    }
  };

  render() {
    const { plan, profile } = this.state;
    console.log(plan);
    console.log(profile);
    let content;

    if (plan && profile) {
      if (Object.keys(plan).length > 0 && Object.keys(profile).length > 0) {
        content = (
          <div className="row">
            <div className="col-md-4 order-md-2 mb-4">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Your cart</span>
              </h4>
              <ListGroup className="mb-3">
                <ListGroupItem className="d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0">Product name</h6>
                    <small className="text-muted">{plan.title}</small>
                  </div>
                  <span className="text-muted">&pound;{plan.price}</span>
                </ListGroupItem>

                <ListGroupItem className="d-flex justify-content-between">
                  <span>Total (GBP)</span>
                  <strong>&pound;{plan.price}</strong>
                </ListGroupItem>
              </ListGroup>
            </div>

            <div className="col-md-8 order-md-1">
              <h4 className="mb-3">Billing address</h4>

              <div className="form-row">
                <TextFieldGroup
                  formGroupClass="col-md-6"
                  name="firstname"
                  placeholder={profile.firstname}
                  label="First Name"
                  readOnly
                />
                <TextFieldGroup
                  formGroupClass="col-md-6"
                  name="lastname"
                  placeholder={profile.lastname}
                  label="Last Name"
                  readOnly
                />
              </div>

              <TextFieldGroup
                name="address"
                placeholder={profile.address}
                label="Address"
                readOnly
              />

              <div className="form-row">
                <TextFieldGroup
                  formGroupClass="col-md-4"
                  name="country"
                  value={profile.country}
                  label="Country"
                  readOnly
                />

                <TextFieldGroup
                  formGroupClass="col-md-3"
                  name="state"
                  placeholder={profile.state}
                  label="State"
                  readOnly
                />

                <TextFieldGroup
                  formGroupClass="col-md-3"
                  name="city"
                  value={profile.city}
                  label="City"
                  readOnly
                />

                <TextFieldGroup
                  formGroupClass="col-md-2"
                  name="zip"
                  value={profile.zip}
                  label="Zip"
                  readOnly
                />
              </div>

              <h6>
                <span className="text-muted">
                  Your can change your billing addres editing your profile
                </span>
              </h6>

              <hr className="mb-4" />

              <h4 className="mb-3">Payment</h4>

              <div className="d-block my-3">
                <div className="custom-control custom-radio">
                  <input
                    id="paypal"
                    name="paymentMethod"
                    type="radio"
                    className="custom-control-input"
                    checked
                  />
                  <label className="custom-control-label" for="paypal">
                    Paypal
                  </label>
                </div>
              </div>
              <button
                className="btn btn-primary btn-lg btn-block"
                type="submit"
                onClick={() => {
                  this.buyCourse();
                }}
              >
                Continue to checkout
              </button>
            </div>
          </div>
        );
      } else {
        content = "Cargando";
      }
    }
    return <div className="container my-4">{content}</div>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  course: state.course
});

export default connect(
  mapStateToProps,
  { getCourse, getCurrentProfile, buyCourseSubscription }
)(Checkout);
