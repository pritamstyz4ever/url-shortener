'use strict';

const dal = require('../dal')
const Link = require('../models/Link')
const utils = require('../../utils')
const moment = require('moment');
const config = require('config');

module.exports = createShortUrl;

function createShortUrl(req, res, next) {
    let url = req.body.link;
    //utils.hashed(`hash-${uniqId}`),
    let hashedUrl = utils.hashed(url);
    dal.read('hashId', hashedUrl)
        .then((data) => {
            if (data) {
                //base58 encode
                return data;
            } else {
                //create
                let uniqId = utils.getUniqId();
                let startDate = req.body.startDate || moment().format();
                let endDate = req.body.endDate || moment(startDate).add(10, 'days').format();//expiring in 10 days

                let link = new Link(
                    hashedUrl,
                    url,
                    uniqId,
                    startDate,
                    endDate
                );

                return dal.create(link);
            }
        })
        .then((data) => {
            let shortUrl = config.host + '/' + data.shortHash;
            return res.status(200).json(Object.assign({}, data, { shortUrl }))
        })
        .catch((err) => {
            console.log('Error occured while shortening url', err)
            res.status(500).json({ Error: 'Internal Server Error' })
        })
}