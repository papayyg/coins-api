const handleError = (res, error) => {
    res.status(500).send({ message: error.message, success: false });
};

module.exports = handleError;