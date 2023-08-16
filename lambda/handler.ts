
export async function handler(event:string, context:string) {
  
  console.log(' Stage Name ::'+ process.env.stage);

  console.log('Adding a update to function');

  return{
    body:'Hello from Lambda Function',
    statusCode: 200
  }

}
