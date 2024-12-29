module.exports = (sequelize, Datatypes) => {

    const bcrypt = require("bcrypt");

    // Sequilize n'utilise pas de fonction asynchone
    const hashPassword = (value) => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(value, salt)
    }

    const User = sequelize.define("user",  {
        firstname: {
            type: Datatypes.STRING,
            allowNull: false
        },
        lastname: {
            type: Datatypes.STRING,
            allowNull: false
        },
        email: {
            type: Datatypes.STRING,
            allowNull: false
        },
        password: {
            type: Datatypes.STRING,
            allowNull: false,
            set(value) {
                // Storing passwords in plaintext in the database is terrible.
                // Hashing the value with an appropriate cryptographic hash function is better.
                // const salt = bcrypt.genSaltSync(10)
                // const hash bcrypt.hashSync(value, salt)
                this.setDataValue('password', hashPassword(value))
            }
        }
        
        
    })

    return User
}