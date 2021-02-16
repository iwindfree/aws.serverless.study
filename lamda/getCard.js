var AWS = require('aws-sdk');
var documentClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
const tableName = "Cards";
exports.handler = async (event) => {
    console.log("Received event:" + JSON.stringify(event,null,2));
    // TODO implement
    let response = "";
    try{
        var params = {
            TableName : tableName,
        };
        
        var documentClient = new AWS.DynamoDB.DocumentClient();
      
        const cards = await documentClient.scan(params).promise();
   }catch(exception) {
       console.log(exception);
       response = {
           statusCode: 500,
           body: JSON.stringify({"Message: ": exception })
       }
   }
   response = {
    statusCode: 200,
    body: JSON.stringify(cards),
   };
   return response
};
