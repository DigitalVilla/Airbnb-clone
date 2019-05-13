const Validator = require('validator');
const util = require('./toolBox');

/**
 * This method validates the common registry process,
 * iF same validation can be used as an update
 */
module.exports = (req, res, next) => {
  const data = req.body;
  let errors = {};

  //FALLBACK EMPTY FIELDS
  const email = !util.isEmpty(data.email) ? data.email : '';
  const username = !util.isEmpty(data.username) ? data.username : '';
  const password = !util.isEmpty(data.password) ? data.password : '';
  const password2 = !util.isEmpty(data.password2) ? data.password2 : '';

  if (email && !Validator.isEmail(email))
    errors.email = 'Enter a valid email';

  if (email && !Validator.isLength(email, { min: 1, max: 60 }))
    errors.email = 'Email must be less than 60 characters';

  if (username && !Validator.isLength(username, { min: 4, max: 20 }))
    errors.username = 'Username must be between 4 and 20 characters';

  if (password && !Validator.isLength(password, { min: 6, max: 32 }))
    errors.password = 'Password must be between 6 and 32 characters';

  if (!username)
    errors.username = 'Enter a unique username';

  if (!email)
    errors.email = 'Enter a valid email';

  if (!password)
    errors.password = 'Enter a strong password';

  if (!password2)
    errors.password2 = 'Retype your password';

  if (password !== password2)
    errors.password2 = 'Both passwords must match';

  if (!util.isEmpty(errors))
    return res.status(422).json(errors);

  next(data)
};