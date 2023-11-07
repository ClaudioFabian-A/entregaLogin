import mongoose, { Schema } from "mongoose";
import { productsModel } from "./productsModels.js";

const collection = "carts";

const prodSubSchema = new mongoose.Schema(
  {
    products: {
      type: [{
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      }]
    }
  }, { _id: false });


prodSubSchema.pre("save", function () {
  this.populate("products.product")

})

const schema = new mongoose.Schema(
  {
    products: {
      type: [prodSubSchema],
      default: [],
    },
  },
  { timestamps: true }
);

prodSubSchema.pre("find", function () { this.populate("products.product") })

export const cartModel = mongoose.model("carts", schema);


