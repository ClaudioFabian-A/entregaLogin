import { Router } from "express";
import productManager from "../dao/mongoose/managers/productsManagers.js";
import cartsManager from "../dao/mongoose/managers/cartsManager.js";


function Admin(req, res, next) {
  if (req.session?.admin) {
    return next();
  }
  return res.status(401).send({ status: "error", error: "error en el usuario" });
}
function stoped(req, res, next) {
  if (req.session.user) { return next(); }

  return res.status(401).redirect('/login');
}
function stopedOf(req, res, next) {
  if (req.session.user) {
    res.redirect("/products")
    return res.status(401).send("error de autorizacion")
  }
  return next();
}

const prodManager = new productManager();
const cartManager = new cartsManager();
const router = Router();





router.get("/",stoped, async (req, res) => {
  console.log(req);
  let user = req.params.name;
  let prodList = await prodManager.getProducts(req.query);
  res.render("Home", {
    prodList: prodList.payload,
    user: user
  });

console.log("prodLits"); 


});
router.get("/login",stopedOf, async (req, res) => {
  res.render("Login");
})
router.get("/register", stopedOf,async (req, res) => {
  res.render("Register");
})
router.get("/logout", async (req, res) => {
  req.session.destroy(error => {
    if (error) {
      return res.redirect('/');
    } else {
      return res.redirect('/')
    }
  })
})
router.get("/realTimeProducts", Admin, async (req, res) => {
  // const prodList = await prodManager.getProducts();
  let user = req.user.firstName;
  res.render("realTimeProducts", { user: user });
})
router.get("/chat", stoped, (req, res) => {
  let user = req.params.name;

  res.render("chat", { user: user });
})
router.get("/carts/:cid",stoped, async (req, res) => {
 let user= req.user.firstName;
  let cid = req.params.cid;
  let cartList = await cartManager.getCartById(cid);
  res.render("cart", { products: cartList[0].products , user:user});
})
router.get("/products", stoped, async (req, res) => {
  let user = req.query.firstName;
  console.log(user);
  let prodList = await prodManager.getProducts(req.query);
  
  res.render("products", { products: prodList, user: user });
})
router.get("/",stopedOf, async( req,res)=> {
// console.log(req);
  let user = req.session.user;
  res.render("profile", { user: user })
})



export default router;