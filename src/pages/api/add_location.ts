import dbConnect from "../../../lib/mongoose"
import { NextApiRequest, NextApiResponse } from "next";
import Location from "../../../lib/modals/Location";

//here we are defining the handler function to handle the request and response for the api of add_location
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            //here we are getting the address and description from the request body
            const { address, description } = req.body as any;
    
            if (await dbConnect())
            {
                console.log("Connection established....");
            }
            
            //here we are checking if the email already exists or not
            const countLocation = await Location.countDocuments({ address });
            console.log(countLocation);
            //if email already exists then we are returning the response with status code 409
            if(countLocation) //if email already exists
            {
                console.log("Duplicate Email!!!")
                return res.status(409).json({ success: false, error:"Location already exists" });
            }
            
            //here we are creating a new user
            const location: any = new Location();
            location.address = address;
            location.description = description;
            //here we are saving the user to the database
            await location.save();
            console.log(`Location: ${ address } has been created.`);
            return res.status(201).json({ success: true, data: location })
        } catch(error) {
            //if any error occurs then we are returning the response with status code 500
            return res.status(500).json({ success: false, error })
        }
    }
}