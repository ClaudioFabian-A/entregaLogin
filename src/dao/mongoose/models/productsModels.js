import mongoose from "mongoose";

const collection = "Products";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,

    },
    stock: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        require: true,
    },
    thumbnail: {
        type: Array,
        default: true,

    },
    status:{
        type:Boolean,
        default:true,

    },
}, { timestamps: true });

const productsModel = mongoose.model(collection, schema);

export default productsModel;