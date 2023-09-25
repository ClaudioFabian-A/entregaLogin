import mongoose from "mongoose";
const collection = "carts";

const prodSubSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "products",
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { _id: false }
);

const schema = new mongoose.Schema(
  {
    products: {
      type: [prodSubSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const cartModel = mongoose.model(collection, schema);

export default cartModel;
