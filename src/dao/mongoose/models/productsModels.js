import mongoose from "mongoose";
import MongoosePaginate from "mongoose-paginate-v2";


// const collection = "Products";

const schema = new mongoose.Schema({
    title: String,
    description:String,
    category: String,
    code: String,
    stock: Number,
    price: Number,
    thumbnail: Array,
    status: Boolean,

});
schema.plugin(MongoosePaginate);

export const productsModel = mongoose.model("products", schema);

