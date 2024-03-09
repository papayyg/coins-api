const Category = require("../models/category");
const handleError = require('../helpers/handleError');

const getCategories = (req, res) => {
    Category.find()
        .sort({ createdAt: -1 })
        .then((categories) => res.status(200).json(categories))
        .catch((error) => handleError(res, error));
};

const addCategory = (req, res) => {
    const { name } = req.body;
    const category = new Category({
        name,
    });
    category
        .save()
        .then((category) => res.status(200).json(category))
        .catch((error) => handleError(res, error));
};

const getCategory = (req, res) => {
    Category.findById(req.params.id)
        .then((category) => res.status(200).json(category))
        .catch((error) => handleError(res, error));
};

const deleteCategory = (req, res) => {
    Category.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json(req.params.id))
        .catch((error) => handleError(res, error));
};

const editCategory = (req, res) => {
    const { name, image } = req.body;
    const { id } = req.params;
	console.log(id)
    Category.findByIdAndUpdate(id, { name, image }, { new: true })
        .then((category) => res.status(200).json(category))
        .catch((error) => handleError(res, error));
};

module.exports = {
    getCategories,
    addCategory,
    getCategory,
    deleteCategory,
    editCategory,
};
