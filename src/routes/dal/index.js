'use strict';

const Dynamodb = require("aws-sdk/client/dynamodb");
const moment = require('moment');
const Link = require('../models/Link')
const config = require('config');
//const LRU = require("lru-cache")

/**
 * Dynamo Model for reference => using document client will avoid the notion of attribute values 
 */
var dynamoModel = {
    startDate: 'S',
    endDate: 'S',
    hashId: 'S',
    hits: 'N',
    hash: 'S',
    url: 'S',
    createdDateTime: 'S'
};

/**
 * Local cache.
 */
// class Cache {
//     constructor() {
//         this.memory = LRU({
//             max: 500,
//             maxAge: 1000 * 60 * 60
//         });
//     }
//     get(id) {
//         return this.memory.get(id);
//     }
//     set(id, data) {
//         this.memory.set(id, data);
//     }
//     reset() {
//         this.memory.reset();
//     }
// }

const docClient = new Dynamodb.DocumentClient({
    region: 'us-east-1'
});

const TABLE_NAME = config.database.tableName;

function create(item) {
    return new Promise((resolve, reject) => {
        const id = uuid.v4();
        const now = moment().format();
        const params = {
            TableName: TABLE_NAME,
            Item: {
                ...item,
                createdDateTime: now
            },
            ReturnConsumedCapacity: "TOTAL"
        }
        docClient.put(params).promise()
            .then((res) => {
                log.logInfo(`Successfully inserted record ${id} to DynamoDB, capacity consumed ${res.ConsumedCapacity.CapacityUnits}`, req)
                resolve({
                    id: id,
                    createdDateTime: now
                });
            })
            .catch((err) => {
                log.logError(`Error occured while inserting to DynamoDb ${err}`, req, err);
                reject(err);
            })
    })
}

function read(expression, value) {
    return new Promise((resolve, reject) => {
        let attribute = `:this_${expression}`
        const params = {
            TableName: TABLE_NAME,
            FilterExpression: `${expression} = ${attribute}`,
            ExpressionAttributeValues: { attribute: value }
        }

        docClient.scan(params).promise()
            .then((res) => {
                log.logInfo(`Successfully fetched data from DynamoDB for id: ${item}`, req)
                const response = res.Items.map(item => {
                    return new Link(...item);
                }).sort((s, b) => b.createdDateTime > s.createdDateTime);

                resolve(response)
            })
            .catch((err) => {
                log.logError(`Error occured while fetching data from DynamoDb ${err}`, req, err);
                reject(err);
            })
    });
}

function queryByHashKey(column, value) {
    let params = {
        TableName: TABLE_NAME,
        KeyConditionExpression: `${column}=:value`,
        ExpressionAttributeValues: {
            ":value": value
        }
    }
    return docClient.query(params).promise().catch((err) => {
        console.log("error", `error to query table : ${TABLE_NAME}, with params: ${column} = ${value} `, err.message);
        return Promise.reject(err);
    });
}


function update(item) {
    let params = {
        TableName: TABLE_NAME,
        Key: keys,
        UpdateExpression: expession,
        ExpressionAttributeValues: expressionValues,
        ReturnValues: "UPDATED_NEW"
    };
    return docClient.update(params).promise().catch(e => {
        console.log("error", `error to update table : ${tableName}, with params: keys = ${keys}, expression = ${expession}, expressionValues: = ${expressionValues} `, e.message);
    });
}
}

function deleteObj(item) {

}

module.exports.create = create;
module.exports.read = read;