const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
	name: {
		type: String,
		required: true,
		trim: true,
	},
	surname: {
		type: String,
		required: true,
		trim: true,
	},
	age: {
		type: Number,
		required: true,
	},
	address: {
		type: String,
		required: true,
		trim: true,
	}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
