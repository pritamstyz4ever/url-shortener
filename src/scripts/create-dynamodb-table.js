const config = require('config');
const DynamoDb = require('aws-sdk/clients/dynamodb');

const dynamodb = new DynamoDb({
  region: 'us-east-1'
});

const schema = require('../config/dynamo-schema.json');
console.log(config.database)
schema.TableName = config.database.tableName;

/**
 * Check if the table name exists in the list of tables.
 *
 * @param {String} tableName
 * @param {String} listTables
 * @return {Boolean}
 */
function doesTableExist(tableName, listTables) {
  var tableExists = false;
  listTables.forEach(table => {
    if (table == tableName) {
      tableExists = true;
    }
  });
  return tableExists;
}

dynamodb.listTables((err, data) => {
  if (err) console.error(err, err.stack);
  else {
    if (!doesTableExist(config.database.tableName, data.TableNames)) {
      console.log('Creating the table ' + config.database.tableName + ' in DynamoDB');
      dynamodb.createTable(schema, function (err, data) {
        if (err) console.log(err, err.stack);
        else console.log(data);
      });
    } else {
      console.log('The table ' + config.database.tableName + ' already exists in DynamoDB');
    }
  }
});