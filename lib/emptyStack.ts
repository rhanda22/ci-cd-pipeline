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




export class EmptyStack extends Cdk.Stack{

    
    public readonly subscribeMicroservice: Function;
    
    constructor(scope:Construct, id:string,props: ServiceProps){
        super(scope,id)

 
    }
   
}