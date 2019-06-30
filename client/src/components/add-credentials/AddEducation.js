import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextFieldAreaGroup from "../common/TextAreaFieldGroup";
import { addEducation } from "../../actions/profileActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class AddEducation extends Component {
  state = {
    school: "",
    degree: "",
    fieldOfStudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
    errors: {},
    disabled: false
  };

  onSubmit = e => {
    e.preventDefault();

    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldOfStudy: this.state.fieldOfStudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addEducation(eduData, this.props.history);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCheck = e => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp, etc that you have attended
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <TextFieldGroup
                    type="text"
                    placeholder="* School Or Bootcamp"
                    name="school"
                    value={this.state.school}
                    onChange={this.onChange}
                    error={errors.school}
                    required
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroup
                    type="text"
                    placeholder="* Degree Or Certificate"
                    name="degree"
                    value={this.state.degree}
                    onChange={this.onChange}
                    error={errors.degree}
                    required
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroup
                    type="text"
                    placeholder="Field Of Study"
                    name="fieldOfStudy"
                    value={this.state.fieldOfStudy}
                    onChange={this.onChange}
                    error={errors.fieldOfStudy}
                  />
                </div>
                <h6>From Date</h6>
                <div className="form-group">
                  <TextFieldGroup
                    type="date"
                    name="from"
                    value={this.state.from}
                    onChange={this.onChange}
                    error={errors.from}
                  />
                </div>
                <h6>To Date</h6>
                <div className="form-group">
                  <TextFieldGroup
                    type="date"
                    name="to"
                    value={this.state.to}
                    onChange={this.onChange}
                    disabled={this.state.disabled ? `disabled` : ""}
                    error={errors.to}
                  />
                </div>
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label className="form-check-label" htmlFor="current">
                    Current School
                  </label>
                </div>
                <div className="form-group">
                  <TextFieldAreaGroup
                    placeholder="Program Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                    error={errors.description}
                    info="Tell us about your experience and what you learned"
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
