import users from '../models/users'
import { createHashPassword, verifyPasswordByEmail } from '../services/userServices'

async function createUser(userName: string, email: string, password: string) {
    const hashedPassword = await createHashPassword(password)
    const novoUsuario = await users.create({
        username: userName,
        email: email,
        password: hashedPassword
    });
}

async function loginUser(email: string, password: string) {
    const isPasswordMatch = verifyPasswordByEmail(email, password)
    return isPasswordMatch
}

export { createUser, loginUser }