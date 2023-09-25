import { Router } from "express";
import ProductManager from "../dao/mongoose/managers/productsManagers.js";
import {__dirname} from "../utils.js";

const productsServices = new ProductManager()
const router = Router();


router.get("/", async (req, res) => {

   const products = await productsServices.getProducts();
   console.log(products);
   res.send({status:"success",payload:products})
    console.log(products);

});


router.post("/", async (req, res) => {
    const product = await productsServices.addProduct(req.body);
    product ? res.status(201).json({ message: `Producto creado con exito`, product }) : res.status(400).json({ message: `error al crear el producto` });

})





export default router;
