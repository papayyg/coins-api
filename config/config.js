require('dotenv').config();

module.exports = {
	PORT: process.env.PORT || 3000,
    secretKey: process.env.secretKey,
    databaseURL: process.env.databaseURL,
};
