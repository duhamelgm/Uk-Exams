import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "../common/PrivateRoute";

import FrontendNavbar from "./layout/FrontendNavbar";
import Footer from "./layout/Footer";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./dashboard/Dashboard";
import ProfileSettings from "./dashboard/ProfileSettings";
import SingleCourse from "./courses/SingleCourse";
import Exam from "./courses/Exam";
import Checkout from "./courses/Checkout";

export default class Frontend extends Component {
  render() {
    return (
      <div>
        <Router basename="/">
          <div className="front-end">
            <FrontendNavbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/profile-settings"
                component={ProfileSettings}
              />
            </Switch>
            <Route exact path="/courses/:handle" component={SingleCourse} />
            <Route
              exact
              path="/courses/:handle/checkout/:planID"
              component={Checkout}
            />
            <Route exact path="/courses/:handle/exam" component={Exam} />
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}
