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
          if (course.course === this.state.course._id) {
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
              <h1 className="mt-4">Maasai Serengeti</h1>

              <hr />

              <p className="lead">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe
                quibusdam sit excepturi nam quia corporis eligendi eos magni
                recusandae laborum minus inventore?
              </p>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut,
                tenetur natus doloremque laborum quos iste ipsum rerum obcaecati
                impedit odit illo dolorum ab tempora nihil dicta earum fugiat.
                Temporibus, voluptatibus.
              </p>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos,
                doloribus, dolorem iusto blanditiis unde eius illum consequuntur
                neque dicta incidunt ullam ea hic porro optio ratione repellat
                perspiciatis. Enim, iure!
              </p>

              <blockquote className="blockquote">
                <p className="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer posuere erat a ante.
                </p>
                <footer className="blockquote-footer">
                  Someone famous in
                  <cite title="Source Title">Source Title</cite>
                </footer>
              </blockquote>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error,
                nostrum, aliquid, animi, ut quas placeat totam sunt tempora
                commodi nihil ullam alias modi dicta saepe minima ab quo
                voluptatem obcaecati?
              </p>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum,
                dolor quis. Sunt, ut, explicabo, aliquam tenetur ratione tempore
                quidem voluptates cupiditate voluptas illo saepe quaerat numquam
                recusandae? Qui, necessitatibus, est!
              </p>

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
