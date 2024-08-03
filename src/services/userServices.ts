import bcrypt from "bcrypt"
import dotenv from 'dotenv';
import users from "../models/users";
dotenv.config();

async function createHashPassword(password: string) {
    const saltRounds: number = 10
    const hashedPassword: string = await bcrypt.hash(password, saltRounds)
    return hashedPassword
}

async function verifyPasswordByEmail(email: string, password: string) {
    const user = await users.findAll({
        where: {
            email: email
          }
    })
    const hashedPassword = user[0].toJSON().password
    const isPasswordMatch: boolean = await bcrypt.compare(password, hashedPassword)
    console.log(isPasswordMatch)
    return isPasswordMatch
}

export { createHashPassword, verifyPasswordByEmail}