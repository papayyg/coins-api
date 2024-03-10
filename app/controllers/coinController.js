const handleError = require("../helpers/handleError");
const Coin = require("../models/coin");

const getCategories = async (req, res) => {
    const result = await Coin.aggregate([
        {
            $group: {
                _id: "$category",
                obverseImageLink: { $first: "$obverseImageLink" },
            },
        },
        {
            $project: {
                _id: 0,
                name: "$_id",
                obverseImageLink: 1,
            },
        },
    ]);
    res.json(result);
};

const getCoinsByFilter = async (req, res) => {
    try {
        let filter = {};

        if (req.query.category) filter.category = req.query.category;

        if (req.query.search) {
            const searchRegex = new RegExp(req.query.search, "i");
            filter.$or = [
                { name: { $regex: searchRegex } },
                { shortDescription: { $regex: searchRegex } },
                { detailedDescription: { $regex: searchRegex } },
            ];
        }

        if (req.query.advancedFilter) {
            const advancedFilter = JSON.parse(req.query.advancedFilter);
            const priceYearKeys = ["minPrice", "maxPrice", "minYear", "maxYear"];

            Object.entries(advancedFilter).forEach(([key, value]) => {
                if (priceYearKeys.includes(key)) {
                    const field = key.includes("Price") ? "price" : "year";
                    const operator = key.includes("min") ? "gte" : "lte";

                    filter[field] = filter[field] || {};
                    filter[field][`$${operator}`] = value;
                } else if (value) {
                    filter[key] = value;
                }
            });
        }
		console.log(filter)
        const coins = await Coin.find(filter);
        res.json(coins);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getCoin = (req, res) => {
	Coin.findById(req.params.id)
		.then((coin) => res.status(200).json(coin))
		.catch((error) => handleError(res, error));
};

const addCoin = async (req, res) => {
    const coin = new Coin({ ...req.body });
    coin.save()
        .then((coin) => res.status(200).json(coin))
        .catch((error) => handleError(res, error));
};

const editCoin = (req, res) => {
    Coin.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
        .then((coin) => res.status(200).json(coin))
        .catch((error) => handleError(res, error));
};

const deleteCoin = (req, res) => {
	Coin.findByIdAndDelete(req.params.id)
		.then((coin) => res.status(200).json(coin))
		.catch((error) => handleError(res, error));
};

module.exports = {
    getCoinsByFilter,
    addCoin,
    getCategories,
	getCoin,
    editCoin,
    deleteCoin,
};
