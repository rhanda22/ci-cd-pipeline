
export async function handler(event:string, context:string) {
  
  console.log(' Stage Name ::'+ process.env.stage);

  console.log('Making a change for a demo to trigger0');

  console.log('Making a change for a demo to trigger 2');

  console.log('Making a change for a demo to trigger 1');



  return{
    body:'Hello from Lambda Function',
    statusCode: 200
  }

}
