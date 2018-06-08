'use strict';

const Dynamodb = require("aws-sdk/clients/dynamodb");
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
    shortHash: 'S',
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

const TABLE_NAME = config.database && config.database.tableName || 'Links';

function create(item) {
    console.log(item)
    return new Promise((resolve, reject) => {
        const now = moment().format();
        const params = {
            TableName: TABLE_NAME,
            Item: Object.assign({}, item, { createdDateTime: now }),
            ReturnConsumedCapacity: "TOTAL"
        }
        docClient.put(params).promise()
            .then((res) => {
                console.log(`Successfully inserted record ${item.hashId} to DynamoDB, capacity consumed ${res.ConsumedCapacity.CapacityUnits}`)
                console.log(res)
                resolve(item);
            })
            .catch((err) => {
                console.log(`Error occured while inserting to DynamoDb ${err}`, err);
                reject(err);
            })
    })
}

function getByHashKey(id) {
    var params = {
        TableName: 'Table',
        Key: {
            HashKey: 'hashkey'
        }
    };
    return documentClient.get(params).promise()
        .then((res) => {
            console.log(`Successfully fetched data from DynamoDB for id: ${id}`)
            return res
        })
        .catch((err) => {
            console.log(`Error occured while fetching data from DynamoDb ${err}`, err);
            throw err;
        })
}

function read(expression, value) {
    return new Promise((resolve, reject) => {
        let attribute = `:this_${expression}`
        let expressionAttributeValuesObj = { }
        console.log(value)
        expressionAttributeValuesObj[attribute] = value;
        const params = {
            TableName: TABLE_NAME,
            FilterExpression: `${expression} = ${attribute}`,
            ExpressionAttributeValues: expressionAttributeValuesObj
        }
        console.log(params)

        docClient.scan(params).promise()
            .then((res) => {
                console.log(`Successfully fetched data from DynamoDB for id: ${value}`)
                if (res.Count === 0) {
                    console.log('No record found');
                    resolve(undefined);
                } else {
                    console.log(res)
                    const response = res.Items[0];
                    resolve(response)
                }
            })
            .catch((err) => {
                console.log(`Error occured while fetching data from DynamoDb ${err}`, err);
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
    return docClient.query(params).promise()
        .then((res) => {
            console.log(res);
            return res;
        })
        .catch((err) => {
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

function deleteObj(item) {

}

module.exports.create = create;
module.exports.read = read;