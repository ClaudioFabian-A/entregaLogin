import express from "express";
import expressHandlebars from "express-Handlebars";
import { Server } from "socket.io";
import handlebars from 'handlebars';
import ProductManager from "./dao/mongoose/managers/productsManagers.js";
import productRouter from "./routes/productsRouter.js"
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import cartRouter from "./routes/cartsRouter.js";
import viewsRouter from './routes/views.router.js'
import __dirname from "./utils.js";
import "./dao/mongoose/dbConfig.js";
import mongoose, { Mongoose } from "mongoose";
import ChatManager from "./dao/mongoose/managers/chatManager.js";

// import MongoStore from 'connect-mongo';

import { v4 as uuidv4 } from 'uuid';
import cookieParser from "cookie-parser";
import chatRouter from "./routes/chatRouter.js";
// console.log(uuidv4());

const PORT = process.env.PORT || 8080;
const app = express();
const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`);

});

const socketServer = new Server(httpServer);

app.use(express.static(`${__dirname}/public`));
app.engine("handlebars", expressHandlebars.engine({
    handlebars: allowInsecurePrototypeAccess(handlebars),
}));

app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/', viewsRouter);
app.use("/api", productRouter);
app.use("/api", cartRouter);
app.use("/", chatRouter);

app.use(cookieParser());
app.get("/setCookie", (req, res) => {
    res.cookie('cookieEntrega', 'cookie de la entrega', { maxAge: 10000 }).send("cookie")
})

// app.use(session({
//     store:MongoStore.create({
//         mongoUrl:"mongodb+srv://gonzalezclaudiofabian3:Luz1567842242@cluster0.obkcdqv.mongodb.net/segundaPreEntrega?retryWrites=true&w=majority",
//         mongoOptions:{useNewParser:true,useUnifieldTopology:true},
//         ttl:15,
//     }),
//     secret:"jgghf",
//     resave:false,
//     saveUninitialized:false
// }))



socketServer.on("connection", async (socket) => {
    let prodManager = new ProductManager();
    const prodList = await prodManager.getProducts({
        limit: "",
        page: "",
        query: "",
        sort: "",

    });
    let chatManager = new ChatManager();
    let chat = await chatManager.getMessages();
    console.log("Cliente conectado con id: ", socket.id);
    socketServer.emit("prodList", prodList);
    socketServer.emit("message", chat);


    socket.on("updateProduct", async (product) => {
        let prodManager = new ProductManager();
        await prodManager.addProduct(
            product.title,
            product.description,
            product.category,
            product.price,
            product.thumbnail,
            product.code,
            product.stock
        );
        let prodList = await prodManager.getProducts({
            limit: "",
            page: "",
            query: "",
            sort: "",
        });
        socketServer.emit("prodList", prodList);
    });

    socket.on("articleDeleted", async (id) => {
        // console.log(deletElement);
        let prodManager = new ProductManager();
        await prodManager.deleteProduct(id);
        let prodManager2 = new ProductManager();
        let prodList = await prodManager2.getProducts({
            limit: "",
            page: "",
            query: "",
            sort: "",
        });
        socketServer.emit("prodList", prodList);
    });

    socket.on("disconnected", () => {
        console.log("Cliente desconectado");
    });
    socket.on("newUser", (userValue) => {
        console.log("userValue", userValue);
        socket.broadcast.emit("bCast", userValue);
    });
    socket.on("disconnected", () => {
        console.log(`user ${socket.id} desconectado`);
    });
    socket.on("message", async (data) => {
        console.log(data);
        await chatManager.createMessage(data);
        socketServer.emit("pChat", await chatManager.getMessages())
    })
});










