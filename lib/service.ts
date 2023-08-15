import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";


interface ServiceProps{
    name: string,
    path: string,
    environment: any
}

interface PocServiceProps{
    stage:string
}



export class Services extends Construct{

    public readonly productMicroservice: NodejsFunction;
    public readonly subscribeMicroservice: NodejsFunction;
    public readonly roleMicroservice: NodejsFunction;

    constructor(scope:Construct, id:string, props: PocServiceProps){
        super(scope,id)
        
        this.subscribeMicroservice = this.createSubscribeFunction(props.stage)
      
  

    }


    
      private createSubscribeFunction(stage: string) : NodejsFunction {
        const nodeJsFunctionProps: NodejsFunctionProps = {
          bundling: {
            externalModules: [
              'aws-sdk'
            ]
          },
          environment: {
            STAGE: stage
          },
          runtime: Runtime.NODEJS_14_X
        }
    
        // Product microservices lambda function
        const subscribeFunction = new NodejsFunction(this, 'subscribeLambdaFunction', {
          entry: join(__dirname, `/../src/subscriber/index.js`),
          ...nodeJsFunctionProps,
        });
        
        return subscribeFunction;
      }
    

   
}