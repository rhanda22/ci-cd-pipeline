import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { join } from "path";
import { Function, Code } from "aws-cdk-lib/aws-lambda";
import { handler } from "../lambda/handler";
import * as path from 'path';
import * as Cdk from 'aws-cdk-lib';

interface ServiceProps{
    name: string,
    path: string,
    environment: any
}

interface PocServiceProps{
    stage:string
}



export class Services extends Cdk.Stack{

    
    public readonly subscribeMicroservice: Function;
    
    constructor(scope:Construct, id:string,props: PocServiceProps){
        super(scope,id)

        new Function(this,'subscribeLambdaFunction',{
          runtime: Runtime.NODEJS_14_X,
          handler:'handler.handler',
          code: Code.fromAsset(path.join(__dirname,'../lambda')),
          environment:{'stage':props.stage}
        });
 
    }

    

   
}