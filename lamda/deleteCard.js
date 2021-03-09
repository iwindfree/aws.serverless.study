var AWS = require('aws-sdk');
var documentClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
const tableName = "Cards";
exports.handler = async (event) => {
    console.log("Received event:" + JSON.stringify(event,null,2));
    // TODO implement
    let response = "";
    try{
        const id = event.pathParameters.id;
        var params = {
            TableName : tableName,
            Key: {
              "id": id,
            }
          };
          
        var documentClient = new AWS.DynamoDB.DocumentClient(); 
        await  documentClient.delete(params).promise();
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
    
};
