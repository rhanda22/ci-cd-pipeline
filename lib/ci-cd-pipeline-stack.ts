import * as cdk from 'aws-cdk-lib';
import { Pipeline } from 'aws-cdk-lib/aws-codepipeline';
import { CodeBuildStep, CodePipeline,CodePipelineSource, ManualApprovalStep, ShellStep, Step } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { PipelineAppStage } from './stage';
import { PipelineValidateStage } from './validate-stage';
import { CodeBuildAction } from 'aws-cdk-lib/aws-codepipeline-actions';
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
    
    

    const valid = pipeline.addStage(new PipelineValidateStage(this,"Validate",{
    }));

    valid.addPre(new CodeBuildStep('Unit-test',{
      commands:['npm ci', 'npm test']}));

    valid.addPost(new CodeBuildStep('Sonarqube',{
        commands:['npm ci', 'npm run coverage']}));
    
    
    const secure = pipeline.addStage(new PipelineValidateStage(this,"Secure",{
    }));

    secure.addPre(new CodeBuildStep('SAST',{
      commands:['npm ci', 'npm test']}));

    secure.addPost(new CodeBuildStep('DAST',{
        commands:['npm ci', 'npm test']}));
        
        
  


    const testStage = pipeline.addStage(new PipelineAppStage(this,"nonProd",{
    }));


    
    testStage.addPre(new CodeBuildStep('Integration Test',{
      commands:['npm ci', 'npm test']
    }));

    testStage.addPost(new ManualApprovalStep('Manual Approval to production'));
    const prodStage = pipeline.addStage(new PipelineAppStage(this,"prod",{}));
    
  }
}
