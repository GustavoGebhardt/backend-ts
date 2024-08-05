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

app.post("/login", async (req, res) => {
    const authenticated = await loginUser(req.body.email, req.body.senha)
    if(authenticated){
        res.status(200).send(authenticated);
    } else {
        res.status(400);
    }
})

app.post("/createUser", async (req, res) => {
    const userError = await createUser(req.body.username, req.body.email, req.body.password)
    console.log(userError)
    if(userError?.error){
        res.status(400).send(userError);
    } else {
        res.status(200).send({success: "success"});
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})