import * as AWS from 'aws-sdk';
import { QueryInput } from 'aws-sdk/clients/dynamodb';

AWS.config.update({region: 'us-east-1'});

export class DbContext
{
    protected client: AWS.DynamoDB.DocumentClient;

    constructor()
    {
        this.client = new AWS.DynamoDB.DocumentClient();
    }
    query<T>(params:QueryInput):Promise<T[]>
    {
        return this.client.scan(params).promise().then((result:any)=>
        {
            let items = result.Items || [];
            return items;
        });
    }
    put(tableName:string, obj:any)
    {
        return this.client.put({
            TableName: tableName,
            Item: obj
        }).promise();
    }
}