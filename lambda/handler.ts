
export async function handler(event:string, context:string) {
  
  console.log(' Stage Name ::'+ process.env.stage);

  console.log('Making a change for a demo to trigger');

  console.log('Making a change for a demo to trigger 1');

  console.log('Making a change for a demo to trigger 9');



  return{
    body:'Hello from Lambda Function',
    statusCode: 200
  }

}
