'use strict';

const dal = require('../dal')
const Link = require('../models/Link')
const utils = require('../../utils')

module.exports = createShortUrl;

function createShortUrl(req, res, next) {
    let url = req.body.url;
    //utils.hashed(`hash-${uniqId}`),
    let hashedUrl = utils.hashed(url);
    dal.read('hashId', hashedUrl)
        .then((data) => {
            if (data) {
                //base58 encode
                return res.status(200).json({ Url: data.hash })
            } else {
                //create
                let uniqId = utils.getUniqId();
                let startDate = req.body.startDate || new Date();
                let endDate = req.body.endDate || startDate.addDays(10);

                let link = new Link(
                    hashedUrl,
                    url,
                    uniqId,
                    startDate,
                    endDate
                );

                dal.create(url)
                    .then((data) => {
                        let shortUrl = req.app.config.host + '/' + data.hash;
                        res.status(200).json({ Url: shortUrl })
                    })
            }
        })
        .catch((err) => {
            console.log('Error occured while shortening url', err)
            res.status(500).json({ Error: 'Internal Server Error' })
        })
}