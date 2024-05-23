// const User = require('../models/User')
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json({
            status: 'fail',
            message: 'You Are Not Authenticated'
        })
    }
    jwt.verify(token, 'inisecret', (err, user) => {
        if (err) {
            return res.status(403).json({
                status: 'fail',
                message: 'Token is Not Valid'
            })
        }
        req.user = user
        next()
    })
}

const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.data._id === req.params.id || req.user.data.isAdmin) {
            next()
        }else {
            return res.status(403).json({
                status: 'fail',
                message: 'You Are Not Authorized'
            })
        }
    })
}

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.data.isAdmin) {
            next()
        }else {
            return res.status(403).json({
                status: 'fail',
                message: 'You Are Not Authorized'
            })
        }
    })
}

module.exports = { verifyUser, verifyAdmin};