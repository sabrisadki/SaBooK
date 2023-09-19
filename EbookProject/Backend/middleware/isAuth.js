    const jwt = require('jsonwebtoken');
    const { secretKey } = require('../config/config');
    const User = require('../models/User');

exports.isAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization');

        if (!token) {
        return res.status(401).json({ msg: 'Unauthorized: Token missing' });
        }

        const decoded = jwt.verify(token, secretKey);

        if (!decoded) {
        return res.status(401).json({ msg: 'Unauthorized: Invalid token' });
        }

        const user = await User.findById(decoded.id);

        if (!user) {
        return res.status(404).json({ msg: 'User not found' });
        }

        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Internal server error' });
    }
    };
