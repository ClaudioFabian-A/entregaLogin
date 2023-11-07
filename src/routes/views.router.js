import { Router } from "express";
import productManager from "../dao/mongoose/managers/productsManagers.js";
import cartsManager from "../dao/mongoose/managers/cartsManager.js";
// import { __dirname } from "../utils.js";

const prodManager = new productManager();
const cartManager = new cartsManager();
const viewsrouter = Router();




viewsrouter.get("/", async (req, res) => {
  const prodList = await prodManager.getProducts(req.query);
  res.render("home", { prodList: prodList.payload });
});



viewsrouter.get("/realTimeProducts", async (req, res) => {
  // const prodList = await prodManager.getProducts();
  res.render("realTimeProducts");
});


viewsrouter.get("/chat", (req, res) => {
  res.render("chat");
});

viewsrouter.get("/carts/:cid", async (req, res) => {
  let cid = req.params.cid;
  let cartList = await cartManager.getCartById(cid);
  res.render("cart", { products: cartList[0].products });
});
viewsrouter.get("/products", async(req,res)=>{
  let prodList= await prodManager.getProducts(req.query);
  console.log(prodList);
  res.render("arts",{product:prodList})
})

export default viewsrouter;