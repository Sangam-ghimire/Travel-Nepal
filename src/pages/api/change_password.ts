import dbConnect from "../../../lib/mongoose"
import User from "../../../lib/modals/User"

//here we are defining the handler function to handle the request and response for the api of verify_email
export default async function handler(req: any, res: any){
    if(req.method === 'POST'){
        const {required_id, password} =  req.body as any
        console.log(required_id,password)
        const _id = `ObjectId('${required_id}')`
        if (await dbConnect())
        {
            console.log("Connection established in verify_email");
        }
        console.log(_id)
        //here we are checking if the email already exists or not
        await User.findOneAndUpdate({"_id" : required_id},{password: password});
        //if email already exists then we are returning the response with status code 409
        return res.status(201).json({ success: true });
    }
}