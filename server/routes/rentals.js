const router = require('express').Router();



// Load models
const Rental = require('../models/rental');


// @route   GET api/rentals/test
// @desc    Get all rental listings
// @access  Public
router.get('/', (req, res) => {
  Rental.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({
      noposts: 'No posts found'
    }));
});


module.exports = router;