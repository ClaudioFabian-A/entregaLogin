import express from "express";

import { Server} from "socket.io";
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import productRouter from "./routes/productsRouter.js"
import ProductManager from "./dao/mongoose/managers/productsManagers.js";
import cartRouter from "../src/routes/cartsRouter.js";
import  {__dirname}  from "./utils.js";
import "./dao/mongoose/dbConfig.js";
import { v4 as uuidv4 } from 'uuid';
import ChatManager from "./dao/mongoose/managers/chatManager.js";
console.log(uuidv4());




const app = express();

const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));





app.use(express.static(`${__dirname}/public`))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");



app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use('/', viewsRouter);

const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`);
});

const socketServer = new Server(httpServer);
const prodManager = new ProductManager();
const chatManager = new ChatManager();


socketServer.on("connection", async (socket) => {
    console.log("Cliente conectado con id: ", socket.id);

    const prodList = await prodManager.getProducts();
    socketServer.emit("prodList", prodList);

    socket.on("updateProduct", async (obj) => {
        await prodManager.addProduct(obj);
        const prodList = await prodManager.getProducts({});
        socketServer.emit("prodList", prodList);
    });

    socket.on("deletElement", async (id) => {
        console.log(deletElement);
    
        await prodManager.deleteById(id);
        const prodList = await prodManager.getProducts({});
        socketServer.emit("prodList", prodList);
    });
    socket.on("disconnected", () => {
        console.log("Cliente desconectado");
    });
    socket.on("newUser",(userValue)=>{
        console.log("userValue",userValue);
        socket.broadcast.emit("bCast",userValue);
    });
    socket.on("disconnected", ()=>{
        console.log(`user ${socket.id} desconectado`);
    });
    socket.on("message", async (data)=>{
        console.log(data);
        await chatManager.createMessage(data);
        socketServer.emit("pChat", await chatManager.getMessages())
    })
});










