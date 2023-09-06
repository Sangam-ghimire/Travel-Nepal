import mongoose, {Schema} from "mongoose";
import Post from "./Post";

//the below code is for the user interface,it is the main interface
interface IUser {
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    name: string,
    dob: Date,
    profile_pic: any,
    location:[{type: Schema.Types.ObjectId,
        ref: string}],
    verified: boolean
}
//the below code is for the user schema,it is the main schema
const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 30,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    profile_pic: {
        data: Buffer,
        contentType: String,
    },
    location :[{
        type: String,
        ref : "locations",
    }],
    verified: {
        type: Boolean,
        default: false,
        required: true
    }
},{collection: 'users'})

//the below code is for the user model,it is the main model
const User = mongoose.models.User||mongoose.model("User",userSchema);
//exporting the user model
export default User;
