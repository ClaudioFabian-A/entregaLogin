import { Router } from "express";
import UserManager from '../dao/mongoose/managers/UserManager.js';


const router = Router();
const usersServices = new UserManager();

router.post('/register', async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
    } = req.body;
    if (!firstName || !lastName || !email || !password) return res.status(400).send({ status: "error", error: "incomplete fields" });
    const user = await usersServices.getBy({ email });

    if (user) {
        return res.status({ status: "error", error: "error de sessionrouter" }).redirect('/login')
    } else {

        const newUser = {
            firstName,
            lastName,
            email,
            password
        }
        const result = await usersServices.create(newUser);
        res.send({ status: "success", payload: result._id });
    }


})




router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ status: "error", error: "email or password empty" });
    const user = await usersServices.getBy({ email, password })
    if (!user) return res.status(400).send({ status: "error", error: "invalid users" });
    req.session.user = user;
    res.send({ status: "success", message: "logued" });
    return res.redirect('/products');
})
router.get('/logout', async (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.log(error);
            return res.redirect("/");
        } else {
            res.redirect("/");
        }
    });
})
export default router;