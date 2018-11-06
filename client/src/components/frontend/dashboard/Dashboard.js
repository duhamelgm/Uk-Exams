import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../../actions/profileActions";
import Spinner from "../../common/Spinner";
import { Link } from "react-router-dom";
import { Card, CardDeck, CardBody, CardFooter } from "reactstrap";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged user has profile data
      if (Object.keys(profile).length > 0) {
        if (profile.coursesOwned.length > 0) {
          dashboardContent = profile.coursesOwned.map(
            (course, id) =>
              course.title ? (
                <div className="col-md-4 my-2" key={id}>
                  <Card>
                    <CardBody>
                      <h5 className="card-title">{course.title}</h5>
                      <p className="card-text">{course.smalldescription}</p>
                    </CardBody>

                    <CardFooter className="d-flex justify-content-between">
                      <Link
                        to={`courses/${course.handle}`}
                        className="btn btn-secondary"
                      >
                        Read More
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              ) : (
                ""
              )
          );
        } else {
          // User is logged in but has no courses owned
          dashboardContent = (
            <div>
              <p>Welcome {user.name}</p>
              <Link to="/profile-settings" className="btn btn-lg btn-info">
                Go
              </Link>
            </div>
          );
        }
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row my-4">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              <div className="row">{dashboardContent}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
