const bcrypt = require('bcryptjs');
const utils = require('../utils');
const userOps = {}

/**
 * Authorize middleware for jwt token.
 * @param req The http request.
 * @param res The http response.
 * @param User The user model.
 */
userOps.auth = (req, res, next) => utils.token.parseToken(req, res, () => next())

/**
 * Register the user in mogoDB.
 * @param req The http request.
 * @param res The http response.
 * @param User The user model.
 */
userOps.register = (req, res, User) => {
  utils.validRegister(req, res, ({ email, username, password }) => {
    User.findOne({ email })
      .then(user => {
        if (user) return res.status(400).json({email: 'This email is already registered'});

        const newUser = new User();
        newUser.email = email.toLowerCase();
        newUser.username = username;
        bcrypt.genSalt(10, (err, salt) => { //hash password
          bcrypt.hash(password, salt, (err, hash) => {
            newUser.avatar = `https://gravatar.com/avatar/${hash}?s=200&d=retro`;
            newUser.password = hash;
            newUser.save() //REGISTERED USER
              .then(u => res.json(u))
              .catch(err => res.status(400).send(utils.toolBox.parsErr(err)))
          });
        });
      })
      .catch(err => res.status(400).send(utils.toolBox.parsErr(err)))
  })
}

/**
 * login the user returning a Bearer jwt.
 * @param req The http request.
 * @param res The http response.
 * @param User The user model.
 */
userOps.login = (req, res, User) => {
  utils.validLogin(req, res, ({ email, password }) => {
    User.findOne({ email }).then(user => {
      if (!user) return res.status(404).json({ email: 'This email is not registered' });

      bcrypt.compare(password, user.password).then(isMatch => {
        // if (!isMatch) return res.status(400).json({ password: 'This password is incorrect' });

        const { id, email, username, avatar } = user;
        utils.token.newToken(res, { id, email, avatar, username });
      });
    })
      .catch(err => res.status(400).send(utils.toolBox.parsErr(err)))
  })
}

/**
 * Return the current active user header token.
 * @param req The http request.
 * @param res The http response.
 * @param User The user model.
 */
userOps.active = (req, res, User) => {
   utils.token.parseToken(req, res, () => {
    User.findById(req.user.id)
      .then(a => res.json(a))
      .catch(err => res.status(404).json({
        error: `User not found`
      }));
  });
}

module.exports = userOps;
