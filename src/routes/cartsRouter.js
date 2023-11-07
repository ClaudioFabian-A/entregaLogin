import { Router } from "express";
import cartsManager from "../dao/mongoose/managers/cartsManager.js";

// import { __dirname } from "../utils.js";



const CManager = new cartsManager();
const cartrouter = Router();


cartrouter.get("/carts", async (req, res) => {
    res.send(await CManager.getOllCart());
})
cartrouter.post("/carts/", async (req, res) => {
    let cartCreate = await CManager.createNewCart();

    if (cartCreate) {
        res.send(cartCreate);
    } else {
        res.status(500).send({ status: "error", payload: "cannot create the cart" });
    }

})
cartrouter.delete("/carts/:cid", async (req, res) => {
    let cartsId = req.params.cid;
    const deletedCart = await cartsManager.deletedCart(cartsId);
    deletedCart ? res.send("deleted card") : res.status(500).send({ status: "error", payload: "deleted failed" })


})
cartrouter.delete("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const deletedProduct = await CManager.deleteCartProduct(cid, pid);
    if ((await deletedProduct) == "delete article") {
        res.send("deleted article");
    } else if ((await deletedProduct) == "art not found") {
        res.status(500).send({ status: "error", message: "article not found" });
    } else {
        res.status(500).send({ status: "error", message: "cart not found" });
    }
})
cartrouter.get('/carts/:cid', async (req, res) => {
    let cartsId = req.params.cid;
    const carts = await CManager.getCartById(cartsId);
    carts ? res.send(await carts) : res.status(500).send({ status: "error", payload: `not a cart` })
})
cartrouter.post('/', async (req, res) => {
    const cart = await CManager.addCart();
    cart ? res.status(201).json({ message: `Cart creada con exito`, cart }) : res.status(400).json({ message: `Error al crear el Cart`, cart })
})
cartrouter.post('/carts/:cid/products/:pid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const { quantity } = req.body;
        await CManager.addPCartWithId(cid, pid, quantity);
        res.status(201).json({ message: "producto agregado con exito" })

    } catch (error) {
        console.log("Error al cargar el producto", error);
        res.status(525).send({ message: `error al cargar el cart` })
    }
})

export default cartrouter;