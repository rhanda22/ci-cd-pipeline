#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CiCdPipelineStack } from '../lib/ci-cd-pipeline-stack';

const app = new cdk.App();
console.log('trigger a change');
new CiCdPipelineStack(app, 'CiCdPipelineStack','dev', {
   //env: { account: '276092530129', region: 'us-east-1' },

   

});

app.synth();