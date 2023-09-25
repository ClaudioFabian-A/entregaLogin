import mongoose from "mongoose";

const collection = "messages";

const schema = new mongoose.Schema(

    {
        user: {
            type: String,
            require: true,
        },
        messageI: {
            type: String,
            require: true,
        },

    }, { timestamps: true })

    const chatModels = mongoose.model(collection, schema);
    export default chatModels;