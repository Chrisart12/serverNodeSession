const db = require('../models')
const bcrypt = require("bcrypt");

const User = db.users


const login = async (req, res) => {

    try {
        if (req.body.email && req.body.password) {
            const { email, password } = req.body

            // On recherche l'utilisateur
            const user = await User.findOne({ 
                where: { 
                    email: email, 
                },
            
            });

            if (user) {
                const ismatch = await bcrypt.compare(password, user.password)
                if (ismatch) {
                    req.session.user = {
                        id: user.id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt
                    } 
                    req.session.authorized = true
                    res.status(200).json({
                        authorized: req.session.authorized,
                        user: req.session.user
                    }) //
                
                } else {
                    return res.status(403).send('Ces identifiants ne correspondent pas à nos enregistrements.')
                }
            } else {

                return res.status(401).send('Cet utilisateur n\existe pas')
                
            }

            // let user = await User.findOne({
            //     where: {email, password}
            // })

        }

        } catch (error) {
            console.log(error);
            res.status(500).send({
                sucess: false,
                message: "Error de l'insertion",
                error,
            });
        }
};

const logout = async (req, res) => {
    console.log("eieieiei")
    try {
        // Permet de supprimer le cookie
        // res.clearCookie('username')
        // On détruit la session
        req.session.destroy()

        res.status(200).json({
            authorized: false
        }) 

    } catch (error) {
        res.status(500).send({
            sucess: false,
            message: "Error de l'insertion",
            error,
        });
    }
};


const auth = async (req, res) => {
    try {
        if (req.session.authorized) {
            return res.status(200).json(
                {
                    authorized: req.session.authorized,
                    user: req.session.user
                }
        ) //
        } else {
            // return res.status(200).send('tototo') //
            return res.status(200).json({authorized: false}) //
        }

    } catch (error) {
        res.status(500).send({
            sucess: false,
            message: "Error de l'insertion",
            error,
        });
    }
};


module.exports = {
    login,
    logout,
    auth
}