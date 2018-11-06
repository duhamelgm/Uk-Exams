import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCourses } from "../../../actions/courseActions";
import PropTypes from "prop-types";

class Courses extends Component {
  componentDidMount() {
    this.props.getCourses();
  }

  render() {
    const { courses } = this.props.course;
    let coursesList = "Loading";

    if (courses) {
      coursesList = courses.map((course, id) => (
        <tr key={id}>
          <td>{id + 1}</td>
          <td>{course.title}</td>
          <td>{course.handle}</td>
          <td>
            <Link to={"courses/" + course.handle}>Go</Link>
          </td>
        </tr>
      ));
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <h1 className="my-4">Here will be the courses</h1>
          <Link to="/courses/add-course">
            <button className="btn btn-info">Add one</button>
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Handle</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>{coursesList}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

Courses.propTypes = {
  getCourses: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  course: state.course,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getCourses }
)(Courses);
