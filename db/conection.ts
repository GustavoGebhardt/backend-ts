import { Pool } from "pg"
import bcrypt from "bcrypt"
import dotenv from 'dotenv';
dotenv.config();

const pool: Pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!),
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
})

async function createHashPassword(password: string) {
    const saltRounds: number = 10
    const hashedPassword: string = await bcrypt.hash(password, saltRounds)
    return hashedPassword
}

async function storeUser(username: string, email: string, password: string) {
    const hashedPassword = await createHashPassword(password)
    const query = {
        text: "INSERT INTO users.users(username, email, password) VALUES($1, $2, $3)",
        values : [username, email, hashedPassword]
    }
    const result = await pool.query(query)
    console.log(result)
    return result
}

async function verifyPasswordByUsername(username: string, password: string) {
    const query = {
        text: "SELECT password FROM users.users WHERE username = $1",
        values : [username]
    }
    const result = await pool.query(query)
    const hashedPassword: string = result.rows[0].password;
    const isPasswordMatch: boolean = await bcrypt.compare(password, hashedPassword)
    console.log(isPasswordMatch)
    return isPasswordMatch
}

export { storeUser, verifyPasswordByUsername }