import { Router } from "express";
import cartsManager from "../dao/mongoose/managers/cartsManager.js";
import productManager from "../dao/mongoose/managers/productsManagers.js";
import { __dirname } from "../utils.js";



const CManager = new cartsManager();
const ProductManager = new productManager();

const router = Router();

router.get('/', async (req, res) => {
    const carts = await CManager.getOllCart();
    carts.length === 0 ? res.status(400).json({ message: `No existen Carts` }) : res.status(200).json(carts)

})
router.get('/:cid', async (req, res) => {
    const cartsId = parseInt(req.params.cid);
    const carts = await CManager.getCartById(cartsId);
    carts ? res.status(200).json(carts) : res.status(400).json({ message: `Cart inexistente` })
})
router.post('/', async (req, res) => {
    const cart = await CManager.addCart();
    cart ? res.status(201).json({ message: `Cart creada con exito`, cart }) : res.status(400).json({ message: `Error al crear el Cart`, cart })
})
router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const cid = parseInt(req.params.cid);
        const pid = parseInt(req.params.pid);
        await CManager.addPCartWithId(cid, pid);
        res.status(201).json({ message: "producto agregado con exito" })

    } catch (error) {
        console.log("Error al cargar el producto", error);
        res.status(525).json({ message: `error al cargar el cart` })
    }
})

export default router