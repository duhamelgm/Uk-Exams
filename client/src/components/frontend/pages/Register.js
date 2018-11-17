import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../../actions/authActions";
import TextFieldGroup from "../../common/TextFieldGroup";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

import { Label } from "reactstrap";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password2: "",
      address: "",
      country: "",
      state: "",
      city: "",
      zip: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.errors !== prevProps.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeCountry = val => {
    this.setState({ country: val });
  };

  onChangeRegion = val => {
    this.setState({ state: val });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      address: this.state.address,
      country: this.state.country,
      state: this.state.state,
      city: this.state.city,
      zip: this.state.zip
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container my-4">
        <div className="row">
          <div className="col-md-8">
            <h4 class="mb-3">Register form</h4>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-row">
                <TextFieldGroup
                  formGroupClass="col-md-6"
                  name="firstname"
                  placeholder=""
                  value={this.state.firstname}
                  onChange={this.onChange}
                  error={errors.firstname}
                  label="First Name"
                />
                <TextFieldGroup
                  formGroupClass="col-md-6"
                  name="lastname"
                  placeholder=""
                  value={this.state.lastname}
                  onChange={this.onChange}
                  error={errors.lastname}
                  label="Last Name"
                />
              </div>

              <div className="form-row">
                <TextFieldGroup
                  formGroupClass="col-md-12"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  label="Email"
                />
              </div>

              <div className="form-row ">
                <TextFieldGroup
                  formGroupClass="col-md-6"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                  label="Password"
                />

                <TextFieldGroup
                  formGroupClass="col-md-6"
                  type="password"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                  label="Confirm password"
                />
              </div>

              <div className="form-row">
                <TextFieldGroup
                  formGroupClass="col-md"
                  name="address"
                  placeholder="1234 Main St"
                  value={this.state.address}
                  onChange={this.onChange}
                  error={errors.address}
                  label="Address"
                />
              </div>

              <div className="form-row">
                <div className="form-group col-md-4">
                  <Label>Country</Label>
                  <CountryDropdown
                    className="custom-select custom-select-lg"
                    name="country"
                    value={this.state.country}
                    onChange={val => this.onChangeCountry(val)}
                  />
                </div>
                <div className="form-group col-md-3">
                  <Label>State</Label>
                  <RegionDropdown
                    className="custom-select custom-select-lg"
                    name="region"
                    country={this.state.country}
                    value={this.state.state}
                    onChange={val => this.onChangeRegion(val)}
                  />
                </div>
                <TextFieldGroup
                  formGroupClass="col-md-3"
                  name="city"
                  value={this.state.city}
                  onChange={this.onChange}
                  label="City"
                />

                <TextFieldGroup
                  formGroupClass="col-md-2"
                  name="zip"
                  value={this.state.zip}
                  onChange={this.onChange}
                  label="Zip"
                />
              </div>
              <div className="form-row">
                <div className="container-fluid d-flex justify-content-center my-2">
                  <button
                    type="submit"
                    className="btn btn-secondary btn-block btn-lg"
                    style={{ width: "10rem" }}
                  >
                    REGISTER
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  notification: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  notification: state.notification,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
