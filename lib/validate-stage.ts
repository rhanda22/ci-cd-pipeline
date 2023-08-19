import * as Cdk from 'aws-cdk-lib'; 
import { Construct } from 'constructs';
import { Services } from './service';

export class PipelineValidateStage extends Cdk.Stage{
    constructor(scope:Construct, stage:string, props?:Cdk.StageProps){
        super(scope,stage,props);

    
    }
}