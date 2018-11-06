import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import { clearCurrentProfile } from "../../../actions/profileActions";

import Logo from "../../../assets/img/logo.png";

// Import bootstrap components
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class FrontendNavbar extends Component {
  constructor() {
    super();

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  onLogoutClick = e => {
    e.preventDefault();

    this.props.logoutUser();
    this.props.clearCurrentProfile();
  };

  goAdminDashboard = e => {
    e.preventDefault();

    window.location.href = "/admin";
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <Nav>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle className="text-white" nav caret>
            PROFILE
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              {" "}
              <Link to="/dashboard">Dashboard</Link>
            </DropdownItem>
            <DropdownItem>
              <a href=" " onClick={this.goAdminDashboard}>
                Backend
              </a>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              {" "}
              <a href=" " onClick={this.onLogoutClick}>
                Logout
              </a>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    );

    const guestLinks = (
      <Nav>
        <NavItem>
          <Link to="/login" className="nav-link text-white">
            LOGIN
          </Link>
        </NavItem>

        <NavItem>
          <Link to="/register" className="nav-link text-white">
            SIGN UP
          </Link>
        </NavItem>
      </Nav>
    );

    return (
      <Navbar
        color="primary"
        className=""
        expand="lg"
        style={{ fontSize: "1.3rem" }}
      >
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src={Logo} alt="Logo" />
          </Link>

          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem className="close-icon">
                <button
                  type="button"
                  className="close"
                  style={{ fontSize: "3rem" }}
                  onClick={this.toggle}
                >
                  <span>&times;</span>
                </button>
              </NavItem>
              <NavItem>
                <Link className="nav-link text-white" to="/">
                  HOME
                </Link>
              </NavItem>

              <NavItem>
                <Link className="nav-link text-white" to="/courses">
                  COURSES
                </Link>
              </NavItem>

              <NavItem>
                <Link className="nav-link text-white" to="/contact">
                  CONTACT
                </Link>
              </NavItem>
            </Nav>
          </Collapse>

          <div className="dont-dollapse d-flex">
            {isAuthenticated ? authLinks : guestLinks}

            <NavbarToggler onClick={this.toggle} />
          </div>
        </div>
      </Navbar>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func,
  clearCurrentProfile: PropTypes.func,
  profile: PropTypes.object,
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(FrontendNavbar);
