const validRegister = require('./validRegister')
const validLogin = require('./validLogin')
const toolBox = require('./toolBox')
const token = require('./token')

module.exports = {
  token,
  toolBox,
  validLogin,
  validRegister
};