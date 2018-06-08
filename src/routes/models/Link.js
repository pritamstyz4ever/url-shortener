'use strict';

class Link {
    constructor(id, url, hash, startDate, endDate) {
            this.hashId = id,
            this.url = url,
            this.shortHash = hash,
            this.startDate = startDate,
            this.endDate = endDate
    }
}

module.exports = Link;