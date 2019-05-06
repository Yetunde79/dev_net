import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import classnames from "classnames";

import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    const { name, email, password, password2 } = this.state;

    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
      password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { name, email, password, password2, errors } = this.state;
    const { user } = this.props.auth;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>

              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={this.onChange}
                  name="email"
                  error={errors.email}
                  info="This site uses Gravatar so if you want a profile image, use
                    a Gravatar email"
                />
                <TextFieldGroup
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.onChange}
                  name="password"
                  error={errors.password}
                />
                <TextFieldGroup
                  type="password"
                  placeholder="Confirm Password"
                  value={password2}
                  onChange={this.onChange}
                  name="password2"
                  error={errors.password2}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStatetoProps,
  { registerUser }
)(withRouter(Register));
