const utils = require('../utils');
const dbOps = {};

/**
 * Authorize the header token.
 * @param req The http request.
 * @param res The http response.
 * @param User The user model.
 */
dbOps.getAll = (req, res, model) =>
  model.find()
    .then(a => res.json(a))
    .catch(err => res.status(400).send(utils.toolBox.parsErr(err)))

/**
 * Authorize the header token.
 * @param req The http request.
 * @param res The http response.
 * @param User The user model.
 */
dbOps.getById = (req, res, model) =>
  model.findById(req.params.id)
    .then(a => res.json(a))
    .catch(err => res.status(404).json({
      error: `${model.modelName}'s id not found `
    }));

/**
 * Authorize the header token.
 * @param req The http request.
 * @param res The http response.
 * @param User The user model.
 */
dbOps.getBy = (req, res, model) => {
  model.findOne({ [req.params.key]: req.body[req.params.key] })
    .then(el => {
        console.log(el);
      if (!el) return res.status(404).json({
          notFound: `${[req.params.key]} : ${req.body[req.params.key]}`
        });
      res.json(utils.toolBox.filtered(el._doc, ['password', '__v', 'createdAt', '_id'], false))
    })
    .catch(err => res.status(400).send(utils.toolBox.parsErr(err)))
}
/**
 * Authorize the header token.
 * @param req The http request.
 * @param res The http response.
 * @param User The user model.
 */
dbOps.createNew = (req, res, model) => {
  const newObj = new model(req.body);
  newObj.save().then(
    res.json({ ok: true })
  )
}

module.exports = dbOps;
