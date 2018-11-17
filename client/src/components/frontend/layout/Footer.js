import React, { Component } from "react";

import { Link } from "react-router-dom";

import Logo from "../../../assets/img/logo.png";

import { Row, Col, Container } from "reactstrap";

class Footer extends Component {
  render() {
    return (
      <div id="footer">
        <div id="info">
          <Container>
            <Row id="footer-links">
              <Col md={4} className="links-title links-image">
                <img src={Logo} alt="" />
              </Col>

              <Col md="4" className="links-title">
                <h4>Get in Touch</h4>
                <hr />
                <ul>
                  <li />
                  <li />
                  <li />
                </ul>
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
              </Col>

              <Col md="4" className="links-title">
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
              </Col>
            </Row>
          </Container>
        </div>

        <footer id="main-footer" className="py-3">
          <Container className="d-flex justify-content-between">
            <h5>Copyright &copy; 2018 UK Exams. All rights reserved.</h5>
            <h5>Builded by DID</h5>
          </Container>
        </footer>
      </div>
    );
  }
}

export default Footer;
