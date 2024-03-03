const jwt = require('jsonwebtoken');
const config = require('../../config/config');

exports.generateToken = (user) => {
    const payload = {
        userId: user._id,
        login: user.login,
    };
    return jwt.sign(payload, config.secretKey, { expiresIn: '1h' });
};
