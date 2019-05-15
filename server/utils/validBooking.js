const validator = require('validator');
const util = require('./toolBox');

module.exports = (req, res, next) => {
    let errors = {};
    const data = !util.isEmpty(req.body) ? req.body : '';
    if (!data) return res.status(422).json({ error: "Empty object" });

    let startAt = !util.isEmpty(data.startAt) ? data.startAt : '';
    let endAt = !util.isEmpty(data.endAt) ? data.endAt : '';

    if (!startAt || !util.isDate(endAt) || !validator.isLength(startAt, { min: 8, max: 10 })) {
        errors.startAt = 'Start date must be in ISO 8601 format: YYYY-MM-DD';
    } else {
        startAt = new Date(data.startAt);
        if (startAt > endAt)
            errors.endAt = 'Start date must be before or exactly on the end date';
    }

    if (!endAt || !util.isDate(endAt) || !validator.isLength(endAt, { min: 8, max: 10 })) {
        errors.endAt = 'End date must be in ISO 8601 format: YYYY-MM-DD';
    } else {
        endAt = new Date(data.endAt)
        if (startAt < util.today(false))
            errors.startAt = 'Start date cannot be before today';
    }

    const totalPrice =  !util.isEmpty(data.totalPrice) ? data.totalPrice : '';
    const rental =  !util.isEmpty(data.rental) ? data.rental : '';
    const guests =  !util.isEmpty(data.guests) ? data.guests : '';
    const days = !util.isEmpty(data.days) ? data.days : '';

    if (!validator.isNumeric(totalPrice))
        errors.totalPrice = 'Enter a valid total without symbols';

    if (!validator.isNumeric(guests))
        errors.guests = 'Enter a valid number of  guests';

    if (!validator.isNumeric(days))
        errors.days = 'Enter a valid number of days';

    if (!util.isEmpty(errors))
        return res.status(422).json(errors);

    next(data)
};