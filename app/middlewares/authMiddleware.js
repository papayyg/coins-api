const jwt = require('jsonwebtoken');
const config = require('../../config/config');

exports.authenticateToken = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, config.secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        req.user = user;
        next();
    });
};
