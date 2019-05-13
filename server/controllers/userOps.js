const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const validRegister = require('../validation/register');
const validLogin = require('../validation/login');
const expiry = 3600 * 3;  //3hrs
const userOps = {}

userOps.register = (req, res, User) => {
  const { errors, isValid } = validRegister(req.body);
  if (!isValid) // if there are errors
    return res.status(400).json(errors);

  const { email, username, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (user)  //email already registered
        return res.status(400).json({
          email: 'This email is already registered'
        });

      const newUser = new User();
      newUser.email = email.toLowerCase();
      newUser.username = username;

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          newUser.avatar = gravatar(hash); //Avatar
          newUser.password = hash;
          newUser.save() //REGISTERED USER
            .then(u => res.json(u))
            .catch(err => res.status(400).send(parsErr(err)))
        });
      });
    })
    .catch(err => res.status(400).send(parsErr(err)))
}

userOps.login = (req, res, User) => {
  const { errors, isValid } = validLogin(req.body);
  if (!isValid) return res.status(400).json(errors);

  const { email, password } = req.body;

  User.findOne({email})
    .then(user => {
      if (!user) // user not found
        return res.status(404).json({ email: 'This email is not registered' });

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) // paswords do not match
            return res.status(400).json({ password: 'This password is incorrect' });

          const payload = {
            id: user.id,
            email: user.email,
            avatar: user.avatar,
            username: user.username,
          };

          // Create JWT sign token w/ payload
          jwt.sign(payload, keys.secret, { expiresIn: expiry },
            (err, token) => res.json({ token: 'Bearer ' + token })
          );
        });
    })
    .catch(err => res.status(400).send(parsErr(err)))
}









module.exports = userOps;

//HELPERS

function parsErr(errors) {
  const err = {};
  if (errors.hasOwnProperty("errors")) {
    for (const e in errors) {
      if (errors.hasOwnProperty(e))
        err[e] = errors[e].message;
    }
    return err;
  }

  if (errors.hasOwnProperty("errmsg"))
    return parse(errors.errmsg)

  return errors
}

function parse(err) { // parse duplicate key error
  const start = (err.indexOf('$') >= 0)
    ? err.indexOf('$') + 1 //mlab error
    : err.indexOf('x:') + 3; // mongo error
  const end = err.indexOf('_');
  const type = err.slice(start, end);
  // console.log(type);
  return { [type]: `That ${type} is already registered` };
}

function gravatar(hash, size) {
  // const style = '&d=robohash';
  const style = '&d=retro';
  if (!size) size = 200;
  return 'https://gravatar.com/avatar/' + hash + '?s=' + size + style;
};
