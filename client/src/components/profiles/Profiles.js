import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getProfiles } from "../../actions/profileActions";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = <h1>PROFILES HERE</h1>;
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>

              {profileItems}

              <div className="card card-body bg-light mb-3">
                <div className="row">
                  <div className="col-2">
                    <img
                      className="rounded-circle"
                      src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                      alt=""
                    />
                  </div>
                  <div className="col-lg-6 col-md-4 col-8">
                    <h3>John Doe</h3>
                    <p>Developer at Microsoft</p>
                    <p>Seattle, WA</p>
                    <a href="profile.html" className="btn btn-info">
                      View Profile
                    </a>
                  </div>
                  <div className="col-md-4 d-none d-lg-block">
                    <h4>Skill Set</h4>
                    <ul className="list-group">
                      <li className="list-group-item">
                        <i className="fa fa-check pr-1" />HTML
                      </li>
                      <li className="list-group-item">
                        <i className="fa fa-check pr-1" />CSS
                      </li>
                      <li className="list-group-item">
                        <i className="fa fa-check pr-1" />JavaScript
                      </li>
                      <li className="list-group-item">
                        <i className="fa fa-check pr-1" />Python
                      </li>
                      <li className="list-group-item">
                        <i className="fa fa-check pr-1" />C#
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="card card-body bg-light mb-3">
                <div className="row">
                  <div className="col-2">
                    <img
                      className="rounded-circle"
                      src="https://www.gravatar.com/avatar/anything?s=200&d=mm"
                      alt=""
                    />
                  </div>
                  <div className="col-lg-6 col-md-4 col-8">
                    <h3>John Doe</h3>
                    <p>Developer at Microsoft</p>
                    <p>Seattle, WA</p>
                    <a href="profile.html" className="btn btn-info">
                      View Profile
                    </a>
                  </div>
                  <div className="col-md-4 d-none d-lg-block">
                    <h4>Skill Set</h4>
                    <ul className="list-group">
                      <li className="list-group-item">
                        <i className="fa fa-check pr-1" />HTML
                      </li>
                      <li className="list-group-item">
                        <i className="fa fa-check pr-1" />CSS
                      </li>
                      <li className="list-group-item">
                        <i className="fa fa-check pr-1" />PHP
                      </li>
                      <li className="list-group-item">
                        <i className="fa fa-check pr-1" />MySQL
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
