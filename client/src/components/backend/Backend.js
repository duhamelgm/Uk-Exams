import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "../common/PrivateRoute";

import Navbar from "./layout/Navbar";
import Sidebar from "./layout/Sidebar";

import Dashboard from "./dashboard/Dashboard";
import Courses from "./courses/Courses";
import EditCourse from "./courses/EditCourse";

export default class Backend extends Component {
  render() {
    return (
      <div>
        <Router basename="/admin">
          <div className="back-end">
            <Navbar />
            <div className="container-fluid">
              <div className="row flex-nowrap">
                <Sidebar />
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/courses" component={Courses} />
                <Switch>
                  <Route
                    exact
                    path="/courses/add-course"
                    component={EditCourse}
                  />
                  <Route exact path="/courses/:handle" component={EditCourse} />
                </Switch>
              </div>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}
