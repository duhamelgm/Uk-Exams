import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import { clearCurrentProfile } from "../../../actions/profileActions";

import Logo from "../../../assets/img/logo.png";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();

    this.props.logoutUser();
    this.props.clearCurrentProfile();
  };

  goAdminDashboard = e => {
    e.preventDefault();

    window.location.href = "/admin";
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav nav-login">
        <li className="nav-item">
          <a href=" " className="nav-link" onClick={this.goAdminDashboard}>
            BACKEND
          </a>
        </li>

        <li className="nav-item">
          <a href=" " className="nav-link" onClick={this.onLogoutClick}>
            LOGOUT
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav nav-login">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            LOGIN
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/register" className="nav-link">
            SIGN UP
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-lg" id="main-navbar">
        <div className="container">
          <div id="nav-icon-w">
            <div id="nav-icon">
              <span />
              <span />
              <span />
            </div>
          </div>

          <Link className="navbar-brand" to="/">
            <img src={Logo} alt="Logo" />
          </Link>

          <div id="navbar-content">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  HOME
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/courses">
                  COURSES
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/News">
                  NEWS
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/studyroom">
                  STUDY ROOM
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  CONTACT
                </Link>
              </li>
            </ul>
          </div>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
