import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getGithubRepos } from "../../actions/profileActions";

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);

  return (
    <div className="profile-github">
      <h3 className="mb-4">Latest Github Repos</h3>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map(repo => (
          <div key={repo.id} className="card card-body mb-2">
            <div className="row">
              <div className="col-md-6">
                <h4>
                  <Link
                    to={repo.html_url}
                    className="text-info"
                    target="_blank"
                  >
                    {repo.name}
                  </Link>
                </h4>
                <p>{repo.description}</p>
              </div>
              <div className="col-md-6">
                <span className="badge badge-info mr-1">
                  Stars: {repo.stargazers_count}
                </span>
                <span className="badge badge-secondary mr-1">
                  Watchers: {repo.watchers_count}
                </span>
                <span className="badge badge-success">
                  Forks: {repo.forks_count}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  repos: state.profile.repos
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
