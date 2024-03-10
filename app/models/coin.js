const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
    name: String,
	category: String,
	denomination: String,
	shortDescription: String,
	detailedDescription: String,
	price: Number,
	year: Number,
	country: String,
	metal: String,
	quality: String,
	weight: Number,
	obverseImageLink: String,
	reverseImageLink: String,
}, { timestamps: true });

const Coin = mongoose.model('Coin', coinSchema);

module.exports = Coin;
