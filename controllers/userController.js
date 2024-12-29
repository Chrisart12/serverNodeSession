const db = require('../models')

const User = db.users

const addUser = async(req, res) => {

    let info = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    }

    const user = await User.create(info)
    res.status(200).send(user)
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getAllUsers= async(req, res) => {
    let users = await User.findAll({
        order: [
            ['id', 'DESC'],
        ],
        attributes: [
            'id',
            'firstname',
            'lastname',
            'email',
            'createdAt',
            'updatedAt'
        ]

    })

    res.status(200).send(users)
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getOneUser = async(req, res) => {
    let id = req.params.id
    let product = await Product.findOne({ where: { id: id }})

    res.status(200).send(product)
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const updateUser = async(req, res) => {
    let id = req.params.id
    const product = await Product.update(req.body, { where: {id: id}})

    res.status(200).send(product)
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const deleteUser = async(req, res) => {
    let id = req.params.id
    await Product.destroy({ where: { id: id }})

    res.status(200).send('Product is deleted')
}

const login = async (req, res) => {

    try {
        if (req.body.email && req.body.password) {
            const { email, password } = req.body

            const user = await User.findOne({ where: { email: email } });

            if (user) {
                const ismatch = await bcrypt.compare(password, user.password)
                if (ismatch) {
                    req.session.user = user 
                    req.session.authorized = true
                    res.redirect('/')
                } else {
                    return res.render("auth/login", {
                        title: "auth | login",
                        message: "Ces identifiants ne correspondent pas à nos enregistrement.",
                    });
                }
            } else {
                return res.render("auth/login", {
                    title: "auth | login",
                    message: "Ces identifiants ne correspondent pas à nos enregistrement.",
                });
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
    try {
        // Permet de supprimer le cookie
        // res.clearCookie('username')
        // On détruit la session
        req.session.destroy()
        res.redirect("/");

    } catch (error) {
        res.status(500).send({
            sucess: false,
            message: "Error de l'insertion",
            error,
        });
    }
};


module.exports = {
    addUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser,
    login,
    logout
}