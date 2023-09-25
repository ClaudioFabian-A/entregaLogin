
import productManager from './productsManagers.js';
import cartModel from '../models/cartsModels.js';
import { v4 as uuidv4 } from 'uuid';
// console.log(uuidv4());

const ProductManager = new productManager()
export default class cartsManager {
    constructor(path) {
        this.path = path;
        this.carts = [];

    }

    getOllCart = async () => {
        try {
            const cart = await cartModel.find();
            return cart;
        } catch (error) {
            console.log(error);
            return [];
        }
    };
    getCartById = async (id) => {
        try {

            const cart = await cartModel.findById(id);
            return cart;
        } catch (error) {
            console.log(error);

        }
    }
    addPCartWithId = async (cid, pid) => {
        try {
            const idsFilter = { _id: cid, "products.:id": pid.id };
            const cart = await cartModel.findById(cid);
            const prodInCart = cart.products.some((prod) => { prod._id.toString() === pid._id });
            if (prodInCart) {
                let prodUpDate = { $push: { products: { _id: pid._id, quantity: pid.quantity } } };
                // const prodUpDate = { $inc: { "products.$.quantity": pid.quantity } }
                await cartModel.updateOne(idsFilter, prodUpDate);
            } else {
                prodUpDate = { $push: { products: { _id: pid._id, quantity: pid.quantity } } };
                await cartModel.updateOne({ _id: cid }, prodUpDate)
            }
            return await cartModel.findById(cid);

        } catch (error) {

        }
    };
    upDateCartWithId = (id, cart) => {
        return cartModel.updateOne({ _id: id }, { $set: cart });
    }





    addCart = async (product) => {
        try {
            let carts = {}
            let id = uuidv4();
            if (product&&product.length>0){
                carts.product= product;
            }

            const cart = await cartModel.create(carts);

            return cart;
        } catch {
            console.log(error);
            return []
        }
    };

    deleteCartWithId = (id) => { return cartModel.deleteOne({ _id: id }) };
}
