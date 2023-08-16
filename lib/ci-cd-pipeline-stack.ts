import * as cdk from 'aws-cdk-lib';
import { Pipeline } from 'aws-cdk-lib/aws-codepipeline';
import { CodeBuildStep, CodePipeline,CodePipelineSource, ManualApprovalStep, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { PipelineAppStage } from './stage';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CiCdPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string,stage:string, props?: cdk.StackProps) {
    super(scope, id, props);

     const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'DemoPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('rhanda22/ci-cd-pipeline', 'main'),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })
    });
    
    const testStage = new PipelineAppStage(this,"nonProd",{});


    const tsd = pipeline.addStage(testStage);
    tsd.addPre(new CodeBuildStep('unit-test',{
      commands:['npm ci', 'npm test']
    }))
    tsd.addPost(new ManualApprovalStep('Manual Approval to production'));
    const prodStage = pipeline.addStage(new PipelineAppStage(this,"prod",{}));
    

  }
}