import express from 'express'
import cors from 'cors'
import conection from '../db/conection'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

conection()

app.get("/", (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})