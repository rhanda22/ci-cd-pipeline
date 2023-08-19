
export async function handler(event:string, context:string) {
  
  console.log(' Stage Name ::'+ process.env.stage);

  console.log('Making a change for a demo');

  return{
    body:'Hello from Lambda Function',
    statusCode: 200
  }

}
