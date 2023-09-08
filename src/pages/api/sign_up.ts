import dbConnect from "../../../lib/mongoose"
import User from "../../../lib/modals/User"
import sendEmail from "../../../lib/nodemailer"
import Token from "../../../lib/modals/Token"
import crypto from "crypto" 
import { NextApiRequest, NextApiResponse } from "next";


//here we are defining the handler function to handle the request and response for the api of sign_up
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try{
            //here we are getting the email, password, firstName, lastName, dob from the request body
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
            const {email, password, firstName, lastName,dob} = req.body as any

            //here we are connecting to the database
            const fullName: String = `${firstName} ${lastName}`;
            if (await dbConnect())
            {
                console.log("Connection established....");
            }
            //here we are checking if the email already exists or not
            const countUser = await User.countDocuments({ email });
            console.log(countUser);
            //if email already exists then we are returning the response with status code 409
            if(countUser) //if email already exists
            {
                console.log("Duplicate Email!!!")
                return res.status(409).json({ success: false, error:"user already exists" })
            }
            
            const user:any = new User()       //create mongo model of given data and store in database       
            user.email = email;
            user.password = password;
            user.first_name = firstName;
            user.last_name = lastName;
            user.name = fullName;
            user.dob = dob;
            await user.save(); //save user in database
            
            //here we are creating a new token
            const token:any = new Token();
            //here we are creating a new token
            token.token = crypto.randomBytes(32).toString("hex");
            await token.save(); //save token in database

            const url: any = `${baseUrl}users/${user._id}/verify/${token.token}`
            // console.log(`user has been created: ${user}`)
            // console.log(`token has been created: ${token}`)
            console.log(`url: ${url}`);
            //here we are sending the response with status code 201
            await sendEmail(user.email,"Verification Mail",url)
            //here we are sending the response with status code 201
            return res.status(201).json({ success: true, data: user })
        }catch(error){
            //if any error occurs then we are returning the response with status code 500
            return res.status(500).json({ success: false, error })
        }
    }
}
