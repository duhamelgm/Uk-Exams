import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCourseQuiz } from "../../../actions/courseActions";

class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      quiz: {}
    };
  }

  componentDidMount() {
    this.props.getCourseQuiz(this.props.match.params.handle);
  }

  componentDidUpdate(prevProps) {
    if (this.props.course !== prevProps.course) {
      this.setState({ quiz: this.props.course.course.quiz });
    }
  }

  render() {
    return (
      <div class="container">
        <div className="row my-4">
          <div class="card col-lg-8" style={{ padding: "0" }}>
            <div className="card-header">
              <h3 className="card-title">Here goes the question</h3>
            </div>
            <ul className="list-group list-group-flush">
              <li class="list-group-item">Cras justo odio</li>
              <li class="list-group-item">Dapibus ac facilisis in</li>
              <li class="list-group-item">Vestibulum at eros</li>
              <li class="list-group-item">Another question</li>
            </ul>
            <div class="card-body text-center">
              <a href="#" class="card-link">
                Previous
              </a>
              <a href="#" class="card-link">
                Skip
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Quiz.propTypes = {
  getCourseQuiz: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  course: state.course
});

export default connect(
  mapStateToProps,
  { getCourseQuiz }
)(Quiz);
