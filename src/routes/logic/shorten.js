'use strict';

import { DocumentClient } from "aws-sdk/client/dynamodb";

const docClient = new DocumentClient({
    region : 'us-east-1'
});


function shortenUrl(longUrl, startDate, endDate) {
    
}