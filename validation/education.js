const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateEducationInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : " ";
  data.degree = !isEmpty(data.degree) ? data.degree : " ";
  data.fieldOfStudy = !isEmpty(data.fieldOffStudy) ? data.fieldOffStudy : " ";
  data.from = !isEmpty(data.from) ? data.from : " ";

  if (Validator.isEmpty(data.school)) {
    errors.school = "School is required";
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Degree is required";
  }

  if (!Validator.isEmail(data.from)) {
    errors.from = "From date field is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  if ((!Validator.isLength(data.password), { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Password is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Password doesn't match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
