import React, { Component } from "react";
import {
  getCourse,
  buyCourseSubscription
} from "../../../actions/courseActions";
import {
  addCourseToProfile,
  getCurrentProfile
} from "../../../actions/profileActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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

        coursesOwned.forEach(course => {
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

  buyCourse = plan => {
    if (this.props.auth.isAuthenticated) {
      this.props.buyCourseSubscription(this.props.match.params.handle, plan);
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
                to={`${this.state.course.handle}/exam`}
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
              plans.length === 1
                ? { borderBottom: "1px solid rgba(0, 0, 0, 0.125)" }
                : {}
            }
          >
            <div className="card-header">
              <h4 className="font-weight-normal">{plan.title}</h4>
            </div>
            <div className="card-body d-flex flex-column justify-content-between align-items-center">
              <h2 className="card-title mb-4">
                &#163; {plan.price}{" "}
                <small className="text-muted">/ {plan.subscription}</small>
              </h2>
              <Link
                className="btn btn-primary"
                to={{
                  pathname: `/courses/${course.handle}/checkout/${plan._id}`
                }}
                style={{ width: "6rem" }}
              >
                Buy
              </Link>
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
  buyCourseSubscription: PropTypes.func.isRequired,
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
  { getCourse, buyCourseSubscription, getCurrentProfile }
)(SingleCourse);
