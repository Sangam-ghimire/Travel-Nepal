import dbConnect from "../../../lib/mongoose"
import User from "../../../lib/modals/User"

//here we are defining the handler function to handle the request and response for the api of verify_email
export default async function handler(req: any, res: any){
    if(req.method === 'POST'){
        const {required_id} =  req.body as any;
        console.log(required_id);
        const _id = `ObjectId('${required_id}')`;
        if (await dbConnect())
        {
            console.log("Connection established in verify_email");
        }
        console.log(_id);
        //to check if the user already exists or not
        await User.findOneAndUpdate({"_id" : required_id},{verified : true})
        return res.status(201).json({ success: true })
    }
}