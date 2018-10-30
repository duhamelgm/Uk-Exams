import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "../common/PrivateRoute";

import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./dashboard/Dashboard";
import ProfileSettings from "./dashboard/ProfileSettings";
import SingleCourse from "./courses/SingleCourse";

export default class Frontend extends Component {
  render() {
    return (
      <div>
        <Router basename="/">
          <div className="front-end">
            <Navbar />
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
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}
