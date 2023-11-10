import mongoose from "mongoose";
import { productsModel } from "./productsModels.js";
const carts= "carts";


const cardSubSchema = new mongoose.Schema(
  {
    products: {
      type: {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      }
    }
  },{_id:false});
  const cardschema= new mongoose.Schema({
    products:{
      type:[cardSubSchema],
      default:[],
    }
  },{timestamps:true})


cardSubSchema.pre(["save","findOne"], function () {
  this.populate("products.product")

});


 export const cartModel = mongoose.model("carts", cardSubSchema);


