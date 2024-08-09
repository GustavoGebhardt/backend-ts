import Sequelize from "sequelize"
import database from "../database"
import { v4 as uuidv4 } from 'uuid';

const users = database.define("users", {
    id: {
        type: Sequelize.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    checked: {
        type: Sequelize.DATE,
        allowNull: true
    },
    validation_id: {
        type: Sequelize.UUID,
        defaultValue: uuidv4,
        allowNull: true
    }
}, {
    timestamps: true
})

export default users