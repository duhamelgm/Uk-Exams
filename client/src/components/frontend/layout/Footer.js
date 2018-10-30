import React, { Component } from "react";

import { Link } from "react-router-dom";

import Logo from "../../../assets/img/logo.png";

class Footer extends Component {
  render() {
    return (
      <div id="footer">
        <div id="info">
          <div className="container">
            <ul id="footer-links">
              <li className="links-title links-image">
                <img src={Logo} alt="" />
              </li>

              <li className="links-title">
                <h4>Get in Touch</h4>
                <hr />
                <ul>
                  <li />
                  <li />
                  <li />
                </ul>
              </li>

              <li className="links-title">
                <h4>Useful Links</h4>
                <hr />
                <ul className="pages">
                  <li>
                    <Link to="">About Us</Link>
                  </li>
                  <li>
                    <Link to="">News</Link>
                  </li>
                  <li>
                    <Link to="">Forum</Link>
                  </li>
                  <li>
                    <Link to="">Courses</Link>
                  </li>
                  <li>
                    <Link to="">Log in</Link>
                  </li>
                  <li>
                    <Link to="">FAQ</Link>
                  </li>
                  <li>
                    <Link to="">Contact</Link>
                  </li>
                  <li>
                    <Link to="">Privacy Policy</Link>
                  </li>
                </ul>
              </li>

              <li className="links-title">
                <h4>Social Media</h4>
                <hr />
                <ul>
                  <li>
                    <i className="mdi mdi-facebook" />
                    <a href="https://www.facebook.com">Facebook</a>
                  </li>
                  <li>
                    <i className="mdi mdi-twitter" />
                    <a href="https://www.twitter.com">Twitter</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <footer className="main-footer">
          <div className="container">
            <h5>Copyright &copy; 2018 UK Exams. All rights reserved.</h5>
            <h5>Builded by DID</h5>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
