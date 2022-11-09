const service = require("./movies.service");
const asyncErrorBoundary = require("../utils/errors/asyncErrorBoundary");

// Middleware

const paramsCheck = async (req, res, next) => {
    const { movieId } = req.params;
    const match = await service.read(Number(movieId));
    if (match.length === 0 || !movieId)
        return next({
            status: 404,
            message: `movieId: ${movieId} does not exist in the databass`,
        });
    res.locals.movie = match[0];
    next();
};

module.exports = {
    read: [asyncErrorBoundary(paramsCheck)],
    listReviews: [
        asyncErrorBoundary(paramsCheck)
    ],
    listTheaters: [
        asyncErrorBoundary(paramsCheck)
    ],
};