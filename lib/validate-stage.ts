import * as Cdk from 'aws-cdk-lib'; 
import { Construct } from 'constructs';
import { Services } from './service';
import { EmptyStack } from './emptyStack';

export class PipelineValidateStage extends Cdk.Stage{
    constructor(scope:Construct, stage:string, props?:Cdk.StageProps){
        super(scope,stage,props);

        new EmptyStack(this,'validate',{name:'test',path:'test',environment:stage})
    }
}