import mongoose, { Schema } from "mongoose";
interface IToken {
    token: string;
    createdAt: Date;
} //interface for token

//the below code is for the token schema, it is the main schema
const tokenSchema = new Schema<IToken>({
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 3600
    }
},{collection: 'Tokens'})

//the below code is for the token model
const Token = mongoose.models.Token||mongoose.model("Token",tokenSchema);
//exporting the token model
export default Token;