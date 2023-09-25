import {Router} from "express";
import productManager from "../dao/mongoose/managers/productsManagers.js";
import {__dirname} from "../utils.js";

const  prodManager = new productManager();
const router = Router();




router.get("/", async (req, res) => {
    const prodList = await prodManager.getProducts();
    res.render("home", { prodList });
  });
  

router.get("/realTimeProducts", async (req, res) => {
    const prodList = await prodManager.getProducts();
    res.render("realTimeProducts", { prodList });
  });
  router.get("/chat", (req, res) => {
    res.render("chat");
  });

export default router;