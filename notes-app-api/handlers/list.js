import * as dynamoDb from "../libs/dynamodb-lib.js";
import { success, failure } from "../libs/response-lib.js";

export async function main(event, context) {
    const params = {
        Table: process.env.tableName,
        KeyConditionExpression: "userId=:userId",
        ExpressionAttributeValues: {
            ":userId": event.requestContext.identity.cognitoIdentityId
        }
    };

    try {
        const result = await dynamoDb.call("query", params);
        return success(result.Items);
    } catch(e) {
        return failure({ status: false });
    }
}