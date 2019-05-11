const dbOps = {};

// GET METHODS

dbOps.getAll = (req, res, model) => model.find()
  .then(a => res.json(a))
  .catch(err => res.status(404).json({
    error: err.message
  }));

dbOps.getById = (req, res, model) =>
  model.findById(req.params.id)
  .then(a => res.json(a))
  .catch(err => res.status(404).json({
    error: `${model.modelName}'s id not found `
  }));

module.exports = dbOps;