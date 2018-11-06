import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../../actions/authActions";
import TextFieldGroup from "../../common/TextFieldGroup";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      address: "",
      country: "",
      region: "",
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
    console.log(e.target);
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeCountry = val => {
    this.setState({ country: val });
  };

  onChangeRegion = val => {
    this.setState({ region: val });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      address: this.state.address,
      country: this.state.country,
      region: this.state.region,
      city: this.state.city,
      zip: this.state.zip
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container my-4">
        <div className="card" style={{ maxWidth: "50rem", margin: "auto" }}>
          <div className="card-body">
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-row">
                <TextFieldGroup
                  formGroupClass="col-md-6"
                  name="name"
                  placeholder="Full name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  formGroupClass="col-md-6"
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
              </div>

              <div className="form-row ">
                <TextFieldGroup
                  formGroupClass="col-md-6"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />

                <TextFieldGroup
                  formGroupClass="col-md-6"
                  type="password"
                  name="password2"
                  placeholder="Confirm password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
              </div>

              <div className="form-row">
                <TextFieldGroup
                  formGroupClass="col-md"
                  name="address"
                  placeholder="Address"
                  value={this.state.address}
                  onChange={this.onChange}
                  error={errors.address}
                />
              </div>

              <div className="form-row">
                <div className="form-group col-md-4">
                  <CountryDropdown
                    className="custom-select custom-select-lg"
                    name="country"
                    value={this.state.country}
                    onChange={val => this.onChangeCountry(val)}
                  />
                </div>
                <div className="form-group col-md-3">
                  <RegionDropdown
                    className="custom-select custom-select-lg"
                    name="region"
                    country={this.state.country}
                    value={this.state.region}
                    onChange={val => this.onChangeRegion(val)}
                  />
                </div>

                <TextFieldGroup
                  formGroupClass="col-md-3"
                  name="city"
                  placeholder="City"
                  value={this.state.city}
                  onChange={this.onChange}
                />

                <TextFieldGroup
                  formGroupClass="col-md-2"
                  name="zip"
                  placeholder="Zip Code"
                  value={this.state.zip}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-row">
                <div className="container-fluid d-flex justify-content-center my-2">
                  <button
                    type="submit"
                    className="btn btn-secondary"
                    style={{ width: "10rem" }}
                  >
                    SIGN UP
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
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
