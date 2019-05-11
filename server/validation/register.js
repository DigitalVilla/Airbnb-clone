const Validator = require('validator');
const isEmpty = require('./is-empty');

/**
 * This method validates the common registry process,
 * iF same validation can be used as an update
 */
module.exports = (data, update) => {
  let errors = {};

  if (!data || isEmpty(data)) {
    errors.object = 'Object is empty';
    return {
      errors,
      isValid: false
    }
  }

  //FALLBACK EMPTY FIELDS
  data.email = !isEmpty(data.email) ? data.email : '';
  data.username = !isEmpty(data.username) ? data.username : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (data.email && !Validator.isEmail(data.email))
    errors.email = 'Enter a valid email';

  if (data.email && !Validator.isLength(data.email, { min: 1, max: 60 }))
    errors.email = 'Email must be less than 60 characters';

  if (data.username && !Validator.isLength(data.username, { min: 4, max: 20 }))
    errors.username = 'Username must be between 4 and 20 characters';

  if (data.password && !Validator.isLength(data.password, { min: 6, max: 32 }))
    errors.password = 'Password must be between 6 and 32 characters';

  if (!update) { //skip validation
    if (Validator.isEmpty(data.username))
      errors.username = 'Enter a unique username';

    if (Validator.isEmpty(data.email))
      errors.email = 'Enter a valid email';

    if (Validator.isEmpty(data.password))
      errors.password = 'Enter a strong password';

    if (Validator.isEmpty(data.password2))
      errors.password2 = 'Both passwords must match';

    if (!Validator.equals(data.password, data.password2))
      errors.password2 = 'Both passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};