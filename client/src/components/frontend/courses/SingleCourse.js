import React, { Component } from "react";
import { getCourse } from "../../../actions/courseActions";
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

  render() {
    let course = this.state.course;

    if (Object.keys(course).length > 0) {
      let plans = course.plans;

      if (this.props.auth.isAuthenticated) {
        plans = <Link to={`${this.state.course.handle}/quiz`}>Go</Link>;
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
            <div className="card-header">{plan.title}</div>
            <div className="card-body">
              <p>{plan.subscription}</p>
              <p>{plan.price}</p>
            </div>
          </div>
        ));
      }

      course = (
        <div class="container">
          <div class="row">
            <div class="col-lg-8">
              <h1 class="mt-4">Maasai Serengeti</h1>

              <hr />

              <p class="lead">
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

              <blockquote class="blockquote">
                <p class="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer posuere erat a ante.
                </p>
                <footer class="blockquote-footer">
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

            <div class="col-lg-4">
              <div class="accordion my-4">{plans}</div>

              <div class="card my-4">
                <h5 class="card-header">Search</h5>
                <div class="card-body">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search for..."
                    />
                    <span class="input-group-btn">
                      <button class="btn btn-secondary" type="button">
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
  { getCourse }
)(SingleCourse);
