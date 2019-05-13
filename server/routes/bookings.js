const router = require('express').Router();
const db = require('../controllers/dbOps');
const mod = require('../models/Booking');
const user = require('../controllers/userOps');

// @route   GET api/bookings/
// @desc    Return all rental listings
router.get('/', user.auth, (rq, rs) => db.getAll(rq, rs, mod));

// @route   GET api/bookings/:id
// @desc    Return a rental listing by id
router.get('/id/:id',  user.auth, (rq, rs) => db.getById(rq, rs, mod));

// @route   GET api/bookings/:paramaeter
// @desc    Return all rental that match x parameter
router.get('/by/:key', user.auth,  (rq, rs) => db.getBy(rq, rs, mod));

// @route   GET api/bookings/:paramaeter
// @desc    Return all rental that match x parameter
router.post('/new/', user.auth,  (rq, rs) => db.createNew(rq, rs, mod));



module.exports = router;