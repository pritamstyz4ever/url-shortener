'use strict';

const base58 = require("base58")
const crypto = require("crypto")
const url = require('url')
const randomBytes = crypto.randomBytes;


module.exports.getUniqId = getUniqId;
module.exports.encode = encode;
module.exports.decode = decode;
module.exports.hashed = hashed;

function randomByte() {
    return randomBytes(1)[0] & 0x30;
}

module.exports = randomByte;
function md5(item) {
    return crypto.createHash('md5').update(item).digest('hex');
}

function hashed(item) {
    return md5(item);
}

function encode(val) {
    return base58.encode(val);
}

function decode(val) {
    return base58.decode(val);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

//check if you want to use some lib???
function getUniqId() {
    let uiqId = encode(getRandomInt(9999, 999999) + randomByte().toString())
    return uiqId;
}

function isValidUrl(reqUrl, domain, configHost) {
    //standard Url validation regex
    const regexp = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    if (!regexp.test(reqUrl)) {
        return false;
    }
    // domain check
    if (domain) {
        if (url.parse(configHost).hostname === url.parse(reqUrl).hostname) {
           return false
        }
    }
    return true;
}


// let hash = hashed("url-https://jobs.cisco.com/jobs/SearchJobs/?3_19_3=163&3_12_3=187");
// console.log(hash)
// let enc = getUniqId();
// console.log(decode(enc))
// console.log(enc)
// console.log(hashed('hash-9p2LY'))