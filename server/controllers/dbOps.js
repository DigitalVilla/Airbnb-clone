const u = require('../validation/utils');
const dbOps = {};

// GET METHODS
dbOps.getAll = (req, res, model) => model.find()
  .then(a => res.json(a))
  .catch(err => res.status(404).json({ err }));

dbOps.getById = (req, res, model) =>
  model.findById(req.params.id)
    .then(a => res.json(a))
    .catch(err => res.status(404).json({
      error: `${model.modelName}'s id not found `
    }));

dbOps.getBy = (req, res, model) => {
  model.findOne({ [req.params.key]: req.body[req.params.key] })
    .then(el => {
      if (!el) // user not found
        return res.status(404).json({
          error: `${[req.params.key]} : ${req.body[req.params.key]}`
        });
      res.json(u.filtered(el, (key) => { //sanitize data
        if (key !== "password" && key !== '__v' && key !== 'rentals')
          return key
      }))
    })
    .catch(err => res.status(404).json({ err }));
}

module.exports = dbOps;
