import mongoose from 'mongoose'

export default async function conection() {
    try{
        mongoose.set("strictQuery", true)
        await mongoose.connect("mongodb://root:Gustavo131328!@localhost:27017")
        console.log("Banco de Dados conectado!")

    } catch(error) {
        console.log("Error: " + error)
    }
}