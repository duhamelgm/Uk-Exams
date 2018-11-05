import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getDashboardCourses } from "../../../actions/courseActions";
import { Link } from "react-router-dom";

class Landing extends Component {
  componentDidMount() {
    this.props.getDashboardCourses();
  }

  render() {
    let courses = this.props.course.courses;

    if (Object.keys(courses).length > 0) {
      courses = courses.map((course, id) => (
        <div className="card" key={id}>
          <div className="card-body">
            <h5 className="card-title">{course.title}</h5>
            <p className="card-text">{course.smalldescription}</p>
          </div>

          <div className="card-footer d-flex justify-content-between">
            <Link to={`courses/${course.handle}`} className="btn btn-secondary">
              Read More
            </Link>
          </div>
        </div>
      ));
    } else {
      courses = false;
    }

    return (
      <div>
        <div>
          <div className="bg-primary" style={{ padding: "6rem 0 6rem 0" }}>
            <div className="container d-flex flex-column align-items-center">
              <h1 className="text-white text-center">
                All your examinations revision needs at one place
              </h1>
              <h2 className="text-ligth-blue">Complete revision solutions</h2>
              <form className="searchform">
                <input
                  type="text"
                  name="s"
                  id="search"
                  className="form-control form-control-lg"
                  placeholder="Search Exams"
                />

                <input
                  type="submit"
                  value="Get Started"
                  id="searchbtn"
                  className="btn btn-secondary btn-lg form-control form-control-lg"
                />
              </form>
            </div>
          </div>

          <div id="courses-section">
            <div className="container">
              <div id="courses-list">
                <div className="title">
                  <h2 className="display-4">Our courses</h2>
                  <hr />
                </div>

                <div className="card-deck">{courses}</div>

                <a
                  className="btn btn-outline-secondary btn-lg"
                  href="<?php echo get_permalink( get_page_by_path( 'Courses' ) );?>"
                  role="button"
                >
                  See more
                </a>
              </div>
            </div>
          </div>

          <div id="courses-caracteristics" className="shadow-sm">
            <div className="container">
              <ul>
                <li>
                  <div className="icon-circle">
                    <i class="fas fa-question" />
                  </div>

                  <h5 className="text-white">
                    Over 2000 Questions per examination
                  </h5>
                </li>
                <li>
                  <div className="icon-circle">
                    <i class="far fa-sticky-note" />
                  </div>

                  <h5 className="text-white">Leader boards</h5>
                </li>
                <li>
                  <div className="icon-circle">
                    <i class="fas fa-users" />
                  </div>

                  <h5 className="text-white">Discuss in study room</h5>
                </li>
                <li>
                  <div className="icon-circle">
                    <i class="fas fa-tasks" />
                  </div>

                  <h5 className="text-white">Revision notes</h5>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="container">
          <div id="footer-home">
            <h4 className="display-5">What are you waiting for?</h4>
            <div className="display-4">Start learning today</div>
            <a
              className="btn btn-secondary btn-lg"
              href="<?php echo get_permalink( get_page_by_path( 'Courses' ) );?>"
              role="button"
            >
              Start now
            </a>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  getDashboardCourses: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  course: state.course
});

export default connect(
  mapStateToProps,
  { getDashboardCourses }
)(Landing);
