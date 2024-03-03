require('dotenv').config();

module.exports = {
	PORT: 3500,
    secretKey: process.env.secretKey,
    databaseURL: process.env.databaseURL,
};
