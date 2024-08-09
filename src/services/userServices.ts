import bcrypt from "bcrypt"
import dotenv from 'dotenv';
import users from "../models/usersModel";
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
    if(user[0] != null){
        const hashedPassword = user[0].toJSON().password
        const isPasswordMatch: boolean = await bcrypt.compare(password, hashedPassword)
        if(isPasswordMatch){
            const authUser = {
                id: user[0].toJSON().id,
                email: user[0].toJSON().email,
                username: user[0].toJSON().username
            }
            return authUser
        }
        return null
    } else {
        return null
    }
}

async function validateEmail(token: string) {
    const user = await users.findAll({
        where: {
            validation_id: token
        }
    })

    if(user[0] == null){
        return null
    }

    const update = await users.update(
        { 
            checked: new Date(),
            validation_id: null
        },
        {
            where: {
                id: user[0].toJSON().id
            }
        }
    )

    if(update){
        return update
    } else {
        return null
    }
}

export { createHashPassword, verifyPasswordByEmail, validateEmail}