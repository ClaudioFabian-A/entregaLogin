import productsModel from '../models/productsModels.js';
import { v4 as uuidv4 } from 'uuid';

export default class productManager {
    getProducts = async () => {
        try { return await productsModel.find().lean(); } catch (error) { return error };

    }
    updateProduct = async (id, product) => {
        try {

            return await productsModel.findByIdAndUpdate(id, { $set: product });
        } catch (error) {
            return error;

        }
    };
    addProduct = async (product) => {
        try {
            await productsModel.create(product);
            return await productsModel.findOne({ title: product.title })
        } catch (error) {
            return error

        }
    };
    deleteProduct = async (id) => {
        try {
            return await productsModel.findByIdAndDelete(id);
        } catch (error) {
            return error;
        }
    };


}