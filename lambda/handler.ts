
export async function handler(event:string, context:string) {
  
  console.log(' Stage Name ::'+ process.env.stage);

  return{
    body:'Hello from Lambda Function',
    statusCode: 200
  }

}
