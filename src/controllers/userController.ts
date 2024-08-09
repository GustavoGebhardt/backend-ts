import users from '../models/usersModel'
import { createHashPassword, verifyPasswordByEmail } from '../services/userServices'
import nodemailer from "nodemailer"

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
        const user = await users.create({
            username: userName,
            email: email,
            password: hashedPassword
        });

        const transponder = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        })
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Confirme seu email clicando no link abaixo.",
            text: `http://localhost:3000/api/email?token=${user.dataValues.validation_id}`
        }

        transponder.sendMail(mailOptions, (error) => {
            if(error){
                console.log(error)
            }
        })
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