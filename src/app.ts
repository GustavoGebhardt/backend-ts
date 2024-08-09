import express from 'express'
import cors from 'cors'
import { createUser, loginUser } from './controllers/userController'
import database from "./database"
import { validateEmail } from './services/userServices'

const app = express()

app.use(cors())
app.use(express.json())

//---------------------------------------------------------------------

//createUser("GersonGebhardt", "gerson@gmail.com", "4321")
//loginUser("gustavo@gmail.com", "123123")

//---------------------------------------------------------------------

database.authenticate()
database.sync()

app.get("/", (req, res) => {
    res.send('Hello World!')
})

app.post("/login", async (req, res) => {
    const authenticated = await loginUser(req.body.email, req.body.senha)
    if(authenticated){
        res.status(200).send(authenticated);
    } else {
        res.status(400).send();
    }
})

app.post("/validateEmail", async (req, res) => {
    const response = await validateEmail(req.body.token)
    if(!response){
        res.status(400).send();
    } else {
        res.status(200).send({success: "success"});
    }
})

app.post("/createUser", async (req, res) => {
    const userError = await createUser(req.body.username, req.body.email, req.body.password)
    if(userError?.error){
        res.status(400).send(userError);
    } else {
        res.status(200).send({success: "success"});
    }
})

export default app;