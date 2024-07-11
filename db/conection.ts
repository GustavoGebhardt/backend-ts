import mongoose, { Schema } from 'mongoose'
require('dotenv').config()

export default async function conection() {
    try{
        mongoose.set("strictQuery", true)
        await mongoose.connect("mongodb://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@" + process.env.DB_HOST)
        console.log("Banco de Dados conectado!")

    } catch(error) {
        console.log("Error: " + error)
    }
}