'use strict';

const dal = require('../dal')
const Link = require('../models/Link')
const utils = require('../../utils')

module.exports = redirect;

function redirect(req, res, next) {
    let id = req.params.encodedid;
    return dal.read('shortHash', id)
        .then((link) => {
            if (link) {
                console.log(link)
                let startDate = link.startDate;
                let endDate = link.endDate || null;
                let currentDate = new Date();
                if (endDate && endDate < currentDate) {
                    res.status(200).json({ Error: 'Url Expired' })
                } else {
                    console.log(link)
                    res.status(200).json(link);
                    //redirect -->> 
                    //res.status(301).redirect(link.url);
                }
            } else {
                res.status(201).json({})
                //res.status(301).redirect(req.app.config.host)
            }
        })
        .catch((err) => {
            console.log('Error occured while getting url', err);
            next(err)
        })
}