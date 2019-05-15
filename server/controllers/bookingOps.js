const Booking = require('../models/Booking');
const Rental = require('../models/Rental');
const utils = require('../utils');

const bookOps = {};

bookOps.newBooking = (req, res) => {
    utils.validBooking(req, res, (data) => {
        Rental.findById(data.rentalId)
            .populate('bookings')
            .populate('user')
            .exec((err, rental) => {
                if (err)
                    return res.status(422).json(utils.toolBox.parsErr(err));
                if (rental.user.id === req.user.id)
                    res.status(422).json({ error: 'Cannot book your own rental' });
            })
    })
}




module.exports = bookOps;