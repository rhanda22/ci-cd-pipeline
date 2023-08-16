import { handler } from "../lambda/handler"

describe('Hello describe test suite',()=>{

    test('handler should return 200',async ()=>{
        const result = await handler("Hello","world");
        expect(result.statusCode == 200);
    })

})
