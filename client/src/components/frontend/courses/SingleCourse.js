import React, { Component } from "react";
import { getCourse } from "../../../actions/courseActions";
import {
  addCourseToProfile,
  getCurrentProfile
} from "../../../actions/profileActions";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";

class SingleCourse extends Component {
  constructor() {
    super();
    this.state = {
      course: {}
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

      this.setState({
        course: this.props.course.course
      });
    }
  }

  checkCourseOwned = () => {
    let val = false;

    if (this.props.profile.profile) {
      if (this.props.profile.profile.coursesOwned) {
        let { coursesOwned } = this.props.profile.profile;

        coursesOwned.map((course, id) => {
          console.log(`New iteration`);
          console.log(course);
          console.log(this.state.course);
          if (
            course._id === this.state.course._id ||
            course.course === this.state.course._id
          ) {
            val = true;
          }
        });
      }
    }

    return val;
  };

  buyCourse = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.addCourseToProfile(this.props.match.params.handle);
    } else {
      alert("Log in to buy a course");
    }
  };

  render() {
    let course = this.state.course;

    let val = this.checkCourseOwned();

    if (Object.keys(course).length > 0) {
      let plans = course.plans;

      if (val) {
        plans = (
          <div className="card">
            <div className="card-header">Start</div>
            <div className="card-body">
              <Link
                className="btn btn-primary"
                to={`${this.state.course.handle}/quiz`}
              >
                Go
              </Link>
            </div>
          </div>
        );
      } else {
        plans = plans.map((plan, id) => (
          <div
            className="card"
            key={id}
            style={
              plans.length == 1
                ? { borderBottom: "1px solid rgba(0, 0, 0, 0.125)" }
                : {}
            }
          >
            <div className="card-header">
              <h4 className="card-title">{plan.title}</h4>
            </div>
            <div className="card-body d-flex justify-content-between align-items-center">
              <p className="card-text my-0">
                {plan.price}
                &#163; each {plan.subscription}
              </p>
              <button className="btn btn-primary" onClick={this.buyCourse}>
                Buy
              </button>
            </div>
          </div>
        ));
      }

      course = (
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h1 className="mt-4">{course.title}</h1>

              <hr />

              {course.description}

              <hr />
            </div>

            <div className="col-lg-4">
              <div className="accordion my-4">{plans}</div>

              <div className="card my-4">
                <h5 className="card-header">Search</h5>
                <div className="card-body">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search for..."
                    />
                    <span className="input-group-btn">
                      <button className="btn btn-secondary" type="button">
                        Go!
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      course = <Spinner />;
    }

    return <div>{course}</div>;
  }
}

SingleCourse.propTypes = {
  getCourse: PropTypes.func.isRequired,
  addCourseToProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired
};

const mapStateToProptypes = state => ({
  auth: state.auth,
  profile: state.profile,
  course: state.course
});

export default connect(
  mapStateToProptypes,
  { getCourse, addCourseToProfile, getCurrentProfile }
)(SingleCourse);
