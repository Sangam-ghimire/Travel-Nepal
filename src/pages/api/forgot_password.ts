import dbConnect from "../../../lib/mongoose"
import User from "../../../lib/modals/User"
import sendEmail from "../../../lib/nodemailer"
import Token from "../../../lib/modals/Token"
import crypto from "crypto" 
import { NextApiRequest, NextApiResponse } from "next";

//here we are defining the handler function to handle the request and response for the api of forgot_password
export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if (req.method === 'POST') {
        try{
            const { email } = req.body as any;
            //here we are connecting to the database
            if (await dbConnect()){
                console.log("Connection established....");
            }

            //here we are checking if the email already exists or not
            const user: any = await User.findOne({email: email});
            console.log(user.email);
            if(!user) //if email doesn't exists
            {
                console.log("Unregistered Email!!!")
                return res.status(409).json({ success: false, error:"Unregistered Email" })
            }

            //here we are creating a new token
            const token:any = new Token();
            token.token = crypto.randomBytes(32).toString("hex");
            await token.save();
            
            //here we are saving the token to the database
            const url: any = `${process.env.BASE_URL}users/${user._id}/reset/${token.token}`;
            console.log(url)

            // sending mail via nodemailer.....
            await sendEmail(user.email,"Reset Your Password",url);
            //here we are sending the response with status code 201
            return res.status(201).json({ success: true })
        }catch(error){
            console.log(error)
        }

    }
}