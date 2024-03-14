const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        await authService.register(req.body);
        res.json({ message: 'User successfully registered', success: true});
    } catch (error) {
		if (error.code === 11000) {
        	res.status(400).json({ message: 'A user with this login already exists', success: false });
		} else {
			res.status(400).json({ message: error.message, success: false });
		}
    }
};

const login = async (req, res) => {
    try {
        const token = await authService.login(req.body);
		res.json({ auth: true, token: token })
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = {
	register,
	login
}
