import React, { Component } from "react";
import { Link } from "react-router-dom";

import Logo from "../../../assets/img/logo.png";

class Navbar extends Component {
  onClick = e => {
    e.preventDefault();

    window.location.href = "/";
  };

  render() {
    return (
      <div>
        <nav
          className="navbar navbar-dark bg-dark flex-md-nowrap py-1"
          id="top-navbar"
        >
          <div className="navbar-brand">
            <img src={Logo} alt="Logo" />
            <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to=" ">
              Company name
            </Link>
          </div>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
              <a className="nav-link" href=" " onClick={this.onClick}>
                Frontend
              </a>
            </li>
            <li className="nav-item text-nowrap">
              <Link className="nav-link" to=" ">
                Sign out
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navbar;
