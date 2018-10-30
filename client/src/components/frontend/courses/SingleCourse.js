import React, { Component } from "react";
import { getCourse } from "../../../actions/courseActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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
      this.setState({
        course: this.props.course.course
      });
    }
  }

  render() {
    let course = this.state.course;

    if (Object.keys(course).length > 0) {
      course = <h1>Course {course.title}</h1>;
    } else {
      course = "cargando...";
    }

    return (
      <div>
        <h1>Course Page</h1>
        {course}
      </div>
    );
  }
}

SingleCourse.propTypes = {
  getCourse: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired
};

const mapStateToProptypes = state => ({
  course: state.course
});

export default connect(
  mapStateToProptypes,
  { getCourse }
)(SingleCourse);
