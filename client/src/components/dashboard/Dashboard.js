import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user, auth } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile == null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //check if user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = <h4>Profile Display</h4>;
      } else {
        //user is logged in and has no profile
        dashboardContent = (
          <div>
            <p className="lead texr-muted">Welcome {user.name}</p>
            <p>
              You have not yet set up a profile, please add some information
            </p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div class="dashboard">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h1 class="display-4">Dashboard</h1>
              {dashboardContent}
              <p class="lead text-muted">Welcome John Doe</p>
              <div class="btn-group mb-4" role="group">
                <a href="edit-profile.html" class="btn btn-light">
                  <i class="fas fa-user-circle text-info mr-1" /> Edit Profile
                </a>
                <a href="add-experience.html" class="btn btn-light">
                  <i class="fab fa-black-tie text-info mr-1" />
                  Add Experience
                </a>
                <a href="add-education.html" class="btn btn-light">
                  <i class="fas fa-graduation-cap text-info mr-1" />
                  Add Education
                </a>
              </div>

              <div>
                <h4 class="mb-2">Experience Credentials</h4>
                <table class="table">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Title</th>
                      <th>Years</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Tech Guy Web Solutions</td>
                      <td>Senior Developer</td>
                      <td>02-03-2009 - 01-02-2014</td>
                      <td>
                        <button class="btn btn-danger">Delete</button>
                      </td>
                    </tr>
                    <tr>
                      <td>Traversy Media</td>
                      <td>Instructor & Developer</td>
                      <td>02-03-2015 - Now</td>
                      <td>
                        <button class="btn btn-danger">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h4 class="mb-2">Education Credentials</h4>
                <table class="table">
                  <thead>
                    <tr>
                      <th>School</th>
                      <th>Degree</th>
                      <th>Years</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Northern Essex</td>
                      <td>Associates</td>
                      <td>02-03-2007 - 01-02-2009</td>
                      <td>
                        <button class="btn btn-danger">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <button class="btn btn-danger">Delete My Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);