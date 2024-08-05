import users from '../models/users'
import { createHashPassword, verifyPasswordByEmail } from '../services/userServices'

async function createUser(userName: string, email: string, password: string) {
    const erroEmail = {
        field: "email",
        message: "Email is already in use"
    }

    const erroUsername = {
        field: "username",
        message: "Username is already in use"
    }

    const findUsersEmail = await users.findAll({
        where: {
            email: email
          }
    })

    const findUsersUsername = await users.findAll({
        where: {
            username: userName
          }
    })

    if(findUsersEmail[0] == null && findUsersUsername[0] == null){
        const hashedPassword = await createHashPassword(password)
        await users.create({
            username: userName,
            email: email,
            password: hashedPassword
        });
    }
    else if(findUsersEmail[0] != null && findUsersUsername[0] != null){
        console.log("1")
        return ({
            error: [
                erroEmail,
                erroUsername
            ]
        })
    }
    else if(findUsersEmail[0] == null && findUsersUsername[0] != null){
        console.log("2")
        return ({
            error: [
                erroUsername
            ]
        })
    }
    else if(findUsersEmail[0] != null && findUsersUsername[0] == null){
        console.log("3")
        return ({
            error: [
                erroEmail
            ]
        })
    }
}

async function loginUser(email: string, password: string) {
    const isPasswordMatch = verifyPasswordByEmail(email, password)
    return isPasswordMatch
}

export { createUser, loginUser }