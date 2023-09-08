import mongoose from 'mongoose'

//interface for Location to be used in the database
interface ILocation {
    address: string,
    description: string
    registeredTime: mongoose.Schema.Types.Date
}

//schema for Location to be used in the database using the interface above i.e ILocation
const locationSchema = new mongoose.Schema<ILocation>({
    address: {
        required: true,
        type: String,
        unique: true,
    },
    description: {
        required: true,
        type: String
    },
    registeredTime: {
        required: true,
        type: mongoose.Schema.Types.Date,
        default: new Date()
    }
})

//for exporting the schema as a model to be used in the database
const Location = mongoose.models.Location||mongoose.model("Location", locationSchema);
export default Location;