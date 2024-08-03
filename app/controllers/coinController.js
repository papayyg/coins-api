const handleError = require("../helpers/handleError");
const { getDirectImageUrl, processImage } = require("../helpers/utils");
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
    ]).sort({ name: 1 });
    res.json(result);
};

const getFilterOptions = async (req, res) => {
    try {
        const countries = await Coin.distinct("country");
        const metals = await Coin.distinct("metal");
        const qualities = await Coin.distinct("quality");

        const result = {
            country: countries,
            metal: metals,
            quality: qualities,
        };

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCoinsByFilter = async (req, res) => {
    try {
        let filter = {};
        let offset = parseInt(req.query.offset) || 0;
        let limit = parseInt(req.query.limit) || 10;

        if (req.query.category) filter.category = req.query.category;
        if (req.query.country) filter.country = req.query.country;
        if (req.query.metal) filter.metal = req.query.metal;
        if (req.query.quality) filter.quality = req.query.quality;

        if (req.query.search) {
            const searchRegex = new RegExp(req.query.search, "i");
            filter.$or = [
                { name: { $regex: searchRegex } },
                { shortDescription: { $regex: searchRegex } },
                { detailedDescription: { $regex: searchRegex } },
            ];
        }

        if (req.query.minPrice || req.query.maxPrice) {
            filter.price = {};
            if (req.query.minPrice) filter.price.$gte = parseFloat(req.query.minPrice);
            if (req.query.maxPrice) filter.price.$lte = parseFloat(req.query.maxPrice);
        }

        if (req.query.minYear || req.query.maxYear) {
            filter.year = {};
            if (req.query.minYear) filter.year.$gte = parseInt(req.query.minYear);
            if (req.query.maxYear) filter.year.$lte = parseInt(req.query.maxYear);
        }

        const totalCoins = await Coin.countDocuments(filter);
        const coins = await Coin.find(filter).sort({ name: 1 }).skip(offset).limit(limit);

        res.json({
            count: totalCoins,
            data: coins,
        });
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
    const obverseImageLinkImageUrl = getDirectImageUrl(req.body.obverseImageLink);
    const obverseBase64Image = await processImage(obverseImageLinkImageUrl);

    const reverseImageLinkImageUrl = getDirectImageUrl(req.body.reverseImageLink);
    const reverseBase64Image = await processImage(reverseImageLinkImageUrl);
	
    const coin = new Coin({ ...req.body, obverseImageLink: obverseBase64Image, reverseImageLink: reverseBase64Image });
	console.log(coin.name)
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
        .then((coin) => res.status(200).json({success: true}))
        .catch((error) => handleError(res, error));
};

module.exports = {
    getCoinsByFilter,
    getFilterOptions,
    addCoin,
    getCategories,
    getCoin,
    editCoin,
    deleteCoin,
};
