import { Router } from "express";
//import ProductManager from "../dao/mongoose/managers/productsManagers.js";
import cartsManager from "../dao/mongoose/managers/cartsManager.js";
// import { __dirname } from "../utils.js";
// import productManager from "../dao/mongoose/managers/productsManagers.js";

const productsServices = new cartsManager()
const productrouter = Router();


productrouter.get("/carts/", async (req, res) => {

    const products = await productsServices.getOllCart();
    //console.log(products);
    res.send({ status: "success", payload: products })
    // console.log(products);

});
productrouter.post("/carts/:cid/products/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const { quantity } = req.body;
    const addedArts = await productsServices.addPCartWithId(cid, pid, quantity);
    if ((await addedArts) == "artAdded") {
        res.send("art added to cart")
    } else if ((await addedArts) == "artNotAdded") {
        res.status(500).send({ status: "error", payload: "arID not Found" });
    } else {
        res.status(500).send({ status: "error", payload: "cartID not found" });
    }
});
productrouter.put("/carts/:cid/products/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const { quantity } = req.body;
    const addArts = await productsServices.addPCartWithId(cid, pid, quantity);
    if ((await addArts) == "artAdded") {
        res.send("added art")
    } else if ((await addArts) == "artNotAdded") {
        res.status(500).send({ status: "error", payload: "error product manager M" });
    } else {
        res.status(500).send({ status: "error", payload: "error products router N" });

    }

});
productrouter.put("/carts/:cid", async (req, res) => {

    const cid = req.params.cid;
    const product = req.body;
    const addCart = await productsServices.addCart(cid, product);
    if ((await addCart) == "updatedcart") {
        res.send("adeddCart")

    } else if ((await addCart) == "failedupdate") {
        res.status(500).send({ status: "error", payload: "error produc Router O" });

    } else {
        res.status(500).send({ status: "error", payload: "error product router P" });
    }


});
productrouter.delete("/carts/:cid", async (req, res) => {
    let cid = req.params.cid;
    const deleteProdInCartProduct = await productsServices.deleteProdInCartProduct(cid);
    if ((await deleteProdInCartProduct) == "deletedarticles") {
        res.send("deleted articles");
    } else {
        res.status(500).send({ status: "error", payload: "error product manager O" })
    }

});
productrouter.delete("/carts/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const deleteCartProduct = await productsServices.deleteCartProduct(cid, pid);
    if ((deleteCartProduct) == "deletedarticle") {
        res.send("deleted article");
    } else if ((deleteCartProduct) == "artnotfound") {
        res.status(500).send({ status: "error", payload: "error product router P" });
    } else {
        res.status(500).send({ status: "error", payload: "error product router Q" });
    }
});


export default productrouter;
