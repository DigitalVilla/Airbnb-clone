const router = require('express').Router();
const db = require('../../controllers/dbOps');
const mod = require('../../models/Rental');

// @route   GET api/rentals/
// @desc    Return all rental listings
router.get('/', (rq, rs) => db.getAll(rq, rs, mod));

// @route   GET api/rentals/:id
// @desc    Return a rental listing by id
router.get('/:id', (rq, rs) => db.getById(rq, rs, mod));

// @route   GET api/rentals/:paramaeter
// @desc    Return all rental that match x parameter
router.get('/by/:key', (rq, rs) => db.getBy(rq, rs, mod));



module.exports = router;