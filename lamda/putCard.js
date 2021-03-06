<<<<<<< HEAD
var AWS = require('aws-sdk');
var documentClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
const tableName = "Cards";
exports.handler = async (event) => {
    console.log("Received event:" + JSON.stringify(event,null,2));
    // TODO implement
    let response = "";
    try{
        const id = event.pathParameters.id;
        const body = JSON.parse(event.body);
        
        var params = {
            TableName: tableName,
            Key: { id : id },
            UpdateExpression: 'set #c = :c, #t = :t',
            //ConditionExpression: '#a < :MAX',
            ExpressionAttributeNames: {'#c': "category", "#t":"title"},
            ExpressionAttributeValues: {
              ':c' : body.category,
              ':t' : body.title,
              
            }
          };
        var documentClient = new AWS.DynamoDB.DocumentClient(); 
        await  documentClient.update(params).promise();
        response = {
            statusCode: 200,
           };
        return response
   }catch(exception) {
       console.log(exception);
       response = {
           statusCode: 500,
           body: JSON.stringify({"Message: ": exception })
       }
   }
    
=======
var AWS = require("aws-sdk");
var documentClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
});
const tableName = "Cards";
exports.handler = async (event) => {
  console.log("Received event:" + JSON.stringify(event, null, 2));
  // TODO implement
  let response = "";
  try {
    const id = event.pathParameters.id;
    const body = JSON.parse(event.body);

    var params = {
      TableName: tableName,
      Key: { id: id },
      UpdateExpression: "set #c = :c, #t = :t",
      //ConditionExpression: '#a < :MAX',
      ExpressionAttributeNames: { "#c": "category", "#t": "title" },
      ExpressionAttributeValues: {
        ":c": body.category,
        ":t": body.title,
      },
    };
    var documentClient = new AWS.DynamoDB.DocumentClient();
    await documentClient.update(params).promise();
    response = {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    return response;
  } catch (exception) {
    console.log(exception);
    response = {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ "Message: ": exception }),
    };
  }
>>>>>>> d4877e5de616ce524814abae8d34abb566cf657c
};
