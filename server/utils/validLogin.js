const Validator = require('validator');
const util = require('./toolBox');

module.exports = function (req, res, next) {
  const data = req.body;
  let errors = {};

  //FALLBACK EMPTY FIELDS
  const email = !util.isEmpty(data.email) ? data.email : '';
  const password = !util.isEmpty(data.password) ? data.password : '';

  if (email && !Validator.isEmail(email))
    errors.email = 'Enter a valid email to log in';

  if (!email)
    errors.email = 'Enter your account\'s email to log in';

  if (!password)
    errors.password = 'Enter your account\'s password to log in';

  if (!util.isEmpty(errors))
    return res.status(422).json(errors);

  next(data);
};