function authorized(req, res, next) {
    if (!req.session.authorized) {
        // return res.status(403).send('vous nete pas connecté')
        return res.status(403).json({authorized: false}) //
    }

    next()
}


module.exports = {
    authorized
}