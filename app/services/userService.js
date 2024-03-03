const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.createUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User({
        login: userData.login,
        password: hashedPassword,
    });
    return await user.save();
};

exports.getUserByCredentials = async (login, password) => {
    const user = await User.findOne({ login });
    if (!user) {
        throw new Error('Invalid Login or Password');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid Login or Password');
    }
    return user;
};
