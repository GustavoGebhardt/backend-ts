import express from 'express'
import cors from 'cors'
import { storeUser, verifyPasswordByUsername } from "../db/conection"
import database from './database'
import users from './models/users'

const app = express()
const port = 4000

app.use(cors())
app.use(express.json())

//---------------------------------------------------------------------

const username = "GustavoGebhardt"
const email = "gustavorgebhardt@gmail.com"
const password = "Gustavo131328!"

//storeUser(username, email, password)
verifyPasswordByUsername("GustavoGebhardt", "Gustavo131328!")

async function run() {
    await database.sync(); // Cria as tabelas se não existirem
    const novoUsuario = await users.create({
        username: "GustavoGebhardt",
        email: "gustavo@gmail.com",
        password: "123123"
    });
}
run()

//---------------------------------------------------------------------

app.get("/", (req, res) => {
    res.send('Hello World!')
})

app.post("/session", (req, res) => {
    if(req.body.email == "carlos@gmail.com" && req.body.senha == "123123"){
        res.status(200).send({massenge: "Success!"});
    } else {
        res.status(400).send({massenge: "Erro!"});
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})