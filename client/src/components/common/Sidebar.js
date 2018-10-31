import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Sidebar = ({ handle }) => (
  <div class="col-md-4">
    <div class="card my-4">
      <h5 class="card-header">Start practicing</h5>
      <div class="card-body">
        <Link to={`${handle}/quiz`}>Go</Link>
      </div>
    </div>

    <div class="card my-4">
      <h5 class="card-header">Search</h5>
      <div class="card-body">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Search for..." />
          <span class="input-group-btn">
            <button class="btn btn-secondary" type="button">
              Go!
            </button>
          </span>
        </div>
      </div>
    </div>

    <div class="card my-3">
      <h5 class="card-header">Categories</h5>
      <div class="card-body">
        <div class="row">
          <div class="col-lg-6">
            <ul class="list-unstyled mb-0">
              <li>
                <a href="#">Simba</a>
              </li>
              <li>
                <a href="#">Nyati</a>
              </li>
              <li>
                <a href="#">Faru</a>
              </li>
            </ul>
          </div>
          <div class="col-lg-6">
            <ul class="list-unstyled mb-0">
              <li>
                <a href="#">Kiboko</a>
              </li>
              <li>
                <a href="#">Fisi</a>
              </li>
              <li>
                <a href="#">Pundamlia</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="card my-4">
      <h5 class="card-header">maelezo</h5>
      <div class="card-body">
        You can put anything you want inside of these side widgets. They are
        easy to use, and feature the new Bootstrap 4 card containers!
      </div>
    </div>
  </div>
);

export default connect(null)(Sidebar);
