const Validator = require('validator');
const u = require('./utils');

module.exports = function validateLoginInput(data) {
  let errors = {};

  //FALLBACK EMPTY FIELDS
  const email = !u.isEmpty(data.email) ? data.email : '';
  const password = !u.isEmpty(data.password) ? data.password : '';

  if (email && !Validator.isEmail(email))
    errors.email = 'Enter a valid email to log in';

  if (!email)
    errors.email = 'Enter your account\'s email to log in';

  if (!password)
    errors.password = 'Enter your account\'s password to log in';

  return {
    errors,
    isValid: u.isEmpty(errors)
  };
};