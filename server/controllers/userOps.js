const bcrypt = require('bcryptjs');
const validRegister = require('../validation/register');

const userOps = {}

userOps.register = (req, res, User) => {
  const { errors, isValid } = validRegister(req.body);
  if (!isValid) return res.status(400).json(errors);

  const { email, username, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (user)  //email already registered
        return res.status(400).json({
          email: 'This email is already registered'
        });

      //REGISTERED USER
      const newUser = new User();
      newUser.email = email.toLowerCase();
      newUser.username = username;
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save()
          .then(u => res.json({ ok: true }))
          .catch(err => res.status(400).json(parse(err.errmsg)))
      });
    })
    .catch(err => res.status(400).json(err.errmsg))
}


module.exports = userOps;

//HELPERS

function parse(err) { // parse duplicate key error
  if (!err) return 'Please enter a valid input';
  const start = (err.indexOf('$') >= 0)
    ? err.indexOf('$') + 1 //mlab error
    : err.indexOf('x:') + 3; // local mongo error
  const end = err.indexOf('_');
  const type = err.slice(start, end);
  // console.log(type);
  return { [type]: `That ${type} is already registered` };
}

const gravatar = function (email, size) {
  return '';
  // '&d=robohash':
  const style = '&d=retro';
  if (!size) size = 200;
  var md5 = crypto.createHash('md5').update(email).digest('hex');
  return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + style;
};
