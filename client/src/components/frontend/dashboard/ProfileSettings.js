import React, { Component } from "react";
import { connect } from "react-redux";
import TextFieldGroup from "../../common/TextFieldGroup";
import PropTypes from "prop-types";
import { updateProfile } from "../../../actions/profileActions";

class ProfileSettings extends Component {
  constructor() {
    super();
    this.state = {
      location: "",
      errors: {}
    };
  }

  onSubmit = e => {
    e.preventDefault();

    const userProfile = {
      location: this.state.location
    };

    this.props.updateProfile(userProfile);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container my-4">
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            name="location"
            placeholder="Your location"
            value={this.state.location}
            onChange={this.onChange}
            error={errors.location}
          />

          <button className="btn btn-lg btn-secondary" type="submit">
            Update
          </button>
        </form>
      </div>
    );
  }
}

ProfileSettings.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateProfile }
)(ProfileSettings);
