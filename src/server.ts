import express from 'express'
import cors from 'cors'
import { createUser, loginUser } from './controllers/userController'

const app = express()
const port = 4000

app.use(cors())
app.use(express.json())

//---------------------------------------------------------------------

//createUser("GersonGebhardt", "gerson@gmail.com", "4321")
//loginUser("gustavo@gmail.com", "123123")

//---------------------------------------------------------------------

app.get("/", (req, res) => {
    res.send('Hello World!')
})

app.post("/session", async (req, res) => {
    console.log(req.body)
    const email = req.body.email
    const password = req.body.senha
    const authenticated = await loginUser(email, password)
    if(authenticated){
        res.status(200).send({massenge: "Success!"});
    } else {
        res.status(400).send({massenge: "Erro!"});
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})