'use strict';

const dal = require('../dal')
const Link = require('../models/Link')
const utils = require('../../utils')

module.exports = redirect;

function redirect(req, res, next) {
    let id = req.params.encodedid;
    return dal.read('hash', id)
        .then((link) => {
            if (link) {
                startDate = link.startDate;
                endDate = link.endDate || 0;
                currentDate = new Date();
                if (endDate && endDate < currentDate) {
                    res.status(200).json({ Error: 'Url Expired' })
                } else {
                    res.status(301).redirect(link.url);
                }
            } else {
                res.status(301).redirect(req.app.config.host)
            }
        })
        .catch((err) => {
            console.log('Error occured while getting url', err);
            next(err)
        })
}