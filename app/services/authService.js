const userService = require('./userService');
const jwtService = require('./jwtService');

exports.register = async (userData) => {
    return await userService.createUser(userData);
};

exports.login = async (loginData) => {
    const user = await userService.getUserByCredentials(loginData.login, loginData.password);
    const token = jwtService.generateToken(user);
    return token;
};
