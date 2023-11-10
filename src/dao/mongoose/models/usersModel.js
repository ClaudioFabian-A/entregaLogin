import mongoose from "mongoose"

const collection = "Users";
const schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['user','admin', 'prem'],
        default: 'user',
    }

});
const userModel = mongoose.model(collection, schema);
export default userModel;